const apiResponse = (res, status, data) => {
  res.setHeader('X-Total-Count', data?.length || 0);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  return res.status(status).json(data);
}

module.exports = apiResponse;