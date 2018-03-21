import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { serverUrl } from "../../config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: []
    };
  }

  componentDidMount() {
    this.getCategories();
    this.getPosts();
  }

  getCategories() {
    const url = 'http://localhost:3001/categories';
    fetch(url, { headers: { Authorization: 'whatever-you-want' } })
      .then(res => {
        return res.text();
      })
      .then(data => {
        data = JSON.parse(data);
        // console.log('data::', data);
        data.categories &&
          data.categories.unshift({ name: 'all', path: 'all', active: true });
        this.setState({
          ...data
        });
        // console.log(this.state);
      });
  }

  getPosts() {
    const url = 'http://localhost:3001/posts';
    fetch(url, { headers: { Authorization: 'whatever-you-want' } })
      .then(res => {
        return res.text();
      })
      .then(data => {
        data = JSON.parse(data);
        // console.log('data::', data);
        let posts = [];
        data.map((item, index) => {
          posts.push(item);
        });
        this.setState({
          posts: posts
        });
        console.log(this.state);
      });
  }

  render() {
    const { categories, posts } = this.state;

    return (
      <div className="app">
        {/* menu */}
        <div className="ctg-wrap">
          <ul className="ctg-list">
            {categories.map(ctg => (
              <li
                key={ctg.name}
                className={ctg.active ? 'ctg-item active' : 'ctg-item'}
              >
                <a onClick={console.log('onClick...')}>{ctg.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="opt-wrap">
          <div className="opt">
            <ul className="opt-list">
              <li className="opt-item active">
                <a href="">
                  VoteScore
                  <i className="icon down">↓</i>
                  {/* <i className="icon up">↑</i> */}
                </a>
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
          <ul className="news-list">
            <li className="news-item">
              <a>
                <h2 className="title">这是帖子的标题</h2>
                <p className="desc">
                  这是帖子的描述这是帖子的描述这是帖子的描述
                </p>
              </a>
              <div className="news-info">
                <span className="vote">5</span>
                <span className="author">lizhigao</span>
              </div>
            </li>
            <li className="news-item">
              <a>
                <h2 className="title">这是帖子的标题</h2>
                <p className="desc">
                  这是帖子的描述这是帖子的描述这是帖子的描述
                </p>
              </a>
              <div className="news-info">
                <span className="vote">5</span>
                <span className="author">lizhigao</span>
              </div>
            </li>
            <li className="news-item">
              <a>
                <h2 className="title">这是帖子的标题</h2>
                <p className="desc">
                  这是帖子的描述这是帖子的描述这是帖子的描述
                </p>
              </a>
              <div className="news-info">
                <span className="vote">5</span>
                <span className="author">lizhigao</span>
              </div>
            </li>
            <li className="news-item">
              <a>
                <h2 className="title">这是帖子的标题</h2>
                <p className="desc">
                  这是帖子的描述这是帖子的描述这是帖子的描述
                </p>
              </a>
              <div className="news-info">
                <span className="vote">5</span>
                <span className="author">lizhigao</span>
              </div>
            </li>
          </ul>
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
