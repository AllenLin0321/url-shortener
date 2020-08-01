import React from 'react';
import { Table, Space, Button, message, Tooltip } from 'antd';

class UrlRecaod extends React.Component {
  state = { urlList: null };

  componentDidMount() {
    const urlList = JSON.parse(localStorage.getItem('url'));
    this.setState({ urlList });
  }

  onCopyUrl = url => {
    navigator.clipboard.writeText(url);
    message.success(`${url} copied 🎉`);
  };

  columns = [
    {
      title: '原始網址',
      dataIndex: 'originUrl',
      key: 'originUrl',
      align: 'left',
      render: originUrl => (
        <Button type="link" onClick={() => this.onCopyUrl(originUrl)}>
          <Tooltip title={originUrl}>
            <span className="url_recoard__col">{originUrl}</span>
          </Tooltip>
        </Button>
      ),
    },
    {
      title: '縮網址',
      dataIndex: 'picseeUrl',
      key: 'picseeUrl',
      render: picseeUrl => (
        <Button type="link" onClick={() => this.onCopyUrl(picseeUrl)}>
          <span className="url_recoard__col">{picseeUrl}</span>
        </Button>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>修改</a>
          <a>刪除</a>
        </Space>
      ),
    },
  ];

  render() {
    if (!this.state.urlList) return false;
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.urlList}
        pagination={{ pageSize: 4 }}
      />
    );
  }
}

export default UrlRecaod;
