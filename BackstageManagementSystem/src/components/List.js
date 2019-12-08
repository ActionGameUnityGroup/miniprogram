import React, { Component } from 'react';
import { Table } from 'antd';

export default class extends Component {
  render() {
    const { columns, dataSource, options } = this.props;
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        {...options}
      />
    );
  }
}