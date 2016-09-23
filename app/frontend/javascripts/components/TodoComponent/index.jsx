import React from 'react';
import ReactDOM from 'react-dom';
import TodoComponent from './TodoComponent';

const renderTodoComponent = (props, domId) => {
  ReactDOM.render(
      <TodoComponent {...props} />,
      document.getElementById(domId)
  );
};

export default renderTodoComponent;
