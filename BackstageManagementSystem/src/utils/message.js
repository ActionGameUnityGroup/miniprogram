import { message } from 'antd';

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

class Message{

  constructor(){
    this.message = message;
  }

  success(content = '成功', duration = 2, onClose = function(){}){
    this.message.success(content, duration, onClose);
  }

  error(content = '错误', duration = 2, onClose = function(){}){
    this.message.error(content, duration, onClose);
  }

  info(content = '信息', duration = 2, onClose = function(){}){
    this.message.info(content, [duration], onClose);
  }

  warning(content = '警告', duration = 2, onClose = function(){}){
    this.message.warning(content, duration, onClose);
  }

  warn(content = '警告', duration = 2, onClose = function(){}){
    this.message.warn(content, duration, onClose);
  }

  loading(content = '过渡', duration = 2, onClose = function(){}){
    this.message.loading(content, duration, onClose);
  }
}

export default new Message();