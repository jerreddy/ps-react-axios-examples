import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    // console.log(this.props);
    // fetch data for selected Id if not null
    if (this.props.match.params.id) {
      /*
      Calling setState inside componentDidUpdate causes infinite loop, so
      if post loaded, check that props id differs from current loaded
      post's id before sending another GET request. 
      */
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios.get(`/posts/${this.props.match.params.id}`).then(res => {
          this.setState({ loadedPost: res.data });
        });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.id).then(res => {
      console.log(res);
    });
  };

  render() {
    const { loadedPost } = this.state;
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    // on first render, we get Id but fetch not completed yet
    if (this.props.id) post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    // component re-rendered with updated stated once fetch completed
    if (loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

FullPost.propTypes = {
  id: PropTypes.number,
};

export default FullPost;
