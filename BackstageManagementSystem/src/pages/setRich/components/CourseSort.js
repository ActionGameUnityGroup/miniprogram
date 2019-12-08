import React, { Component } from 'react';
import { InputNumber } from 'antd';

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

  handleChangeNumber = (value) => {
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
      <InputNumber value={this.state.value} onChange={this.handleChangeNumber} />
    );
  }
}
