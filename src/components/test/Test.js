import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        body: data.body
      }))
  }
  // componentWillMount() {
  //   console.log("componentWillMount...");
  // }

  // componentWillReceiveProps(nextProps,nextState){
  //   console.log("componentWillReceiveProps...");
  // }
  // getSnapshotBeforeUpdate(nextProps, prevState){
  //   console.log("getSnapshotBeforeUpdate...")
  // }
  // componentWillUpdate() {
  //   console.log("componentWillUpdate...");
  // }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate...");
  // }
  render() {
    const {title, body} = this.state;
    return (
      <div>
      <h1 className="display-4"><span className="text-danger">{title}</span> </h1>
      <p>{body}</p>
      </div>
    )
  }
}

export default Test;
