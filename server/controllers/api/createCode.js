module.exports = () => {
  return new Promise((resolve, reject) => {
    let code = "";
    var codeLength = 6; //验证码的长度
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
      var charNum = Math.floor(Math.random() * 10);
      code += codeChars[charNum];
    }
    // console.log(code);
    resolve(code);
  });
};