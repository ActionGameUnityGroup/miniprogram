import React, { Component } from 'react';
import { Table, Button } from 'antd';
import router from 'umi/router';
import { formatTimestampToDate } from '@/utils';

const columns = [{
  title: '排序',
  dataIndex: 'sort',
  key: 'sort',
  align: 'center',
  width: '10%',
},{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  width: '10%',
},{
  title: '分享时间',
  dataIndex: 'time',
  key: 'time',
  align: 'center',
  width: '15%',
  render(time) {
    return (
      <div>{formatTimestampToDate(time)}</div>
    );
  }
},{
  title: '分享内容',
  dataIndex: 'content',
  key: 'content',
  align: 'center',
  width: '15%',
  render: (content) => (
    <div
      style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 5, overflow: 'hidden', textAlign: 'justify' }}
      dangerouslySetInnerHTML={{ __html: content }} />
  )
},{
  title: '操作',
  align: 'center',
  width: '10%',
  render: ({ studentId }) => {
    return (<Button onClick={() => (
      router.push('/setStudentShare', { studentId })
    )}>修改信息</Button>);
  }
}];

class AssistantList extends Component {
  render() {
    const { list, loading } = this.props;
    return (
      <Table columns={columns} dataSource={list} bordered={true} loading={loading} />
    );
  }
}

export default AssistantList;