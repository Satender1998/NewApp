// Helpers for reporting failures that originate from the upstream Hacker News API.

// Builds a consistent JSON error payload for an upstream fetch failure.
function upstreamErrorPayload(resource) {
  return { error: `Failed to fetch ${resource} from the Hacker News API.` };
}

// Sends a 502 Bad Gateway with a JSON error body. 502 is used (rather than 500)
// because the failure originates from the upstream Hacker News API, not this server.
function sendUpstreamError(res, resource) {
  res.status(502).json(upstreamErrorPayload(resource));
}

module.exports = { upstreamErrorPayload, sendUpstreamError };
