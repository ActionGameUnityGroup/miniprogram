const formatData = (data) => {
  resolve({
    errMsg: 'request:ok',
    status: 200,
    requestData: data
  });
};

const formatDataFail = (data) => {
  resolve({
    errMsg: 'request:fail',
    status: 404,
    requestData: data
  });
};

const saveModel = (model) => {
  model.save(function(err, res){
    if (!err) {
      resolve(res);
    }
    reject(err);
  });
};

module.exports = {
  formatData: formatData,
  formatDataFail: formatDataFail,
  saveModel: saveModel
};