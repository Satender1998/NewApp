const test = require("node:test");
const assert = require("node:assert");
const { upstreamErrorPayload, sendUpstreamError } = require("./upstreamError");

test("upstreamErrorPayload returns an object with an error string naming the resource", () => {
  const payload = upstreamErrorPayload("top stories");
  assert.strictEqual(typeof payload.error, "string");
  assert.match(payload.error, /top stories/);
  assert.match(payload.error, /Hacker News API/);
});

test("sendUpstreamError responds with status 502 and a JSON error body", () => {
  let statusCode;
  let jsonBody;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      jsonBody = body;
      return this;
    },
  };

  sendUpstreamError(res, "new stories");

  assert.strictEqual(statusCode, 502);
  assert.strictEqual(typeof jsonBody.error, "string");
  assert.match(jsonBody.error, /new stories/);
});
