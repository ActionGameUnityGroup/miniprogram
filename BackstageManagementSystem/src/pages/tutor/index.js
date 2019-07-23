import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';
import TutorList from './components/TutorList';
import styles from './tutor.css';
import { URL, request } from '@/utils';

class Tutors extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageSize: 10,
      total: 10,
    }

    this.getTutorList({ number: 1, size: 10 });
  }

  getTutorList = ({ number, size }) => {
    const { dispatch } = this.props;
    const _this = this;
    request(`${URL.getTutorList}?number=${number}&size=${size}`, {
      method: 'GET'
    }).then(data => {
      let tutorList = [];
      for (let i = 0, length = data.data.data.data.length; i < length; i++) {
        let item = data.data.data.data[i];
        item.key = i;
        item.introduce = item.personalIdentification;
        tutorList.push(item);
      }
      dispatch({
        type: 'tutor/add',
        payload: { tutorList }
      });
      _this.setState({

      })
    }).catch(err => console.log(err));
  }

  addNewTutor = () => {
    console.log('新增');
    this.props.history.push('/setTutor', null);
  }

  handleChangePageNumber = (page, pageSize) => {
    this.getTutorList({ size: pageSize, number: page });
  }

  render() {
    const { tutorList } = this.props;
    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>导师列表</h2>
          <Button type='primary' onClick={this.addNewTutor}>新增导师</Button>
        </div>
        <TutorList
          tutorList={tutorList}
          pagination={{
            pageSize: this.state.pageSize,
            total: this.state.total,
            onChange: this.handleChangePageNumber
          }}
        />
      </div>
    );
  }

}


/*import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {

  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );

}*/

const mapPropsToState = (state) => {
  let { tutorList } = state.tutor;
  return { tutorList };
}

export default connect(mapPropsToState)(Tutors);
