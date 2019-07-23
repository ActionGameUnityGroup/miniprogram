import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import RichText from '@/components/RichText';

export default class extends Component {
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

    this.RichText = React.createRef();
    const value = props.value.value;
    this.state = {
      value,
      visible: false
    };
  }

  saveHtml = () => {
    let html = this.RichText.current.state.editorState.toHTML();
    this.setState({ value: html, visible: false });
    this.triggerChange({ value: html });
  }

  changeModalState = (e) => {
    let type = e.target.id,
        visible = false;
    console.log(type === 'show');
    if (type === 'show') {
      visible = true;
    }
    this.setState({ visible });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, {value: this.state.value}, changedValue));
    }
  }

  render() {
    const { visible, value } = this.state;
    console.log(visible);
    console.log(value);
    return (
      <div>
        {
          value.length ?
          <div
            dangerouslySetInnerHTML={{ __html: value }}
            style={{
              border: '1px dashed #999',
              padding: 10,
              maxHeight: 480,
              borderRadius: 5,
              marginBottom: 10,
              overflow: 'auto'
            }}
          ></div>
          : null
        }
        <Button onClick={this.changeModalState} id='show'>编辑内容</Button>
        <Modal
          visible={visible}
          onCancel={this.changeModalState}
          footer={<Button onClick={this.saveHtml}>确定</Button>}
          width={880}
          centered={true}
        >
          <RichText ref={this.RichText} value={value} />
        </Modal>
      </div>
    );
  }
}
