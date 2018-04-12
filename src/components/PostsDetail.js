import React, { Component } from 'react';
import { sortBy, formatTime } from '../utils';
import * as PostsAPI from '../api/PostsAPI';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('id:', id);
    PostsAPI.getPostsById(id).then(res => {
      console.log('getPostsById:', res);
    });
  }

  render() {
    return (
      <div className="posts-detail">
        <article className="article">
          <h1 className="article-title">我是标题标题标题标题标题标题标题</h1>
          <p className="article-content">
            我是文章内容文章内容文章内容文章内容文章内容文章内容文章内容
          </p>
        </article>
        <div className="comment-wrap">
          <ul className="comment-list">
            <li className="comment-item">
              <p className="comment-content">
                评论内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
              <p className="comment-opt">
                <span className="vote">3</span>
                <span className="author">lzg</span>
                <span className="time">2016-7-4 15:2:47</span>
              </p>
            </li>
            <li className="comment-item">
              <p className="comment-content">
                评论内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
              <p className="comment-opt">
                <span className="vote">3</span>
                <span className="author">lzg</span>
                <span className="time">2016-7-4 15:2:47</span>
              </p>
            </li>
            <li className="comment-item">
              <p className="comment-content">
                评论内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </p>
              <p className="comment-opt">
                <span className="vote">3</span>
                <span className="author">lzg</span>
                <span className="time">2016-7-4 15:2:47</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Detail;
