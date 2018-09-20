export default {
  namespace: 'admin',
  state: {
    nickname: '',
    avatar: '',
    token: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(history);
      history.listen(({ pathname, state }) => {
        /*if (pathname !== '/login') {
          const ws = new WebSocket('ws://192.168.31.155:3000');
          console.log('连接socket');
          dispatch({
            type: 'updatestate',
            payload: {
              ws: ws
            },
          });
        }*/
        console.log(pathname, 'pathname');
        console.log(state, 'state');
      });
    },
  },
  effect: {
    // 
  },
  reducers: {
    login(state, {payload}){
      console.log('更新state');
      console.log(payload);
      return {...state, ...payload};
    },
    delete(state, {payload}){
      // console.log('clear', payload);
      return {...state, ...payload};
    },
  },
};