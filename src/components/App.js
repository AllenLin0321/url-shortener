import React from 'react';
import SearchBar from './SearchBar';
import UrlRecaod from './UrlRecaod';

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar UrlRecaod={UrlRecaod} />
        <UrlRecaod />
      </div>
    );
  }
}

export default App;
