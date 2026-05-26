// Handler for the "hey ravinder" greeting endpoint.

// Logs the greeting to the server console and responds with it as JSON.
function heyRavinderHandler(req, res) {
  console.log("hey ravinder");
  res.json({ message: "hey ravinder" });
}

module.exports = { heyRavinderHandler };
