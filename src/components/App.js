import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { serverUrl } from "../../config";
import * as PostsAPI from '../utils/PostsAPI';

const VOTE_SCORE = 'voteScore';
const TIMESTAMP = 'timestamp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: PostsAPI.CTG_ALL,
      showModal: false,
      sortBy: '',
      categories: [],
      posts: []
    };
  }

  componentDidMount() {
    PostsAPI.getCategories().then(data => {
      this.setState({
        ...data
      });
    });
    this.getPosts();
  }

  getPosts = category => {
    PostsAPI.getPosts(category).then(data => {
      let posts = [];
      data.map(item => {
        posts.push(item);
      });
      this.setState({
        activeCategory: category || PostsAPI.CTG_ALL,
        posts: posts.sort(this.sortBy(this.state.sortBy))
      });
      console.log(this.state);
    });
  };

  addPost = () => {};

  // addPost = () => {
  //   var random = Math.random().toString(36).split('.')[1] + Math.random().toString(36).split('.')[1];
  //   fetch(URL_PRE + '/posts?id=' + random, {
  //     method: 'POST',
  //     headers: {
  // ...headers,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: random,
  //       timestamp: Date.now(),
  //       title: `This is a title ${random}`,
  //       body: `This is body ${random}`,
  //       owner: `lzg${random.substr(0, 6)}`,
  //       author: `lzg${random.substr(0, 6)}`,
  //       category: 'react'
  //     })
  //   }).then(res => {
  //     return res.json();
  //   }).then(res => {
  //     console.log('res::', res);
  //   })
  // }

  /**
   *
   * @param {String} ob 排序类别，按什么排序
   */
  changeSortBy(ob) {
    this.setState({
      sortBy: ob,
      posts: this.state.posts.sort(this.sortBy(ob))
    });
  }

  /**
   * 时间戳转时间字符串（）
   * @param {String} timestamp 时间戳
   */
  formatTime(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
  }

  /**
   *
   * @param {String} attr 排序属性
   * @param {Boolean} rev ture: 升序；false：降序（默认）
   */
  sortBy(attr, rev) {
    //第二个参数没有传递 默认升序排列
    if (rev === undefined) {
      rev = -1;
    } else {
      rev = rev ? -1 : 1;
    }
    return function(a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    };
  }

  render() {
    const { activeCategory, sortBy, categories, posts } = this.state;

    return (
      <div className="app">
        {/* menu */}
        <div className="ctg-wrap">
          <ul className="ctg-list">
            {categories.map(ctg => (
              <li
                key={ctg.name}
                className={
                  ctg.name === activeCategory ? 'ctg-item active' : 'ctg-item'
                }
              >
                <a
                  onClick={() => {
                    this.getPosts(ctg.name);
                  }}
                >
                  {ctg.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="opt-wrap">
          <div className="opt">
            <ul className="opt-list">
              <li
                className={
                  sortBy === VOTE_SCORE ? 'opt-item active' : 'opt-item'
                }
              >
                <a
                  onClick={e => {
                    e.preventDefault();
                    this.changeSortBy(VOTE_SCORE);
                  }}
                >
                  VoteScore
                  <i className="icon down">↓</i>
                  {/* <i className="icon up">↑</i> */}
                </a>
              </li>
              <li
                className={
                  sortBy === TIMESTAMP ? 'opt-item active' : 'opt-item'
                }
              >
                <a
                  onClick={e => {
                    e.preventDefault();
                    this.changeSortBy(TIMESTAMP);
                  }}
                >
                  Time
                  <i className="icon down">↓</i>
                </a>
              </li>
            </ul>
            <div className="btn">
              <a
                className="new"
                onClick={e => {
                  this.setState({
                    showModal: true
                  });
                }}
              >
                New
              </a>
            </div>
          </div>
          <ul className="news-list">
            {posts.map(p => (
              <li key={p.id} className="news-item">
                <a>
                  <h2 className="title">{p.title}</h2>
                  <p className="desc">{p.body}</p>
                </a>
                <div className="news-info">
                  <span className="vote">{p.voteScore}</span>
                  <span className="author">{p.author}</span>
                  <span className="time">{this.formatTime(p.timestamp)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* modal */}
        <div className="modal-wrap">
          <form className="modal-form" />
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
