import React, {Component} from 'react';
import axios from 'axios';

import { Dropdown, DropdownButton, FormControl,  ul} from 'react-bootstrap';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";


const User = props => (
	 <Dropdown.Item eventKey={props.users.username}>{props.users.username}</Dropdown.Item>
)

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = { value: '' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  }

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    const { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul>
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  }
}


export default class CreateTodo extends Component {

	constructor(props) {
		super(props);

		this.onChangeTransSeller = this.onChangeTransSeller.bind(this);
		this.onChangeTransInfo = this.onChangeTransInfo.bind(this);
		this.onChangeTransDocs = this.onChangeTransDocs.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			users: [],
			trans_seller: '',
			trans_info: '',
			trans_docs: '',
			trans_completed: false,
			main_url: "/main/" + this.props.match.params.usr
		}
	}

	userList() {
		return this.state.users.map(function(currentUser, i) {
			return <User users={currentUser} key={i}/>;
		});
	}

	componentDidMount() {
		axios.get('http://localhost:4000/todos/users/get')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
	}

	componentDidUpdate() {
		axios.get('http://localhost:4000/todos/users/get')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
	}

	onChangeTransSeller(e) {
		this.setState({
			trans_seller: e
		});
	}

	onChangeTransInfo(e) {
		this.setState({
			trans_info: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newTodo = {
			trans_buyer: this.props.match.params.usr,
			trans_seller: this.state.trans_seller,
			trans_info: this.state.trans_info,
			trans_docs: this.state.trans_docs,
			trans_completed: this.state.trans_completed,
		}

		axios.post('http://localhost:4000/todos/add', newTodo)
			.then(res => console.log(res.data));

		this.setState({
			trans_seller: '',
			trans_info: '',
			trans_docs: '',
			trans_completed: false
		});
	}

	onChangeTransDocs(e) {
		this.setState({
			trans_docs: e.target.value
		});
	}

	render () {
		return (
			<div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			        <a className="navbar-brand" href="https://www.google.com/" target="_blank">
			          <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
			        </a>

			        <Link to={this.state.main_url} className="navbar-brand">Notary App</Link>

			         <div className="collpase nav-collapse">
			              <ul className="navbar-nav mr-auto">
			                <li className="navbar-item">
			                  <Link to="/" className="nav-link">Log Out</Link>
			                </li>
			                <li className="navbar-item">
			                  <Link to={this.state.main_url} className="nav-link">Main Page</Link>
			                </li>
			              </ul>
			          </div>

			      </nav>
			</div>


			<div style={{marginTop: 20}}>
				<h3> Add New Transaction </h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Description: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_info} 
								onChange={this.onChangeTransInfo}
								/>
					</div>

					<div className="form-group">
						<label>Property docs: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_docs} 
								onChange={this.onChangeTransDocs}
								/>
					</div>


					<div className="form-group">
						<label>Seller: </label>
						<div className="form-group">
						<DropdownButton id="dropdown-basic-button" title="Seller list" onSelect={this.onChangeTransSeller}>
						<Dropdown.Menu as={CustomMenu}>
					 	{this.userList()}
					 	</Dropdown.Menu>
					</DropdownButton>
					</div>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_seller} 
								onChange={this.onChangeTransSeller}
								/>
					</div>

					<div className="form-group"> 
						<input type="submit"
								value="Create Transaction"
								className="btn btn-outline-primary"
								/>
					</div>
				</form>
			</div>
			</div>
			)
	}
}