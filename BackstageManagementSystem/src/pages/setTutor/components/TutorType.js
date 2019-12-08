import React, { Component } from 'react';
import { Radio } from 'antd';

class TutorType extends Component {
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

  onChange = e => {
    let value = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange({ value });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render () {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value='resident'>常驻导师</Radio>
        <Radio value='contribution'>特约导师</Radio>
      </Radio.Group>
    );
  }
}

export default TutorType;