import React, {Component} from 'react';
import classNames from 'classnames';
import objectAssign from 'object-assign';
import {polyfill} from 'es6-promise';
polyfill();
import Todo from './Todo';

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    const {csrf} = props;
    this.state = {
      csrf,
      todos: [],
      todo: {
        content: ''
      }
    };
    this.handleTodoContentChange = this.handleTodoContentChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
  }

  componentDidMount() {
    this.fetchTodos().then((todos) => {
      this.setState({ todos });
    });
  }

  handleTodoContentChange() {
    const content = this.content.value;
    const {todo} = this.state;
    this.setState({
      todo: objectAssign({}, todo, {content})
    });
  }

  handleTodoChange(todo, index) {
    const {csrf} = this.state;
    $.ajax({
      url: `/todo/${todo._id}`,
      method: 'put',
      data: {
        todo,
        '_csrf': csrf
      },
      success: (data) => {
        if (data.success) {
          const {todos} = this.state;
          this.setState({
            todos: [...todos.slice(0, index), todo, ...todos.slice(index + 1)]
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleTodoDelete(id) {
    const {csrf} = this.state;
    $.ajax({
      url: `/todo/${id}`,
      method: 'delete',
      data: {
        '_csrf': csrf
      },
      success: (data) => {
        if (data.success) {
          const {todos} = this.state;
          this.setState({
            todos: todos.filter(todo => todo._id !== id)
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleKeyDown(e) {
    const {todo, todos} = this.state;
    const content = {todo};
    if (e.keyCode === 13 && content) {
      this.postNewTodo().then((newTodo) => {
        this.setState({
          todos: [...todos, newTodo],
          todo: objectAssign({}, todo, {content: ""})
        });
      });
    }
  }

  fetchTodos() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/todo/all',
        method: 'GET',
        success: (data) => {
          if (data.success) {
            resolve(data.data);
          } else {
            reject(false);
          }
        },
        error: (err) => {
          reject(false);
        }
      });
    });
  }

  postNewTodo() {
    const {csrf, todo} = this.state;
    const {content} = todo;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/todo/new',
        method: 'POST',
        data: {
          '_csrf': csrf,
          content
        },
        success: (data) => {
          if (data.success) {
            resolve(data.data);
          } else {
            reject(false);
          }
        },
        error: (err) => {
          reject(false);
        }
      });
    });
  }

  render() {
    const {todos, todo} = this.state;
    const {content} = todo;
    const todoComponent = todos.map((t, i) => {
      return (
        <Todo
          key={i}
          todo={t}
          index={i}
          handleTodoChange={this.handleTodoChange}
          handleTodoDelete={this.handleTodoDelete}
        />
      )
    });
    return (
      <div className="todos_container">
        <input
          value={content}
          ref={ref => this.content = ref}
          placeholder="writer todo here"
          onChange={this.handleTodoContentChange}
          onKeyDown={this.handleKeyDown}
          className="todo_creater"
        />
        {todoComponent}
      </div>
    )
  }
}

export default TodoComponent;
