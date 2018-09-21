import React from 'react';
import {connect} from 'dva';
import PageHead from '../components/PageHead/PageHead';
import NavBar2 from '../components/NavBar2';
import PageSection from '../components/PageSection/PageSection';
import CourseSection from './Course/CourseSection';

function getClientHeight(){
  return window.innerHeight;
}

function getClientWidth(){
  return window.innerWidth;
}

const ModulePage = ({dispatch, courseList}) => {

  const updateCourseList = (list) => {
    dispatch({
      type: 'course/updateCourseList',
      payload: {
        courseList: list
      }
    });
  };

  return (
    <div className="page" style={{height: getClientHeight()+'px'}}>
      <PageHead userName={'智慧小编'} avatar={''} />
      <content style={{height: getClientHeight() - 50 +'px'}}>
        <NavBar2 height={getClientHeight() - 50} selectKey={['4']} />
        <PageSection height={getClientHeight() - 50} width={getClientWidth() - 112}>
          <CourseSection onUpdate={updateCourseList} courseList={courseList} />
        </PageSection>
      </content>
      <footer></footer>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    courseList: state.course.courseList
  }
};

export default connect(mapPropsToState)(ModulePage);