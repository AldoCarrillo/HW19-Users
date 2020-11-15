import React from 'react';

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class RandomUsers extends React.Component {
	state = {
		loading: true,
		users: []
	};

	async componentDidMount() {
		const url = 'https://randomuser.me/api/?results=100';
		const response = await fetch(url);
		const data = await response.json();

		this.setState({ users: data.results, loading: false });
		console.log(data.results);
	}

	render() {
		if (this.state.loading) {
			return <div> Loading... </div>;
		}

		if (!this.state.users) {
			return <div> No Users Data! </div>;
		}

		return (
			<div>
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
								<h3>Email</h3>
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
								<td>{user.email}</td>
							</tr>
						</MDBTableBody>
					))}
				</MDBTable>
			</div>
		);
	}
}

export default RandomUsers;
