/**
 * Sends a JSON response with the specified status code, status code, and optional data.
 * @param {object} res - The response object.
 * @param {number} status - The HTTP status code.
 * @param {number} statusCode - The custom status code.
 * @param {string} statusDesc - The description of the status.
 * @param {object|null} data - The data to be included in the response (optional).
 * @returns {object} The response object.
 */
const sendResponse = (
  res,
  status,
  responseCode,
  responseDescription,
  data = null
) => {
  res.status(status).json({
    result: { responseCode, responseDescription },
    ...(data !== null && { data }),
  });
};

module.exports = {
  sendResponse,
};
