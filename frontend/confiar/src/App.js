import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodos from "./components/delete-todo.component";

import logo from "./logo.svg";

function App() {
  return (
    <Router>
    <div className="container">

<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://www.google.com/" target="_blank">
          <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
        </a>

        <Link to="/" className="navbar-brand">Notary App</Link>

         <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Transaction List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Transaction</Link>
                </li>
              </ul>
          </div>

      </nav>

      <Route path="/" exact component={TodosList} />
      <Route path="/delete/:id" exact component={DeleteTodos} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={CreateTodo} />
    </div>
    </Router>
  );
}

export default App;
