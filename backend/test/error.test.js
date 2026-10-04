import test from "node:test";
import assert from "node:assert/strict";
import errorMiddleware from "../src/middlewares/error.middleware.js";

const createMockRes = () => {
  let statusCode = 200;
  let responseData = null;
  return {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    getStatus() {
      return statusCode;
    },
    getData() {
      return responseData;
    },
  };
};

test("errorMiddleware formats default 500 error", () => {
  const err = new Error("Generic database failure");
  const req = {};
  const res = createMockRes();
  const next = () => {};

  errorMiddleware(err, req, res, next);

  assert.equal(res.getStatus(), 500);
  assert.equal(res.getData().success, false);
  assert.equal(res.getData().message, "Generic database failure");
});

test("errorMiddleware formats Mongoose CastError as 400 Bad Request", () => {
  const err = new Error("Cast to ObjectId failed");
  err.name = "CastError";
  err.path = "_id";

  const res = createMockRes();
  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.getStatus(), 400);
  assert.equal(res.getData().success, false);
  assert.ok(res.getData().message.includes("Invalid ID format for field '_id'"));
});

test("errorMiddleware formats Mongoose duplicate key 11000 as 409 Conflict", () => {
  const err = new Error("Duplicate key error");
  err.code = 11000;
  err.keyValue = { busNumber: "UP32AB1234" };

  const res = createMockRes();
  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.getStatus(), 409);
  assert.equal(res.getData().success, false);
  assert.ok(res.getData().message.includes("Duplicate value entered for field: busNumber"));
});

test("errorMiddleware formats Mongoose ValidationError as 400 Bad Request", () => {
  const err = new Error("Validation failed");
  err.name = "ValidationError";
  err.errors = {
    busName: { message: "busName is required" },
    route: { message: "route is required" },
  };

  const res = createMockRes();
  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.getStatus(), 400);
  assert.equal(res.getData().success, false);
  assert.ok(res.getData().message.includes("busName is required"));
});

test("errorMiddleware formats JsonWebTokenError as 401 Unauthorized", () => {
  const err = new Error("jwt malformed");
  err.name = "JsonWebTokenError";

  const res = createMockRes();
  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.getStatus(), 401);
  assert.equal(res.getData().success, false);
  assert.equal(res.getData().message, "Invalid JSON Web Token");
});
