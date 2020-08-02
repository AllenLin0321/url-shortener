import React from 'react';
import { Table, Space, Button, Tooltip, Empty } from 'antd';
import { onCopyUrl } from '../utils/index';
// Redux
import { connect } from 'react-redux';
import { setUrlList } from '../stores/actions';

class UrlRecaod extends React.Component {
  componentDidMount() {
    const urlList = JSON.parse(localStorage.getItem('url'));
    urlList && this.props.setUrlList(urlList);
  }

  columns = [
    {
      title: '原始網址',
      dataIndex: 'originUrl',
      key: 'originUrl',
      align: 'left',
      render: originUrl => (
        <Button type="link" onClick={() => onCopyUrl(originUrl)}>
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
        <Button type="link" onClick={() => onCopyUrl(picseeUrl)}>
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
    if (!this.props.urlList) return <Empty />;

    return (
      <Table
        columns={this.columns}
        dataSource={this.props.urlList}
        pagination={{ pageSize: 4 }}
      />
    );
  }
}

const mapStateToProps = state => {
  return { urlList: state.urlList };
};

export default connect(mapStateToProps, { setUrlList })(UrlRecaod);
