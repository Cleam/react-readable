import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { serverUrl } from "../../config";
import PostsList from './PostsList';
import PostsDetail from './PostsDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div id="app" className="app">
        <Route path="/" exact component={PostsList} />
        <Route path="/detail/:id" component={PostsDetail} />
      </div>
    );
  }
}

// function mapStateToProps({}) {
//     return {
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//     }
// }

export default App;
