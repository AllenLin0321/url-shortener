import React from 'react';
import { Input, Button } from 'antd';
import { apiUpdateUrl } from '../api/index';

class RecordRaw extends React.Component {
  state = { newEncode: '' };

  onUpdateClick = async () => {
    const { data } = await apiUpdateUrl({
      currentEncodeld: this.props.urlData.picseeUrl.split('psee.io/')[1],
      newEncodeld: this.state.newEncode,
    });
    console.log('data: ', data);
  };
  render() {
    const { urlData } = this.props;
    return (
      <div>
        <div>原始網址: {urlData.originUrl}</div>
        <div>
          picsee網址:{urlData.picseeUrl}
          <span>
            <Input
              onChange={e => this.setState({ newEncode: e.target.value })}
            />
            <Button type="error" onClick={this.onUpdateClick}>
              修改編碼
            </Button>
          </span>
        </div>
        <div>=====================</div>
      </div>
    );
  }
}
export default RecordRaw;
