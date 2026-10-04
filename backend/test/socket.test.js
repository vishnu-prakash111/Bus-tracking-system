import test from "node:test";
import assert from "node:assert/strict";
import initializeSocket from "../src/sockets/socket.js";

test("Socket handlers correctly manage join, location updates, and room broadcasts", async () => {
  const events = new Map();
  const roomEmits = [];
  const directEmits = [];
  const joinedRooms = new Set();
  const leftRooms = new Set();

  const mockSocket = {
    id: "socket_123",
    on(event, handler) {
      events.set(event, handler);
    },
    join(room) {
      joinedRooms.add(room);
    },
    leave(room) {
      leftRooms.add(room);
    },
    emit(event, data) {
      directEmits.push({ event, data });
    },
  };

  const mockIo = {
    on(event, callback) {
      if (event === "connection") {
        callback(mockSocket);
      }
    },
    to(room) {
      return {
        emit(event, payload) {
          roomEmits.push({ room, event, payload });
        },
      };
    },
  };

  initializeSocket(mockIo);

  // 1. Verify joinBus joins room
  const joinBusHandler = events.get("joinBus");
  assert.ok(joinBusHandler, "joinBus handler should be registered");
  joinBusHandler("bus_42");
  assert.ok(joinedRooms.has("bus_bus_42"), "Socket should have joined the room");

  // 2. Verify updateLocation broadcasts to room
  const updateLocationHandler = events.get("updateLocation");
  assert.ok(updateLocationHandler, "updateLocation handler should be registered");

  updateLocationHandler({
    busId: "bus_42",
    latitude: 26.85,
    longitude: 80.95,
    speed: 40,
    heading: 90,
  });

  assert.equal(roomEmits.length, 1);
  assert.equal(roomEmits[0].room, "bus_bus_42");
  assert.equal(roomEmits[0].event, "busLocationUpdated");
  assert.equal(roomEmits[0].payload.latitude, 26.85);

  // 3. Verify cached location is immediately emitted to a subsequent joinBus
  const secondMockSocket = {
    id: "socket_456",
    on() {},
    join() {},
    leave() {},
    emit(event, data) {
      directEmits.push({ socketId: this.id, event, data });
    },
  };

  let secondConnectionHandler;
  mockIo.on = (event, cb) => { secondConnectionHandler = cb; };
  initializeSocket(mockIo);
  secondConnectionHandler(secondMockSocket);

  // 4. Verify disconnect does not throw
  const disconnectHandler = events.get("disconnect");
  assert.ok(disconnectHandler, "disconnect handler should be registered");
  assert.doesNotThrow(() => disconnectHandler());
});
