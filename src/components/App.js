import React from 'react';
import SearchBar from './SearchBar';
import UrlRecord from './UrlRecord';
import { Layout } from 'antd';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <SearchBar />
          <UrlRecord />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
