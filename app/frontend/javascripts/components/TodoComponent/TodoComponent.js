import React, {Component} from 'react';
import classNames from 'classnames';

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    let {csrf} = props;
    this.state = {
      todos: [],
      csrf
    }
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default TodoComponent;
