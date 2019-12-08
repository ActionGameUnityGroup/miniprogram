import { Table, Button } from 'antd';
import router from 'umi/router';

const TutorList = ({ tutorList, pagination }) => {

  const columns = [{
    title: '排序',
    width: '10%',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
  },{
    title: '姓名',
    width: '10%',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },{
    title: '头像',
    width: '10%',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center',
    render: (img) => (
      <img src={img} alt="avatar" style={{ width: 100 }} />
    )
  },{
    title: '类型',
    width: '15%',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (type) => (
      <div>{
        type === 'resident' ?
        '常驻导师' : '特约导师'
      }</div>
    )
  },{
    title: '头衔',
    width: '25%',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    render: (titles) => (
      titles.length ?
      <div style={{ textAlign: 'left', lineHeight: 1.75, fontSize: 14 }}>
        {
          titles.map((title, key) => (
            <div key={key}>{title}</div>
          ))
        }
      </div>
      : <div>暂无</div>
    )
  },{
    title: '简介',
    width: '30%',
    dataIndex: 'introduce',
    key: 'introduce',
    align: 'center',
    render: (value) => (
      value ?
      <div
        style={{ textAlign: 'justify', lineHeight: 1.75, textIndent: '2rem', fontSize: 14 }}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
      : <div>暂无</div>
    )
  },{
    title: '操作',
    width: '5%',
    align: 'center',
    key: 'center',
    render: ({ tutorId }) => {
      return <Button onClick={() => {
        console.log(router.push);
        router.push('/setTutor', { tutorId });
        console.log(tutorId);
      }}>修改</Button>
    }
  }];

  return <Table dataSource={tutorList} columns={columns} bordered={true} pagination={pagination} />
}

export default TutorList;