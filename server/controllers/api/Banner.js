const bannerModel = require('../../models/bannerModel');
const {formatData, formatDataFail} = require('./formatData');
const upload = require('./upload');
const fs = require('fs');
const path = require('path');

class Banner{

  async getBanner(ctx){
    const page = ctx.query.page;
    const data = await bannerModel.find({page: page}, '-_id -page');
    const bannerList = [];
    const list = data[0].bannerList;
    // console.log(list, 'bannerlist');
    // const imagePath = path.resolve(__dirname, `../../public/image/banner/${page}`);
    for(let index = 0; index < list.length; index++){
      let file = fs.readFileSync(list[index].url);
      // console.log(file, '文件编码');
      bannerList[index] = {name: list[index].name, url: file};
      if(bannerList.length >= list.length){
        ctx.info(`${ctx.url}: ${bannerList}`);
        ctx.body = formatData(bannerList);
        ctx.type = 'text/json';
      }
    }
  }

  async setBanner(ctx){
    console.log('上传banner图');
    // console.log(ctx);
    const page = ctx.query.page;
    let data = await bannerModel.find({page: page}, '-_id');
    // console.log('页面banner：', data);
    let fileStream = await upload(ctx);
    let date = new Date();
    let fileName = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    // console.log(fileStream, '上传的图片');
    // console.log(fileStream.file, '文件');
    let fileType = fileStream.fileName.substring(fileStream.fileName.indexOf('.'), fileStream.fileName.length);
    // console.log(fileType, '文件类型');
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/image/banner/${page}/${fileName}${fileType}`)));
    if (!data.length) {
      // 没数据
      console.log('没数据');
      let banner = {
        page: page,
        bannerList: [
          {
            name: fileStream.fileName,
            url: path.resolve(__dirname, `../../public/image/banner/${page}/${fileName}${fileType}`)
          }
        ]
      };
      let bannerList = new bannerModel(banner);
      let res = await bannerList.save();
      ctx.info(`${ctx.url}: ${res}`);
      ctx.body = await formatData({info: '添加banner图片成功！'});
      ctx.type = 'text/json';
    } else {
      // 有数据
      console.log('有数据', data[0]);
      let flag = true;
      for(let i = 0; i < data[0].bannerList.length; i++){
        // console.log(key);
        if (data[0].bannerList[i].name == fileStream.fileName) {
          flag = false;
          break;
        }
      }
      console.log(flag, '添加?');
      if (flag) {
        data[0].bannerList.push({
          name: fileStream.fileName,
          url: path.resolve(__dirname, `../../public/image/banner/${page}/${fileName}${fileType}`)
        });
        console.log(data[0].bannerList);
        let res = await bannerModel.update({page: page}, {bannerList: data[0].bannerList}, {multi: true});
        ctx.info(`${ctx.url}: ${res}`);
        ctx.body = await formatData({info: '更新banner图片成功！'});
        ctx.type = 'text/json';
      } else {
        ctx.body = await formatDataFail({info: '请更换图片！'});
        ctx.type = 'text/json';
      }
    }
  }

  /*
  {
            "name" : "系统排列·亲密关系",
            "url" : "https://www.changdaolife.cn/image/banner/1.jpg"
        }, 
        {
            "name" : "系统排列·金钱",
            "url" : "https://www.changdaolife.cn/image/banner/2.jpg"
        }, 
        {
            "name" : "照梦空间",
            "url" : "https://www.changdaolife.cn/image/banner/3.jpg"
        }
   */

  async deletBanner(ctx){
    console.log('上传banner图');
    // console.log(ctx);
    const page = ctx.query.page;
    let data = await bannerModel.find({page: page}, '-_id');
    // console.log('页面banner：', data);
    let fileStream = await upload(ctx);
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/image/banner/${page}/${fileStream.fileName}`)));
    if (!data.length) {
      // 没数据
      console.log('没数据');
      let banner = {
        page: page,
        bannerList: [
          {
            name: fileStream.fileName,
            url: `https://www.changdaolife.cn/image/banner/${page}/${fileStream.fileName}`
          }
        ]
      };
      let bannerList = new bannerModel(banner);
      let res = await bannerList.save();
      ctx.info(`${ctx.url}: ${res}`);
      ctx.body = await formatData({info: '添加banner图片成功！'});
      ctx.type = 'text/json';
    } else {
      // 有数据
      console.log('有数据', data[0]);
      let flag = true;
      for(let i = 0; i < data[0].bannerList.length; i++){
        // console.log(key);
        if (data[0].bannerList[i].name == fileStream.fileName) {
          flag = false;
          break;
        }
      }
      if (flag) {
        data[0].bannerList.push({
          name: fileStream.fileName,
          url: `https://www.changdaolife.cn/image/${fileStream.fileName}`
        });
        console.log(data[0].bannerList);
        let res = await bannerModel.update({page: page}, {bannerList: data[0].bannerList}, {multi: true});
        ctx.info(`${ctx.url}: ${res}`);
        ctx.body = await formatData({info: '更新banner图片成功！'});
        ctx.type = 'text/json';
      } else {
        ctx.body = await formatDataFail({info: '请更换图片！'});
        ctx.type = 'text/json';
      }
    }
  }

}

module.exports = new Banner();