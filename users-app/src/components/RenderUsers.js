import React from 'react';

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class RandomUsers extends React.Component {
	state = {
		loading: true,
		users: [],
		filter: ''
	};

	async componentDidMount() {
		const url = 'https://randomuser.me/api/?results=3000';
		const response = await fetch(url);
		const data = await response.json();

		this.setState({ users: data.results, loading: false });
	}

	SortUsers(filter) {
		const newUsers = this.state.users;

		switch (filter) {
			case 'A':
				newUsers.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
				break;

			case 'Z':
				newUsers.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
				break;

			default:
				break;
		}

		return newUsers;
	}

	handleFirstName = () => {
		this.setState({ filter: 'firstname' });
	};
	handleLastName = () => {
		this.setState({ filter: 'lastname' });
	};
	handleCountry = () => {
		this.setState({ filter: 'country' });
	};

	handleOrderAZ = () => {
		this.setState({ users: this.SortUsers('A') });
	};

	handleOrderZA = () => {
		this.setState({ users: this.SortUsers('Z') });
	};

	handleTyping = (e) => {
		const title = this.title;

		if (title.value === '') {
			this.componentDidMount();
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const title = this.title;

		switch (this.state.filter) {
			case 'firstname':
				this.setState({ users: this.state.users.filter((user) => user.name.first === title.value) });
				break;
			case 'lastname':
				this.setState({ users: this.state.users.filter((user) => user.name.last === title.value) });
				break;
			case 'country':
				this.setState({ users: this.state.users.filter((user) => user.location.country === title.value) });
				break;

			default:
				break;
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div>
					{' '}
					<h1>Loading... </h1>
				</div>
			);
		}

		if (!this.state.users) {
			return <div> No Users Data! </div>;
		}

		return (
			<div>
				<div id="search">
					<h1>Users Directory</h1>
					<br />
					<h2>
						<label id="sort"> Sort :</label>
						<input type="radio" id="check1" value="AZ" name="sort" onChange={this.handleOrderAZ} />A-Z
						<input type="radio" id="check2" value="ZA" name="sort" onChange={this.handleOrderZA} />Z-A
						<br />
						<label id="filter"> Filter By :</label>
						<input type="radio" id="radio1" name="filter" onChange={this.handleFirstName} />FristName
						<input type="radio" id="radio2" name="filter" onChange={this.handleLastName} />LastName
						<input type="radio" id="radio3" name="filter" onChange={this.handleCountry} />Country
						<br />
					</h2>
					<input
						placeholder="Name to search"
						id="inputText"
						type="text"
						ref={(c) => (this.title = c)}
						onKeyUpCapture={this.handleTyping}
					/>
					<button id="searchBtn" className="btn btn-secondary btn-sm" onClick={this.handleSubmit}>
						Search
					</button>
				</div>
				<MDBTable>
					<MDBTableHead color="primary-color" textWhite>
						<tr>
							<th>
								<h3>Photo</h3>
							</th>
							<th>
								<h3>First</h3>
							</th>
							<th>
								<h3>Last</h3>
							</th>
							<th>
								<h3>Age</h3>
							</th>
							<th>
								<h3>Phone</h3>
							</th>
							<th>
								<h3>Email</h3>
							</th>
							<th>
								<h3>Country</h3>
							</th>
						</tr>
					</MDBTableHead>

					{this.state.users.map((user) => (
						<MDBTableBody key={user.login.uuid}>
							<tr>
								<td>
									<img src={user.picture.large} />
								</td>
								<td>{user.name.first}</td>
								<td>{user.name.last}</td>
								<td>{user.dob.age}</td>
								<td>{user.phone}</td>
								<td>{user.email}</td>
								<td>{user.location.country}</td>
							</tr>
						</MDBTableBody>
					))}
				</MDBTable>
			</div>
		);
	}
}

export default RandomUsers;
