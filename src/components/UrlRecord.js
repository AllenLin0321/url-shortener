import React from 'react';
import { Table, Space, Button, Tooltip, Empty, Popconfirm } from 'antd';
import {
  EditFilled,
  DeleteFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { onCopyUrl, getUrlEncodeId } from '../utils/';
import UrlDrawer from './UrlDrawer';
import { apiDeleteUrl } from '../api';
// Redux
import { connect } from 'react-redux';
import { setUrlList, deleteUrlList } from '../stores/actions';

class UrlRecaod extends React.Component {
  state = { drawerVisible: false };

  componentDidMount() {
    const urlList = JSON.parse(localStorage.getItem('url'));
    urlList && this.props.setUrlList(urlList);
  }

  columns = [
    {
      title: '網址縮圖',
      key: 'image',
      dataIndex: 'imageUrl',
      align: 'center',
      render: imageUrl => {
        return imageUrl ? (
          <img style={{ width: '128px' }} src={imageUrl} alt="image" />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ width: '128px' }}
          />
        );
      },
    },
    {
      title: '原始網址',
      dataIndex: 'originUrl',
      key: 'originUrl',
      align: 'left',
      render: originUrl => (
        <Button
          className="url-record__row-btn"
          type="link"
          onClick={() => onCopyUrl(originUrl)}
        >
          <Tooltip title={originUrl}>
            <span className="url_record__col">{originUrl}</span>
          </Tooltip>
        </Button>
      ),
    },
    {
      title: '縮網址',
      dataIndex: 'picseeUrl',
      key: 'picseeUrl',
      render: picseeUrl => (
        <Button
          className="url-record__row-btn"
          type="link"
          onClick={() => onCopyUrl(picseeUrl)}
        >
          <span className="url_record__col">{picseeUrl}</span>
        </Button>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            icon={<EditFilled />}
            onClick={() =>
              this.setState({ drawerVisible: true, selectedUrlData: record })
            }
          >
            編輯
          </Button>

          <Popconfirm
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            title="確定刪除嗎?"
            okText="確定"
            cancelText="取消"
            onConfirm={() => this.onDeleteRecord(record)}
          >
            <Button danger type="primary" shape="round" icon={<DeleteFilled />}>
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  onDeleteRecord = record => {
    apiDeleteUrl(getUrlEncodeId(record.picseeUrl));
    this.props.deleteUrlList(record);
  };

  render() {
    if (!this.props.urlList) return <Empty />;

    return (
      <>
        <Table
          columns={this.columns}
          dataSource={this.props.urlList}
          pagination={{ pageSize: 4 }}
        />
        <UrlDrawer
          selectedUrlData={this.state.selectedUrlData}
          drawerVisible={this.state.drawerVisible}
          onDrawerClose={() => this.setState({ drawerVisible: false })}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return { urlList: state.urlList };
};

export default connect(mapStateToProps, { setUrlList, deleteUrlList })(
  UrlRecaod
);
