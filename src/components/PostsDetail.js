import React, { Component } from 'react';
import { formatTime } from '../utils';
import * as api from '../api';
import { Link } from 'react-router-dom';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: [],
      comment: {
        parentId: '',
        author: '',
        body: ''
      },
      showCommentModal: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    api.getPostsById(id).then(post => {
      this.setState({
        post
      });
      this.updateComment();
    });
  }

  updateComment = () => {
    api.getCommentByPostId(this.state.post.id).then(comments => {
      this.setState({
        comments
      });
    });
  };

  addComment = e => {
    e.preventDefault();
    this.setState({
      showCommentModal: true
    });
  };

  handleCommentSubmit = e => {
    e.preventDefault();
    api
      .addComment({
        ...this.state.comment,
        parentId: this.state.post.id
      })
      .then(res => {
        console.table(res);
        this.updateComment();
        this.setState({
          showCommentModal: false
        });
      });
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  render() {
    // console.log(this.state);
    const { post, comments, comment, showCommentModal } = this.state;
    return (
      <div className="posts-detail">
        <Link to="/" className="back">
          Back
        </Link>
        {/* <a className="back">Back</a> */}
        <article className="article">
          <h1 className="article-title">{post.title}</h1>
          <p className="article-content">{post.body}</p>
        </article>
        <div className="comment-wrap">
          <ul className="comment-list">
            {comments.length ? (
              comments.map(comment => (
                <li key={comment.id} className="comment-item">
                  <p className="comment-content">{comment.body}</p>
                  <p className="comment-opt">
                    <span className="vote">{comment.voteScore}</span>
                    <span className="author">{comment.author}</span>
                    <span className="time">
                      {formatTime(comment.timestamp)}
                    </span>
                  </p>
                </li>
              ))
            ) : (
              <p>No comments yet!</p>
            )}
          </ul>
          <div className="add-comment-wrap">
            <a className="add-comment" onClick={this.addComment}>
              Add Comment
            </a>
          </div>
        </div>
        <div className={`comment-modal-wrap ${showCommentModal ? 'show' : ''}`}>
          <div className="comment-modal">
            <form
              className="comment-modal-form"
              onSubmit={this.handleCommentSubmit}
            >
              <h2 className="modal-title">New comment</h2>
              <label className="author">
                Author：
                <input
                  name="author"
                  type="text"
                  value={comment.author}
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="body">
                Body：
                <textarea
                  name="body"
                  type="text"
                  value={comment.body}
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
              onClick={() => {
                this.setState({ showCommentModal: false });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
