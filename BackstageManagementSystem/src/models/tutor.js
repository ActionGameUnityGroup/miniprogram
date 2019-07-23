// import { URL, request } from '@/utils';
export default {
  namespace: 'tutor',
  state: {
    tutorList: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, state }) => {
        // console.log(pathname, 'pathname');
        // console.log(state, 'state');
        /*if (pathname === '/tutor') {
          request(URL.getTutorList, {
            method: 'GET'
          }).then(data => {
            let tutorList = [];
            for (let i = 0, length = data.data.data.length; i < length; i++) {
              let item = data.data.data[i];
              item.key = i;
              item.introduce = item.personalIdentification;
              tutorList.push(item);
            }
            dispatch({
              type: 'add',
              payload: { tutorList }
            });
          }).catch(err => console.log(err));
        }*/
        // console.log(state, 'state');
      });
    },
  },
  reducers: {
    /*delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },*/
    add(state, { payload }) {
      console.log({ ...state, ...payload });
      return { ...state, ...payload };
    },
    query(state) {
      return { ...state };
    }
  },
};