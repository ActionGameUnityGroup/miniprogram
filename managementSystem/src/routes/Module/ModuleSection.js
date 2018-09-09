import React, {Component} from 'react';
import style from './ModuleSection.css';
import { Anchor } from 'antd';
import Wood from './Wood/Wood';
import Fire from './Fire/Fire';
import Earth from './Earth/Earth';
import Gold from './Gold/Gold';
import Water from './Water/Water';
const { Link } = Anchor;

class ModuleSection extends Component{

  render(){
    return (
      <div className={style['module-section']}>
        <h1 style={{margin: 0, padding: '10px 0'}}>模块</h1>
        <Anchor>
          <Link href='#element' title='元素'>
            <Link href='#wood' title='木元素' />
            <Link href='#fire' title='火元素' />
            <Link href='#earth' title='土元素' />
            <Link href='#gold' title='金元素' />
            <Link href='#water' title='水元素' />
          </Link>
          <Link href='#class' title='课堂'/>
          <Link href='#health' title='疗愈'/>
          <Link href='#vip' title='会员'/>
          <Link href='#walfare' title='公益'/>
          <Link href='#signin' title='签到'/>
        </Anchor>
        <div className={style["module-content"]}>
          <h2 id="element">元素</h2>
          <Wood />
          <Fire />
          <Earth />
          <Gold />
          <Water />
        </div>
        <div className={style["module-content"]}>
          <h2 id="class">课堂</h2>
          
        </div>
      </div>
    );
  }
}

export default ModuleSection;