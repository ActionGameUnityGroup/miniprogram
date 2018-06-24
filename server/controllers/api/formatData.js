const formatData = (data) => {
  console.log('format', new Date().getTime());
  return {
            errMsg: 'request:ok',
            status: 200,
            data: data
          };
};

const formatDataFail = (data) => {
  return {
            errMsg: 'request:fail',
            status: 404,
            data: data
          };
};

module.exports = {
  formatData: formatData,
  formatDataFail: formatDataFail
};