class FormatData{
  formatDataSuccess(data) {
    return {
      errMsg: '',
      status: 'request:ok',
      data: data,
    };
  }
  formatDataFail(errMsg) {
    return {
      errMsg: errMsg,
      status: 'request:fail',
      info: [],
    };
  }
}

module.exports = FormatData;