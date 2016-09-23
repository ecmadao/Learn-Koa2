import React, {Component} from 'react';
import classNames from 'classnames';
import objectAssign from 'object-assign';
import {polyfill} from 'es6-promise';
polyfill();
import Todo from './Todo';

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    let {csrf} = props;
    this.state = {
      csrf,
      todos: [],
      todo: {
        content: ''
      }
    };
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchTodos().then((todos) => {
      this.setState({ todos });
    });
  }

  handleTodoChange() {
    let content = this.content.value;
    let {todo} = this.state;
    this.setState({
      todo: objectAssign({}, todo, {content})
    });
  }

  handleSubmit() {
    let {todo, todos} = this.state;
    let content = {todo};
    if (content) {
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
    })
  }

  postNewTodo() {
    let {csrf, todo} = this.state;
    let {content} = todo;
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
    let {todos, todo} = this.state;
    let {content} = todo;
    const todoComponent = todos.map((todo, index) => {
      return (
        <Todo key={index} todo={todo}/>
      )
    });
    return (
      <div>
        <div className="todo_creater">
          <input
            value={content}
            ref={ref => this.content = ref}
            placeholder="writer todo here"
            onChange={this.handleTodoChange}
          />
          <div onClick={this.handleSubmit}>submit</div>
        </div>
        {todoComponent}
      </div>
    )
  }
}

export default TodoComponent;
