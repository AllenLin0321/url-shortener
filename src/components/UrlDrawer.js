import React from 'react';
import QRCode from 'qrcode.react';
import { Form, Drawer, Input, Row, Col, Upload, message } from 'antd';
import { getUrlEncodeId } from '../utils/';
import {
  QrcodeOutlined,
  FileImageOutlined,
  EditTwoTone,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class UrlDrawer extends React.Component {
  state = { title: '' };

  onUpdateTitle = e => {
    // TODO: 更新Title
    console.log(e.target.value);
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        });
      });
    }
  };

  render() {
    const { selectedUrlData } = this.props;
    if (!selectedUrlData) return false;

    const picseeUrl = new URL(selectedUrlData.picseeUrl);
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Drawer
        width={500}
        title="短網址資訊"
        placement="right"
        onClose={this.props.onDrawerClose}
        visible={this.props.drawerVisible}
      >
        <Form>
          <Form.Item label="網址標題:">
            <Input
              value={this.state.title}
              placeholder="請輸入網址標題"
              bordered={false}
              prefix={<EditTwoTone twoToneColor="#52c41a" />}
              onChange={e => this.setState({ title: e.target.value })}
              onBlur={this.onUpdateTitle}
            />
          </Form.Item>
          <Form.Item label="原始網址:">
            <Input disabled defaultValue={selectedUrlData.originUrl} />
          </Form.Item>
          <Form.Item label="短網址:">
            <Input
              addonBefore={`${picseeUrl.origin}/`}
              defaultValue={getUrlEncodeId(selectedUrlData.picseeUrl)}
            />
          </Form.Item>
          <Row>
            <Col span="12">
              <h3>
                <FileImageOutlined /> 網址縮圖
              </h3>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {this.state.imageUrl ? (
                  <img
                    src={this.state.imageUrl}
                    alt="avatar"
                    style={{ width: '100%' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span="12">
              <h3>
                <QrcodeOutlined /> QR Code
              </h3>
              <QRCode value={selectedUrlData.picseeUrl} />
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default UrlDrawer;
