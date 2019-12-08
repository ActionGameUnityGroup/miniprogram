import React, { Component } from 'react';
import { Table, Button } from 'antd';
import router from 'umi/router';

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
  title: '头像',
  dataIndex: 'avatar',
  key: 'avatar',
  align: 'center',
  width: '10%',
  render: (avatar) => (
    <img src={avatar} alt="avatar" style={{ width: 75 }} />
  )
},{
  title: '微信号',
  dataIndex: 'wechat',
  key: 'wechat',
  align: 'center',
  width: '10%',
},{
  title: '联系方式',
  dataIndex: 'phone',
  key: 'phone',
  align: 'center',
  width: '10%',
},{
  title: '二维码',
  dataIndex: 'qrcode',
  key: 'qrcode',
  align: 'center',
  width: '10%',
  render: (qrcode) => (
    <img src={qrcode} alt="qrcode" style={{ width: 75 }} />
  )
},{
  title: '座右铭',
  dataIndex: 'motto',
  key: 'motto',
  align: 'center',
  width: '15%',
  render: (motto) => (
    <div style={{ textAlign: 'justufy' }}>{motto}</div>
  )
},{
  title: '简介',
  dataIndex: 'intro',
  key: 'intro',
  align: 'center',
  width: '15%',
  render: (intro) => (
    <div
      style={{ maxHeight: 120, textAlign: 'justify', overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: intro }} />
  )
},{
  title: '操作',
  align: 'center',
  width: '10%',
  render: ({ assistantId }) => {
    return (<Button onClick={() => (
      router.push('/setAssistant', { assistantId })
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