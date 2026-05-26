const test = require("node:test");
const assert = require("node:assert");
const { heyRavinderHandler } = require("./hey-ravinder");

test("heyRavinderHandler responds with the JSON greeting", () => {
  let sentJson;
  const res = {
    json(body) {
      sentJson = body;
      return this;
    },
  };

  heyRavinderHandler({}, res);

  assert.deepStrictEqual(sentJson, { message: "hey ravinder" });
});

test("heyRavinderHandler logs the greeting to the console", () => {
  const originalLog = console.log;
  const logged = [];
  console.log = (...args) => logged.push(args.join(" "));

  try {
    heyRavinderHandler({}, { json() {} });
  } finally {
    console.log = originalLog;
  }

  assert.ok(logged.includes("hey ravinder"));
});
