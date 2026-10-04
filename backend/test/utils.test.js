import test from "node:test";
import assert from "node:assert/strict";
import ApiError from "../src/utils/ApiError.js";
import ApiResponse from "../src/utils/ApiResponse.js";
import asyncHandler from "../src/utils/asyncHandler.js";

test("ApiError creates error object with statusCode, success=false, and error array", () => {
  const err = new ApiError(404, "Bus route not found", ["Invalid stop ID"]);
  assert.equal(err.statusCode, 404);
  assert.equal(err.message, "Bus route not found");
  assert.equal(err.success, false);
  assert.deepEqual(err.errors, ["Invalid stop ID"]);
  assert.ok(err.stack);
});

test("ApiResponse formats success response correctly", () => {
  const resp = new ApiResponse(200, { busId: 101, speed: 45 }, "Bus details fetched");
  assert.equal(resp.statusCode, 200);
  assert.equal(resp.success, true);
  assert.equal(resp.message, "Bus details fetched");
  assert.equal(resp.data.busId, 101);
});

test("ApiResponse marks status >= 400 as success=false", () => {
  const resp = new ApiResponse(400, null, "Bad request data");
  assert.equal(resp.statusCode, 400);
  assert.equal(resp.success, false);
});

test("asyncHandler forwards rejected promise to next()", async () => {
  let passedError = null;
  const mockError = new Error("Async failure");
  const handler = asyncHandler(async () => {
    throw mockError;
  });

  const next = (err) => {
    passedError = err;
  };

  handler({}, {}, next);
  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(passedError, mockError);
});
