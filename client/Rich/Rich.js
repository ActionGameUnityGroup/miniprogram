const app = getApp();
// let _this;

Page({
	data: {
		isDoor: true,
		isRoad: false,
		isSource: false,
  	courseList: [],
	},
	onLoad: function(){
		app.request('https://www.changdaolife.cn/api/v0/course/getCourseList?type=rich', {
			method: 'GET'
		}, this.renderData);
	},
	renderData: function(res) {
		console.log(res);
    let courseList = res.data.map(course => {
      course.loaded = false;
      course.show = false;
      return course;
    })
    this.setData({
      courseList: courseList,
    });
	},
	navigateOperation: function(e){
		wx.navigateTo({
			url: `/RegistrationDetail/RegistrationDetail?courseId=${e.currentTarget.id}`,
		});
	},
	changeTabContent: function(e){
		const _this = this;
		const { id } = e.currentTarget;
		const actions = {
			door: function(){ this.setData({ isDoor: true, isRoad: false, isSource: false, }); },
			road: function(){ this.setData({ isDoor: false, isRoad: true, isSource: false, }); },
			source: function(){ this.setData({ isDoor: false, isRoad: false, isSource: true, }); },
		};

		const action = actions[id];

		console.log(action);

		action.call(this);

	}
});