import React, { Component } from 'react';
import { Input } from 'antd';

class TutorName extends Component {
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

  handleChangeName = (e) => {
    this.setState({ value: e.target.value });
    this.triggerChange({ value: e.target.value });
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
      <Input onChange={this.handleChangeName} value={this.state.value} style={{ width: 150 }} />
    );
  }
}

export default TutorName;
