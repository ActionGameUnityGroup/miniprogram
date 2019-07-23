import React, { Component } from 'react';
import { Button } from 'antd';
import TutorIntroModal from './TutorIntroModal';

class TutorIntro extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  handleShowIntro = () => {
    this.setState({ visible: true });
  }

  handleAddIntro = (intro) => {
    this.triggerChange({ value: intro });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, { value: this.state.intro }, changedValue));
    }
  }

  handleHideIntro = () => {
    this.setState({ visible: false });
  }

  render() {
    let { visible } = this.state;
    let intro = this.props.value.value;
    return (
      <div>
      {
        intro.length ?
        <div
          dangerouslySetInnerHTML={{ __html: intro }}
          style={{
            border: '1px dashed #999',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10
          }}
        ></div>
        : null
      }
      <Button onClick={this.handleShowIntro}>{
        intro.length ?
        '编辑简介' :
        '添加简介'
      }</Button>
      <TutorIntroModal
        visible={visible}
        onChange={this.handleAddIntro}
        onOk={this.handleHideIntro}
        onCancel={this.handleHideIntro}
        value={intro}
      />
      </div>
    );
  }
}

export default TutorIntro;