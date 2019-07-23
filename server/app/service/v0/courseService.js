const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseModel = require(`${rootDirectory}/model/v0/courseModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const uuid = require('uuid');

class CourseService extends formatData {

	async getCourseList(ctx) {
		let response;
		try {
			let queryParams = {};
			let { category, number, size } = ctx.request.query;
			if (category) {
				queryParams['category'] = category;
			}
			if (!number || !size) {
				throw new Error('请添加分页查询参数');
			}
			let data = await courseModel.find(queryParams, '-_id').limit(size * 1).skip((number * 1) - 1).sort({sort: -1});
      let count = Math.ceil(await courseModel.count({}));
      let total = Math.ceil(count/size);
      response = this.formatDataSuccess({ data, count, total, current: number * 1, size: size * 1 });
		}catch (e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

	async getCourseInfo(ctx) {
		let response;
		try {
			let queryParams = {};
			let { courseId } = ctx.request.query;
			if (!courseId) {
				throw new Error('缺少课程ID');
			}
			queryParams['courseId'] = courseId;
			const data = await courseModel.find(queryParams, '-_id');
			response = this.formatDataSuccess(data);
		}catch (e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

  async setCourseInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body) || {};
      let featureInfo = new courseModel({
        courseId: uuid.v4(),
        ...params,
      });
      let data = await featureInfo.save();
      if (!data) {
        throw new Error('保存课程失败');
      }
      response = this.formatDataSuccess({info: '保存课程成功'});
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateCourseInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body) || {};
      let courseId = params.courseId;
      let updateOptions = Object.assign({}, params);
      delete updateOptions.courseId;
      if (!courseId) {
        throw new Error('没有找到目标课程，更新课程失败！');
      }
      let data = await courseModel.update({ courseId }, updateOptions, { multi: false });
      if (!data) {
        throw new Error('更新课程失败');
      }
      response = this.formatDataSuccess({info: '更新课程成功'});
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new CourseService();