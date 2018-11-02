import React from 'react';
import {connect} from 'dva';
import CourseSection from './Course/CourseSection';

const ModulePage = ({dispatch, courseList}) => {

  const updateCourseList = (list) => {
    console.log('更新state');
    console.log(list);
    dispatch({
      type: 'course/updateCourseList',
      payload: {
        courseList: list
      }
    });
  };

  return (
    <CourseSection onUpdate={updateCourseList} courseList={courseList} />
  );
};

const mapPropsToState = (state) => {
  return {
    courseList: state.course.courseList
  }
};

export default connect(mapPropsToState)(ModulePage);