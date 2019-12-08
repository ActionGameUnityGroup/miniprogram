class FormatData{
  formatDataSuccess(data) {
    return {
      errMsg: '',
      status: 'request:ok',
      code: 200,
      data: data,
    };
  }
  formatDataFail(errMsg) {
    return {
      errMsg: errMsg,
      status: 'request:fail',
      code: 400
    };
  }
}

module.exports = FormatData;