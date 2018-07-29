const formatData = (data) => {
  return {
    errMsg: 'request:ok',
    status: 200,
    requestData: data
  };
};

const formatDataFail = (data) => {
  return {
    errMsg: 'request:fail',
    status: 404,
    requestData: data
  };
};

module.exports = {
  formatData: formatData,
  formatDataFail: formatDataFail
};