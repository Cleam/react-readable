import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { serverUrl } from "../../config";
import { sortBy, formatTime } from '../utils';
import * as api from '../api';

const VOTE_SCORE = 'voteScore';
const TIMESTAMP = 'timestamp';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: api.CTG_ALL,
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
    api.getCategories().then(data => {
      this.setState({
        ...data
      });
    });
    this.getPosts();
  }

  getPosts = category => {
    api.getPosts(category).then(data => {
      let posts = [];
      data.map(item => posts.push(item));
      this.setState({
        activeCategory: category || api.CTG_ALL,
        posts: posts.sort(sortBy(this.state.sortBy))
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
    api.addPosts(this.state.form).then(res => {
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
      posts: this.state.posts.sort(sortBy(ob))
    });
  }

  render() {
    const {
      activeCategory,
      sortBy,
      categories,
      posts,
      showModal,
      form
    } = this.state;

    return (
      <div className="posts-list">
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
                <Link to={`/detail/${p.id}`}>
                  <h2 className="title">{p.title}</h2>
                  <p className="desc">{p.body}</p>
                </Link>
                <div className="news-info">
                  <span className="vote">{p.voteScore}</span>
                  <span className="author">{p.author}</span>
                  <span className="time">{formatTime(p.timestamp)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* modal */}
        <div className={`modal-wrap ${showModal ? 'show' : ''}`}>
          <div className="modal">
            <h2 className="modal-title">New Post</h2>
            <form className="modal-form" onSubmit={this.handleSubmit}>
              <label className="category">
                Category：
                <select
                  name="category"
                  value={form.category}
                  onChange={this.handleInputChange}
                >
                  {categories.map(
                    ctg =>
                      ctg.name !== api.CTG_ALL && (
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
                  value={form.title}
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="body">
                Body：
                <textarea
                  name="body"
                  type="text"
                  value={form.body}
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="author">
                Author：
                <input
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={this.handleInputChange}
                />
              </label>
              <div className="btn-wrap">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <a
              className="iconfont icon-shanchudelete30 close"
              onClick={() => this.setState({ showModal: false })}
            />
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

export default PostsList;
