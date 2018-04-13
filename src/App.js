import React from 'react';
import {connect} from 'react-redux';
import {sendMessage} from './chat.js';

class App extends React.Component {
  render() {
    const {feed, sendMessage} = this.props;
    debugger
    return (
      <div>
        <h1 className="App-title">Hello Bot</h1>
        <ul>
          { feed.map((entry, i) =>
            <li>{entry.text}</li>
            )
          }
        </ul>
        {this.props.children}
        <input type="text" onKeyDown={ (e) => e.keyCode === 13 ? sendMessage(e.target.value) : null }/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, {
  sendMessage
})(App);
