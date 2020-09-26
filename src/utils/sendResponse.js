const formatResponse = require('./formatResponse');

const sendResponse = async (res, result) => {
  const response = await formatResponse(result);
  res.send(response);
};

module.exports = sendResponse;