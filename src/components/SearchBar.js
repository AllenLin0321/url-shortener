import React from 'react';
import { Input, Button } from 'antd';
import { apiGetUrl } from '../api/index';

class SearchBar extends React.Component {
  state = {
    inputUrl: '',
    picseeUrl: '',
  };

  onInputChange = event => {
    this.setState({ inputUrl: event.target.value });
  };

  fetchUrl = async () => {
    const requestData = {
      url: this.state.inputUrl,
      applyDomain: true,
      title: ' PicSee ',
      description: '2016-11-02 14:58 ',
      imageUrl: 'http://uc.udn.com.tw/photo/2016/11/02/6/2786468.jpg',
      pathFormat: {
        key: 'from',
      },
    };
    const { data } = await apiGetUrl(requestData);
    this.setState({ picseeUrl: data.data.picseeUrl });
    this.onStoreUrl();
  };

  onStoreUrl = () => {
    const currentUrlArr = JSON.parse(localStorage.getItem('url'));
    let newUrlArr = [
      { originUrl: this.state.inputUrl, picseeUrl: this.state.picseeUrl },
    ];

    if (currentUrlArr) {
      newUrlArr = [...currentUrlArr, ...newUrlArr];
    }

    localStorage.setItem('url', JSON.stringify(newUrlArr));
  };

  render() {
    return (
      <div>
        <Input
          placeholder="請輸入網址"
          value={this.state.inputUrl}
          onChange={this.onInputChange}
        ></Input>
        <Button type="primary" onClick={this.fetchUrl}>
          產生短網址
        </Button>
        {this.state.picseeUrl !== '' && <p>{this.state.picseeUrl}</p>}
      </div>
    );
  }
}

export default SearchBar;
