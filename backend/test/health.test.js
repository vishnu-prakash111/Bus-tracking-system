import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

test("Health check endpoint returns 200 and healthy status", async () => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    const res = await fetch(`${baseUrl}/api/v1/health`);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.message, "Bus tracking server is healthy");
    assert.ok(typeof body.uptime === "number");
    assert.ok(body.timestamp);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
