import { Table, Button } from 'antd';
import router from 'umi/router';
import formatTimestampToDate from '@/utils/formatTimestampToDate';

function RichList({ list, loading, handleRelease }) {

  const columns = [{
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
    width: '10%',
  },{
    title: '封面',
    dataIndex: 'poster',
    key: 'poster',
    align: 'center',
    width: '35%',
    render: (poster) => {
      if (poster) {
        return (<img src={poster} alt="poster" style={{ width: 120 }} />);
      } else {
        return (<span>暂无封面</span>);
      }
    },
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: '35%',
  },{
    title: '上传日期',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    width: '20%',
    render: (time) => (<div>{formatTimestampToDate(time)}</div>)
  },{
    title: '操作',
    align: 'center',
    width: '10%',
    render: ({ videoId }) => (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={() => {
            router.push('/setVideo', { videoId });
          }}>修改信息</Button>
        </div>
        <div>
          <Button type='danger'>删除视频</Button>
        </div>
      </div> 
    )
  }];

  return <Table columns={columns} dataSource={list} bordered={true} loading={loading} />

}

export default RichList;