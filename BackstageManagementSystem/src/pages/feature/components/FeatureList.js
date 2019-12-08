import { Table, Button } from 'antd';
import router from 'umi/router';

function FeatureList({ list, loading, handleRelease }) {

  const columns = [{
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
    width: '10%',
  },{
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center',
    width: '15%',
    render: (cover) => (
      <img src={cover} alt="cover" style={{ width: 120 }} />
    )
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: '20%',
  },{
    title: '副标题',
    dataIndex: 'subTitle',
    key: 'subTitle',
    align: 'center',
    width: '20%',
  },{
    title: '浏览量',
    dataIndex: 'viewCount',
    key: 'viewCount',
    align: 'center',
    width: '10%',
  },{
    title: '状态',
    dataIndex: 'isRelease',
    key: 'isRelease',
    align: 'center',
    width: '10%',
    render: (isRelease) => (
      <span>{
        isRelease ? '已发布' : '未发布'
      }</span>
    )
  },{
    title: '操作',
    align: 'center',
    width: '10%',
    render: ({ featureId, isRelease }) => (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={() => {
            router.push('/setFeature', { featureId });
          }}>修改信息</Button>
        </div>
        {/*<div style={{ marginBottom: 10 }}>
          <Button onClick={() => handleRelease(!isRelease)}>{
            isRelease ? '下架' : '发布'
          }</Button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={() => {
            router.push('/setFeature', { featureId });
          }}>删除</Button>
        </div>*/}
      </div> 
    )
  }];

  return <Table columns={columns} dataSource={list} bordered={true} loading={loading} />

}

export default FeatureList;