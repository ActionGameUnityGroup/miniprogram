import React, { Component } from 'react';
import { Radio } from 'antd';

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

    const value = props.value.value;
    this.state = { value };
  }

  handleChangeCategory = (e) => {
    let value = e.target.value;
    this.setState({ value });
    this.triggerChange({ value });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    return (
      <Radio.Group onChange={this.handleChangeCategory} value={this.state.value}>
        <Radio value='marchTowardRich'>迈向丰盛</Radio>
        <Radio value='richDoor'>丰盛之门</Radio>
        <Radio value='richRoad'>丰盛之道</Radio>
        <Radio value='richSource'>丰盛之源</Radio>
      </Radio.Group>
    );
  }
}
