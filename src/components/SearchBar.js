import React from 'react';
import { Input, Button, message } from 'antd';
import { apiGetUrl } from '../api/index';
import UrlModal from './UrlModal';
import { RobotOutlined } from '@ant-design/icons';

class SearchBar extends React.Component {
  state = {
    originUrl: '',
    picseeUrl: '',
    submitBtnLoading: false,
    modalVisible: false,
  };

  onCopyUrl = url => {
    navigator.clipboard.writeText(url);
    message.success(`${url} copied 🎉`);
  };

  validURL = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  };

  onInputChange = event => {
    this.setState({ originUrl: event.target.value });
  };

  onFetchUrl = async () => {
    if (!this.validURL(this.state.originUrl)) {
      message.error('Not a valid URL');
      return;
    }
    this.setState({ submitBtnLoading: true });
    const requestData = {
      url: this.state.originUrl,
      applyDomain: true,
      title: ' PicSee ',
      description: '2016-11-02 14:58 ',
      imageUrl: 'http://uc.udn.com.tw/photo/2016/11/02/6/2786468.jpg',
      pathFormat: {
        key: 'from',
      },
    };
    const { data } = await apiGetUrl(requestData);
    this.setState({
      picseeUrl: data.data.picseeUrl,
      modalVisible: true,
      submitBtnLoading: false,
    });
    this.onCopyUrl(data.data.picseeUrl);
    this.onStoreUrl();
  };

  onStoreUrl = () => {
    const currentUrlArr = JSON.parse(localStorage.getItem('url'));
    let newUrlArr = [
      { originUrl: this.state.originUrl, picseeUrl: this.state.picseeUrl },
    ];

    if (currentUrlArr) {
      newUrlArr = [...currentUrlArr, ...newUrlArr];
    }

    localStorage.setItem('url', JSON.stringify(newUrlArr));
  };

  handleOk = () => {
    // 開新視窗
    const URL = `http://line.naver.jp/R/msg/text/?${this.state.picseeUrl}`;
    window.open(URL, '_blank');
    this.setState({ originUrl: '', picseeUrl: '' });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false, originUrl: '', picseeUrl: '' });
  };

  render() {
    return (
      <div className="search-bar__wrapper">
        <Input
          allowClear
          size="large"
          className="search-bar__input"
          placeholder="請輸入網址"
          prefix={<RobotOutlined />}
          value={this.state.originUrl}
          onChange={this.onInputChange}
        ></Input>
        <Button
          style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
          type="primary"
          loading={this.state.submitBtnLoading}
          onClick={this.onFetchUrl}
        >
          產生短網址
        </Button>
        <UrlModal
          modalVisible={this.state.modalVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          picseeUrl={this.state.picseeUrl}
          originUrl={this.state.originUrl}
        />
      </div>
    );
  }
}

export default SearchBar;
