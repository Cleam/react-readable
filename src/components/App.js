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
      posts: [],
      form: {
        title: '',
        body: '',
        category: 'react',
        author: ''
      }
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
      // console.log(this.state);
    });
  };

  addPost = e => {
    let random =
      Math.random()
        .toString(36)
        .split('.')[1] +
      Math.random()
        .toString(36)
        .split('.')[1];
    this.setState({
      form: {
        title: `This is a title ${random}`,
        body: `This is a body ${random}`,
        category: 'react',
        author: `cleam${random.substr(0, 6)}`
      },
      showModal: true
    });
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    PostsAPI.addPosts(this.state.form).then(res => {
      this.getPosts(this.state.activeCategory);
      this.setState({
        showModal: false
      });
    });
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

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
              <a className="new" onClick={this.addPost}>
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
        <div className={`modal-wrap ${this.state.showModal ? 'show' : ''}`}>
          <div className="modal">
            <h2 className="modal-title">New Post</h2>
            <form className="modal-form" onSubmit={this.handleSubmit}>
              <label className="category">
                Category：
                <select
                  name="category"
                  value={this.state.form.category}
                  onChange={this.handleInputChange}
                >
                  {categories.map(
                    ctg =>
                      ctg.name !== PostsAPI.CTG_ALL && (
                        <option key={ctg.name} value={ctg.name}>
                          {ctg.name}
                        </option>
                      )
                  )}
                </select>
              </label>
              <label className="title">
                Title：
                <input
                  name="title"
                  type="text"
                  value={this.state.form.title}
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="body">
                Body：
                <textarea
                  name="body"
                  type="text"
                  value={this.state.form.body}
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="author">
                Author：
                <input
                  name="author"
                  type="text"
                  value={this.state.form.author}
                  onChange={this.handleInputChange}
                />
              </label>
              <div className="btn-wrap">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
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
