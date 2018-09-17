import React, {Component} from 'react';
import { Button } from 'antd';
import style from './CourseSection.css';

class CourseSection extends Component{

  state = {
    courseList: [
      {courseCover: '', courseTitle: '《中庸》第一章：天命之谓性', courseDetail: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活'},
    ]
  };

  UNSAFE_componentWillMount(){
    console.log('准备渲染');
  }

  addCourseAction(){
    console.log('添加课程');
  }

  updateCourseAction(e){
    console.log('更新课程');
    console.log(e.target);
  }

  undercarriageAction(e){
    console.log('下架课程');
    console.log(e.target);
  }

  render(){
    return (
      <div className={style['course-section']}>
        <h1 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '10px 0', /*borderBottom: '1px dashed #999'*/}}>
          <span> 课程列表 </span>
          <Button type="primary" onClick={this.addCourseAction}> 添加课程 </Button>
        </h1>
        <div className={style["course-explain"]}>
          <div style={{width: '70%', textAlign: 'center'}}>课程信息</div>
          <div style={{width: 120, textAlign: 'center'}}>课程操作</div>
        </div>
        <div className={style['course-list']}>
          {
            this.state.courseList.map((child, key) => {
              return (
                <div className={style['course-item']} key={key}>
                  <div className={style["course-info"]}>
                    <div className={style["course-cover"]}><img src={child.courseCover} alt="课程封面"/></div>
                    <div className={style["course-msg"]}>
                      <div className={style["course-title"]}>{child.courseTitle}</div>
                      <div className={style["course-detail"]}>{child.courseDetail}</div>
                    </div>
                  </div>
                  <div className={style['line']}></div>
                  <div className={style["course-action"]}>
                    <Button size='small' onClick={e => this.updateCourseAction(e)}> 更新课程 </Button>
                    <br/>
                    <Button size='small' onClick={e => this.undercarriageAction(e)}> 下架课程 </Button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default CourseSection;