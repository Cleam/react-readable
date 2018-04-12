import React, { Component } from 'react';
import { formatTime } from '../utils';
import * as api from '../api';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log('id:', id);
    api.getPostsById(id).then(post => {
      // console.log('getPostsById:', post);
      this.setState({
        post
      });
      api.getCommentByPostId(post.id).then(comments => {
        // console.log('getCommentByPostId::', comments);
        this.setState({
          comments
        });
      });
    });
  }

  render() {
    // console.log(this.state);
    const { post, comments } = this.state;
    return (
      <div className="posts-detail">
        <article className="article">
          <h1 className="article-title">{post.title}</h1>
          <p className="article-content">{post.body}</p>
        </article>
        <div className="comment-wrap">
          <ul className="comment-list">
            {comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <p className="comment-content">{comment.body}</p>
                <p className="comment-opt">
                  <span className="vote">{comment.voteScore}</span>
                  <span className="author">{comment.author}</span>
                  <span className="time">{formatTime(comment.timestamp)}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Detail;
