import { Table, Button } from 'antd';
import router from 'umi/router';

function RichList({ list, loading, handleRelease }) {

  const categoryType = {
    marchTowardRich: '迈向丰盛',
    richDoor: '丰盛之门',
    richRoad: '丰盛之道',
    richSource: '丰盛之源',
  };

  const columns = [{
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
    width: '10%',
  },{
    title: '所属类型',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
    width: '15%',
    render: (category) => (
      <div>{categoryType[category]}</div>
    )
  },{
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center',
    width: '15%',
    render: (cover) => (
      <img src={cover} alt="cover" style={{ width: 118 }} />
    )
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: '25%',
    render: (title) => (
      <div style={{ textAlign: 'justify' }}>{title}</div>
    )
  },{
    title: '副标题',
    dataIndex: 'subTitle',
    key: 'subTitle',
    align: 'center',
    width: '25%',
    render: (subTitle) => (
      <div style={{ textAlign: 'justify' }}>{subTitle}</div>
    )
  },/*{
    title: '课程Banner',
    dataIndex: 'banner',
    key: 'banner',
    align: 'center',
    render: (img) => (
      <img src={img} alt="Banner" style={{ width: 118 }} />
    )
  },*/{
    title: '操作',
    align: 'center',
    width: '10%',
    render: ({ courseId }) => (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={() => {
            router.push('/setRich', { courseId });
          }}>修改信息</Button>
        </div>
      </div> 
    )
  }];

  return <Table columns={columns} dataSource={list} bordered={true} loading={loading} />

}

export default RichList;