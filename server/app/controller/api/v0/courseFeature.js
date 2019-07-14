const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const courseFeatureService = require(`${rootDirectory}/service/v0/courseFeatureService`);

class CourseFeature {

  async getCourseFeatureList(ctx) {
    const response = await courseFeatureService.getCourseFeatureList(ctx);
    ctx.body = response;
  }

  async getCourseFeatureInfo(ctx) {
    const response = await courseFeatureService.getCourseFeatureInfo(ctx);
    ctx.body = response;
  }

  async setCourseFeatureInfo(ctx) {
    const response = await courseFeatureService.setCourseFeatureInfo(ctx);
    ctx.body = response;
  }

  async updateCourseFeatureInfo(ctx) {
    const response = await courseFeatureService.updateCourseFeatureInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new CourseFeature();