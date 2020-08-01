import React from 'react';
import QRCode from 'qrcode.react';
import { message, Modal, Button, Row, Col } from 'antd';
import { CopyTwoTone } from '@ant-design/icons';
import LineShareLogo from '../resources/image/wide-defualt.png';
class UrlModal extends React.Component {
  onCopyUrl = url => {
    navigator.clipboard.writeText(url);
    message.success(`${url} copied 🎉`);
  };

  render() {
    return (
      <>
        <Modal
          visible={this.props.modalVisible}
          title="短網址資訊"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              取消
            </Button>,
            <Button key="submit" onClick={this.props.handleOk} type="link">
              <img src={LineShareLogo}></img>
            </Button>,
          ]}
        >
          <Row>
            <Col span={8}>
              <QRCode value={this.props.picseeUrl} />
            </Col>
            <Col span={16}>
              <p>原始網址: {this.props.originUrl}</p>
              <p>
                縮網址: {this.props.picseeUrl}
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.onCopyUrl(this.props.picseeUrl)}
                >
                  <CopyTwoTone />
                </span>
              </p>
            </Col>
          </Row>
        </Modal>
      </>
    );
  }
}

export default UrlModal;
