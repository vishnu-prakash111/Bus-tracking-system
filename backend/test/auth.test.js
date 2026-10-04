import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { authMiddleware, authorizeRoles } from "../src/middlewares/auth.middleware.js";

const SECRET = "test_jwt_secret_key_12345";
process.env.ACCESS_TOKEN_SECRET = SECRET;

test("authMiddleware rejects missing Authorization header with 401", async () => {
  let statusCode = null;
  let responseBody = null;
  let nextCalled = false;

  const req = { headers: {} };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseBody = data;
      return this;
    },
  };
  const next = () => {
    nextCalled = true;
  };

  await authMiddleware(req, res, next);

  assert.equal(statusCode, 401);
  assert.equal(responseBody.success, false);
  assert.equal(nextCalled, false);
});

test("authMiddleware rejects invalid token with 401", async () => {
  let statusCode = null;
  let responseBody = null;
  let nextCalled = false;

  const req = { headers: { authorization: "Bearer invalid_token_xyz" } };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseBody = data;
      return this;
    },
  };
  const next = () => {
    nextCalled = true;
  };

  await authMiddleware(req, res, next);

  assert.equal(statusCode, 401);
  assert.equal(responseBody.success, false);
  assert.equal(nextCalled, false);
});

test("authMiddleware verifies valid token and populates req.user", async () => {
  let nextCalled = false;
  const token = jwt.sign({ _id: "user123", role: "admin" }, SECRET);

  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {
    status() { return this; },
    json() { return this; },
  };
  const next = () => {
    nextCalled = true;
  };

  await authMiddleware(req, res, next);

  assert.equal(nextCalled, true);
  assert.equal(req.user._id, "user123");
  assert.equal(req.user.role, "admin");
});

test("authorizeRoles blocks non-permitted roles with 403", () => {
  let statusCode = null;
  let responseBody = null;
  let nextCalled = false;

  const req = { user: { role: "passenger" } };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseBody = data;
      return this;
    },
  };
  const next = () => {
    nextCalled = true;
  };

  const middleware = authorizeRoles("admin");
  middleware(req, res, next);

  assert.equal(statusCode, 403);
  assert.equal(responseBody.success, false);
  assert.equal(nextCalled, false);
});

test("authorizeRoles allows permitted roles", () => {
  let nextCalled = false;
  const req = { user: { role: "admin" } };
  const res = {};
  const next = () => {
    nextCalled = true;
  };

  const middleware = authorizeRoles("admin");
  middleware(req, res, next);

  assert.equal(nextCalled, true);
});
