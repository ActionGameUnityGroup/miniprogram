const app = getApp();
// let _this;

Page({
	data: {
		isRhythm: true,
		isSlient: false,
  	courseList: [],
	},
	onLoad: function(){
		app.request('https://www.changdaolife.cn/api/v0/course/getLastestList?page=shemer', {
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
	changeTabContent: function(e){
		const _this = this;
		const { id } = e.currentTarget;
		const actions = {
			rhythm: function(){ this.setData({ isRhythm: true, isSlient: false, }); },
			slient: function(){ this.setData({ isRhythm: false, isSlient: true, }); },
		};

		const action = actions[id];

		console.log(action);

		action.call(this);

	}
});