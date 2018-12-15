const formatDataSuccess = (data) => {
  return {
    errMsg: '',
    status: 'request:ok',
    data: data,
  };
};

const formatDataFail = (errMsg) => {
  return {
    errMsg: errMsg,
    status: 'request:fail',
    info: [],
  };
};

module.exports = {
  formatDataSuccess: formatDataSuccess,
  formatDataFail: formatDataFail,
};