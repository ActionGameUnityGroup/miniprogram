import React, {Component} from 'react';
import style from './PageSection.css';

class Content extends Component{
  render(){
    return (
      <section className={style['page-section']} style={{width: this.props.width+'px', height: this.props.height+'px'}}>
        { this.props.children }
      </section>
    );
  }
}

export default Content;

/*
        <div className={style["preview-content"]}>
          <p className={style["content-title"]}>效果预览 ：</p>
          <div className={style["preview-page"]}>
            <div className={style["preview-page-header"]}><img src="/src/assets/icon/preview-head.jpg" alt="预览-头部"/></div>
            <div className={style["preview-page-banner"]}></div>
            <div className={style["preview-page-footer"]}><img src="/src/assets/icon/preview-foot.jpg" alt="预览-底部"/></div>
          </div>
        </div>
        <div className={style["banner-setting"]}>
          <p className={style["content-title"]}>Banner设置 ：</p>
          <div className={style["banner-content"]}>
            <ul className={style["banner-list"]}>
              <li className={style["banner-item"]}>
                <div className={style["banner-action-content"]}>
                  <div className={style["delete-action"]}>
                    <img src="" alt="图标"/>
                    <p>删除</p>
                  </div>
                  <div className={style["change-action"]}>
                    <img src="" alt="图标"/>
                    <p>更改</p>
                  </div>
                </div>
                <div className={style["banner-image-content"]}><img src="" alt="当前banner图"/></div>
              </li>
            </ul>
            <div className={style["add-banner-action"]}>
              <div className={style["add-banner-icon"]}><img src="/src/assets/icon/manage_1.png" alt="图标"/></div>
              <p>添加图片</p>
            </div>
            <div className={style["setting-action-content"]}>
              <div className={style["preview-action"]}>预览</div>
              <div className={style["sure-action"]}>确认</div>
            </div>
          </div>
        </div>
*/