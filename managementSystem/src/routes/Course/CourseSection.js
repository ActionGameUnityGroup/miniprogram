import React, {Component} from 'react';
import { Button } from 'antd';
import style from './CourseSection.css';
import CreateCourse from './CreateCourse';
import request from '../../utils/request';

class CourseSection extends Component{

  state = {
    /*courseList: [
      {
        courseCover: '',
        courseId: '001',
        courseTitle: '《中庸》第一章：天命之谓性',
        courseDetail: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活',
        courseStatus: '上线',
        status: 1,
        courseLength: '10课时'
      },
      {
        courseCover: '',
        courseId: '002',
        courseTitle: '《中庸》第一章：天命之谓性',
        courseDetail: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活',
        courseStatus: '下线',
        status: 0,
        courseLength: '10课时'
      },
    ],*/
    visible: false
  };

  UNSAFE_componentWillMount(){
    console.log('准备渲染');
    let _this = this;
    request('https://www.changdaolife.cn/api/course/getCourse')
    .then(res => {
      console.log(res, '课程');
      _this.props.onUpdate(res.data.requestData.courseList);
    })
    .then(err => {
      console.error(err, '错误');
    });
  }

  componentWillUpdate(){
    console.log('即将更新');
  }

  addCourseAction(){
    console.log('添加课程');
    console.log(this);
    this.setState({
      visible: true,
    });
  }

  cancelAddCourseAction(){
    console.log('不添加课程');
    this.setState({
      visible: false,
    });
  }

  updateCourseAction(e){
    console.log('更新课程');
    console.log(e.target);
  }

  undercarriageAction(e){
    console.log('下架课程');
    console.log(e.target);
  }

  groundingAction(e){
    console.log('上架课程');
    console.log(e.target);
  }

  render(){
    console.log(this.state);
    return (
      <div className={style['course-section']}>
        <h1 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '10px 0', /*borderBottom: '1px dashed #999'*/}}>
          <span> 课程列表 </span>
          <Button type="primary" onClick={() => this.addCourseAction()}> 添加课程 </Button>
        </h1>
        <div className={style["course-explain"]}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75%', textAlign: 'center'}}>
            <div style={{width: 535, textAlign: 'center'}}>课程信息</div>
            <div style={{width: 200, textAlign: 'center'}}>课程状态</div>
            <div style={{width: 200, textAlign: 'center'}}>课时数量</div>
          </div>
          <div style={{width: '20%', textAlign: 'center'}}>课程操作</div>
        </div>
        <div className={style['course-list']}>
          {
            this.props.courseList.map((child, key) => {
              return (
                <div className={style['course-item']} key={key}>
                  <div className={style["course-info"]}>
                    <div className={style["course-cover"]}><img src={child.courseCover} alt="课程封面"/></div>
                    <div className={style["course-msg"]}>
                      <div className={style["course-title"]}>{child.courseTitle}</div>
                      <div className={style["course-detail"]}>{child.courseDetail}</div>
                    </div>
                    <div className={style['line']}></div>
                    <div className={style["course-status"]}>
                      <span className={child.status === 1 ? style['on-line'] : style['off-line']}> {child.courseStatus} </span>
                    </div>
                    <div className={style['line']}></div>
                    <div className={style["course-length"]}>{child.courseLength}</div>
                  </div>
                  <div className={style['line']}></div>
                  {
                    child.status === 0 ? (
                      <div className={style["course-action"]}>
                        <Button size='small' id={child.courseId} onClick={e => this.updateCourseAction(e)}> 更新课程 </Button>
                        <br/>
                        <Button size='small' id={child.courseId} onClick={e => this.groundingAction(e)}> 上架课程 </Button>
                      </div>
                    ) : (
                      <div className={style["course-action"]}>
                        <Button size='small' id={child.courseId} onClick={e => this.updateCourseAction(e)}> 更新课程 </Button>
                        <br/>
                        <Button size='small' id={child.courseId} onClick={e => this.undercarriageAction(e)}> 下架课程 </Button>
                      </div>
                    )
                  }
                </div>
              );
            })
          }
        </div>
        <CreateCourse isVisible={this.state.visible} onCancelAddCourse={() => this.cancelAddCourseAction()} onUpdate={this.props.onUpdate} />
      </div>
    );
  }
}

export default CourseSection;