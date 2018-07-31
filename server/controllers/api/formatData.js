const formatData = (data) => {
  return new Promise((resolve, reject) => {
    resolve({
      errMsg: 'request:ok',
      status: 200,
      requestData: data
    });
  });
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