const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const rootDirectory = path.resolve(__dirname, '../../');
const publicDirectory = path.resolve(__dirname, '../../../public/');
// const uploadModel = require(`${rootDirectory}/model/v0/uploadModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

const imageType = new Map([
                    ['image/jpeg', 'jpg'],
                    ['image/png', 'png'],
                    ['image/gif', 'gif'],
                    ['default', ''],
                  ]);

class UploadService extends formatData {

  async image(ctx) {
    let response;
    try {
      const files = ctx.request.body.files;
      const image = files.image;
      console.log(image);
      if (image) {
        let fileType = imageType.get(image.type) || imageType.get('default');
        if (!fileType) {
          throw new TypeError('请选择正确的图片格式进行上传!');
        }
        let reader = fs.createReadStream(image.path),
            writer = fs.createWriteStream(`${publicDirectory}/image/${uuid.v4()}.${fileType}`);
        reader.pipe(writer);
        response = this.formatDataSuccess({info: '上传成功'});
      } else {
        throw new TypeError('请选择图片进行上传!');
      }
    } catch(e){
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new UploadService();