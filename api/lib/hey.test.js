const test = require("node:test");
const assert = require("node:assert");
const { heyHandler } = require("./hey");

test("heyHandler responds with the plain-text greeting", () => {
  let sentBody;
  const res = {
    send(body) {
      sentBody = body;
      return this;
    },
  };

  heyHandler({}, res);

  assert.strictEqual(sentBody, "hey satender");
});
