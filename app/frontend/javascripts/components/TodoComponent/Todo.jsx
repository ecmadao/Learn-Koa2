import React, {Component} from 'react';
import classNames from 'classnames';
import objectAssign from 'object-assign';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    const {todo} = props;
    this.state = {...todo};
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleTodoContentChange = this.handleTodoContentChange.bind(this);
    this.handleTodoCompleteChange = this.handleTodoCompleteChange.bind(this);
    this.handleTodoImportantChange = this.handleTodoImportantChange.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {objectId} = this.state;
    const {todo} = nextProps;
    if (objectId !== todo.objectId) {
      this.setState({...todo});
    }
  }

  handleTodoDelete() {
    const {objectId} = this.state;
    const {handleTodoDelete} = this.props;
    handleTodoDelete && handleTodoDelete(objectId);
  }

  handleTodoCompleteChange() {
    const {complete} = this.state;
    this.setState({complete: !complete});
    this.handleTodoChange(objectAssign({}, this.state, {complete: !complete}));
  }

  handleTodoImportantChange() {
    const {important} = this.state;
    this.setState({important: !important});
    this.handleTodoChange(objectAssign({}, this.state, {important: !important}));
  }

  handleTodoContentChange() {
    const content = this.content.value;
    this.setState({content});
  }

  handleTodoChange(todo) {
    const {handleTodoChange, index} = this.props;
    if (todo.content !== this.props.todo.content) {
      handleTodoChange && handleTodoChange(todo, index);
    }
  }

  render() {
    const {complete, content, important} = this.state;
    const importantClass = classNames('fa todo_important', {
      'fa-circle': important,
      'important': important,
      'fa-circle-o': !important
    });
    const todoContentClass = classNames('todo_content', {
      'complete': complete
    });
    const todoContainerClass = classNames('todo_container', {
      'complete': complete
    });
    const todoCompleteIcon = classNames('fa fa-check-square-o todo_complete', {
      'complete': complete
    });
    return (
      <div className={todoContainerClass}>
        <i
          className={importantClass}
          aria-hidden="true"
          onClick={this.handleTodoImportantChange}></i>
        <input
          value={content}
          className={todoContentClass}
          ref={ref => this.content = ref}
          onBlur={(e) => this.handleTodoChange(this.state)}
          onChange={this.handleTodoContentChange}
        />
        <div className="todo_operation">
          <i
            className={todoCompleteIcon}
            aria-hidden="true"
            onClick={this.handleTodoCompleteChange}></i>&nbsp;
          <i
            className="fa fa-times todo_delete"
            aria-hidden="true"
            onClick={this.handleTodoDelete}></i>
        </div>
      </div>
    )
  }
}

export default Todo;
