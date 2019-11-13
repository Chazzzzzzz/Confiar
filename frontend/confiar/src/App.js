import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodos from "./components/delete-todo.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Root from "./components/root.component";

import Main from "./components/main.component";


import logo from "./logo.svg";

function App() {
  return (
    <Router>
    <div className="container">

      <Route path="/" exact component={Root} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <Route path="/main/:usr" exact component={Main} />
      <Route path="/delete/:usr/:id" exact component={DeleteTodos} />
      <Route path="/edit/:usr/:id" exact component={EditTodo} />
      <Route path="/create/:usr" exact component={CreateTodo} />
    </div>
    </Router>
  );
}

export default App;
