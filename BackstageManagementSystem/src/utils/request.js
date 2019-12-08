import message from './message';
import router from 'umi/router';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    message.warning('登录信息已过期，请重新登录', 2, () => {
      router.push('/login', null);
    });
    return;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const host = 'https://www.changdaolife.cn';
// const host = 'http://127.0.0.1:9000';
// const host = 'http://192.168.1.102:9000';
export default function request(url, options) {
  return fetch(host + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
