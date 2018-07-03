const formatData = (data) => {
  console.log('format', new Date().getTime());
  return new Promise((resolve, reject) => {
    // console.log(data);
    const _data = [];
    try{
      data.map((item, key) => {
        delete item['_id'];
        _data.push(item);
        if (key+1 === data.length) {
          delete data;
          resolve({ errMsg: 'request:ok', status: 200, data: _data });
        }
      });
    }catch(e){
      reject('遍历失败');
    }
  });
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