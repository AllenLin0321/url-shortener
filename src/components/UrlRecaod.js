import React from 'react';
import RecordRaw from './RecardRaw';

class UrlRecaod extends React.Component {
  state = { urlList: null };

  componentDidMount() {
    const urlList = JSON.parse(localStorage.getItem('url'));
    this.setState({ urlList });
  }

  render() {
    if (!this.state.urlList) return false;
    return (
      <div>
        {this.state.urlList.map((urlData, index) => {
          return (
            <div key={index}>
              <RecordRaw urlData={urlData} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default UrlRecaod;
