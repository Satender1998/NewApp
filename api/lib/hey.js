// Handler for the simple greeting endpoint.

// Responds with a fixed plain-text greeting.
function heyHandler(req, res) {
  res.send("hey satender");
}

module.exports = { heyHandler };
