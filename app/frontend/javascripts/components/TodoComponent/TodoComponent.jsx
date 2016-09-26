import React, {Component} from 'react';
import {handleAsyncFunc} from '../../utils/util';
import objectAssign from 'object-assign';
import classNames from 'classnames';
import {polyfill} from 'es6-promise';
polyfill();
import Todo from './Todo';
import LoadingModal from '../LoadingModal/index';

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    const {csrf} = props;
    this.state = {
      csrf,
      todos: [],
      todo: {
        content: ''
      },
      loading: true,
      query: {
        complete: false,
        important: false
      }
    };
    this.handleTodoContentChange = this.handleTodoContentChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
    this.handleNewTodoAdd = this.handleNewTodoAdd.bind(this);
    this.handleTodoQueryChange = this.handleTodoQueryChange.bind(this);
  }

  componentDidMount() {
    this.initialTodos();
  }

  initialTodos(query = this.state.query) {
    this.fetchTodos(query).then((todos) => {
      todos.forEach((todo) => {
        const id = todo.objectId || todo._id;
        todo.objectId = id;
        todo._id = id;
      });
      this.setState({
        todos,
        loading: false
      });
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
    handleAsyncFunc(this.putTodoChange.bind(this), todo, index);
  }

  putTodoChange(todo, index) {
    return new Promise((resolve, reject) => {
      const {csrf} = this.state;
      $.ajax({
        url: `/todo/${todo.objectId}`,
        method: 'put',
        data: {
          todo: JSON.stringify(todo),
          '_csrf': csrf
        },
        success: (data) => {
          if (data.success) {
            const {todos} = this.state;
            this.setState({
              todos: [...todos.slice(0, index), todo, ...todos.slice(index + 1)]
            });
          }
          resolve(true);
        },
        error: (err) => {
          console.log(err);
          reject(false);
        }
      });
    });
  }

  handleTodoDelete(id) {
    handleAsyncFunc(this.deleteTodo.bind(this), id);
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      const {csrf} = this.state;
      $.ajax({
        url: `/todo/${id}`,
        method: 'delete',
        data: { '_csrf': csrf },
        success: (data) => {
          if (data.success) {
            const {todos} = this.state;
            this.setState({
              todos: todos.filter(todo => todo.objectId !== id)
            });
          }
          resolve(true);
        },
        error: (err) => {
          console.log(err);
          reject(false);
        }
      });
    });
  }

  handleKeyDown(e) {
    const {todo, todos} = this.state;
    const content = {todo};
    if (e.keyCode === 13 && content) {
      this.setState({loading: true});
      this.handleNewTodoAdd().then((newTodo) => {
        this.setState({
          todos: [newTodo, ...todos],
          todo: objectAssign({}, todo, {content: ""}),
          loading: false
        });
      });
    }
  }

  fetchTodos(query) {
    let url = '/todo/all?';
    Object.keys(query).forEach((key) => {
      url =`${url}${key}=${query[key]}&`;
    });
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
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

  handleNewTodoAdd() {
    return handleAsyncFunc(this.postNewTodo.bind(this));
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

  handleTodoQueryChange(queryKey) {
    let newQueryObj = {};
    const {query} = this.state;
    newQueryObj[queryKey] = !query[queryKey];
    const newQuery = objectAssign({}, query, newQueryObj);
    this.setState({
      query: newQuery,
      loading: true
    });
    this.initialTodos(newQuery);
  }

  render() {
    const {todos, todo, loading, query} = this.state;
    const {content} = todo;
    const {complete, important} = query;
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
    const importantClass = classNames('fa query_important', {
      'fa-circle': important,
      'important': important,
      'fa-circle-o': !important
    });
    const todoCompleteIcon = classNames('fa fa-check-square-o query_complete', {
      'complete': complete
    });

    return (
      <div className="todos_container">
        <LoadingModal showModal={loading} />
        <input
          value={content}
          ref={ref => this.content = ref}
          placeholder="writer todo here"
          onChange={this.handleTodoContentChange}
          onKeyDown={this.handleKeyDown}
          className="todo_creater"
        />
        <div className="todo_query">
          筛选：
          <i
            className={importantClass}
            aria-hidden="true"
            onClick={() => {
              this.handleTodoQueryChange('important');
            }}></i>
          &nbsp;
          <i
            className={todoCompleteIcon}
            aria-hidden="true"
            onClick={() => {
              this.handleTodoQueryChange('complete');
            }}></i>
          &nbsp;
          <div className="todos_count">
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>&nbsp;{todos.length}
          </div>
        </div>
        {todoComponent}
      </div>
    )
  }
}

export default TodoComponent;
