// In-memory cache for latest known bus locations
const latestBusLocations = new Map();

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Passenger or driver joins a specific bus room
    socket.on("joinBus", (busId) => {
      const room = `bus_${busId}`;
      socket.join(room);
      console.log(`Socket ${socket.id} joined ${room}`);

      // If we already have a cached location for this bus, send it immediately to the new subscriber
      if (latestBusLocations.has(String(busId))) {
        socket.emit("busLocationUpdated", latestBusLocations.get(String(busId)));
      }
    });

    // Driver sends live location
    socket.on("updateLocation", (data) => {
      console.log("Location received:", data);

      const { busId, latitude, longitude, speed, heading } = data;

      if (!busId || latitude === undefined || longitude === undefined) {
        return;
      }

      const locationPayload = {
        busId,
        latitude,
        longitude,
        speed: speed || 0,
        heading: heading || 0,
        updatedAt: new Date(),
      };

      // Cache the latest location
      latestBusLocations.set(String(busId), locationPayload);

      // Send location to all passengers watching this bus
      io.to(`bus_${busId}`).emit("busLocationUpdated", locationPayload);
    });

    // Passenger stops watching a bus
    socket.on("leaveBus", (busId) => {
      const room = `bus_${busId}`;
      socket.leave(room);
      console.log(`Socket ${socket.id} left ${room}`);
    });

    // Client disconnected
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default initializeSocket;