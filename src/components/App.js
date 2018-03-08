import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { serverUrl } from "../../config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctg: []
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3001/categories';
    console.log('fetching from url', url);
    fetch(url, { headers: { Authorization: 'whatever-you-want' } })
      .then(res => {
        return res.text();
      })
      .then(data => {
        console.log('data::', data);
        this.setState({ backend: data });
      });
  }

  render() {
    return (
      <div className="app">
        {/* menu */}
        <div className="ctg-wrap">
          <ul className="ctg-list">
            <li className="ctg-item">
              <a href="">All</a>
            </li>
            <li className="ctg-item">
              <a href="">React</a>
            </li>
            <li className="ctg-item">
              <a href="">Redux</a>
            </li>
            <li className="ctg-item">
              <a href="">Udacity</a>
            </li>
          </ul>
        </div>
        <div className="opt-wrap">
          <ul className="opt-list">
            <li className="opt-item">
              <a href="">VoteScore</a>
            </li>
            <li className="opt-item">
              <a href="">Time</a>
            </li>
          </ul>
          <div className="btn">
            <a className="new" href="">
              New
            </a>
          </div>
        </div>
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
