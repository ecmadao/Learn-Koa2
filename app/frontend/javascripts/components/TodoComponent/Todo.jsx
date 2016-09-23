import React, {Component} from 'react';
import classNames from 'classnames';

class Todo extends React.Component {
  render() {
    const {todo} = this.props;
    return (
      <div>
        <input
          type="checkbox"
          checked={todo.complete}
        />
        <span>{todo.content}</span>
      </div>
    )
  }
}

export default Todo;
