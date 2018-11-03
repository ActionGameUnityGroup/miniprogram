const mapArrToId = (list) => {
  let idText = '';
  const static = 2018;
  for(let index = 0; index < list.length; index++){
    if(index%2 === 0 && index < list.length - 1){
      let newNum = Number(list[index]) + Number(list[index]);
      if(newNum >= 10) {
        let numText = newNum.toString();
        newNum = Number(numText.substring(0, 1)) + Number(numText.substring(1, numText.length));
      }
      idText += `${newNum}`;
    }
  }
  return `${Number(idText) + static}`;
};

const createUserId = (time) => {
  let text = new String(time);
  let arr = text.substring(0, text.length - 1).split('');
  let userId = mapArrToId(arr);
  return userId;
};

module.exports = createUserId