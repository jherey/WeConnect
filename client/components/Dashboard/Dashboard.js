import React, { Component } from 'react';
import DashboardPage from './DashboardPage';
import { connect } from 'react-redux';
import { getAllBusinesses } from '../../actions/businessActions';

class Dashboard extends Component {
	componentWillMount() {
		this.props.getAllBusinesses();
	}

	render() {
		const { userId, businesses, isLoading } = this.props;

		const userBusiness = businesses.filter(business => {
			return business.userId === userId;
		});

		return (
			<div id='allbusiness' className='search'>
				<DashboardPage userId={userId} businessList={userBusiness} isLoading={isLoading} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userId: state.authUser.user.id,
		businesses: state.businesses,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { getAllBusinesses })(Dashboard);
