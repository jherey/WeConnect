import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewList from './ReviewList';
import Spinner from '../Spinner';
import imageAvatar from '../../public/images/business-avatar.png';


class BusinessProfilePage extends Component {
	constructor() {
		super();
		this.state = {
			errors: ''
		}
	}

	componentWillMount() {
		this.props.fetchBusiness(this.props.id);
		this.props.fetchReviews(this.props.id);
	}

	onClick(e) {
		this.setState({ errors: '' });
		document.getElementById("deleteBtn").click();
		this.props.deleteBusiness(this.props.id)
			.then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Business deleted successfully'
					});
					this.context.router.history.push('/');
				},
				(err) => {
					this.props.loading(false);
					this.props.addFlashMessage({
						type: 'error',
						text: err.response.data.message
					});
				}
			);
	}

	render() {
		const { currentBusiness, id, reviews, userId, isLoading } = this.props;
		const { errors } = this.state;

		return (
			<div className="businesses">
				<div className="container list">
					<img id="businessImage"
						src={!currentBusiness.businessImage ? imageAvatar : currentBusiness.businessImage}
						alt="Business Image"
					/><br/>
					<h1 className="businessName">{currentBusiness.businessName}</h1>
					<div className="details"><br/>
						<div className="row">
							{currentBusiness.businessInfo}
						</div><br/>
						<div className="row">
							<div className="col-md-7">
								<div className="mr-3 address">
									<i className="fa fa-map-marker fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.address} {currentBusiness.location}</h5>
								</div>
							</div>
							<div className="col-md-5">
								<div className="mr-3 address">
									<i className="fa fa-envelope fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.email}</h5>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-7">
								<div className="mr-3 address">
									<i className="fa fa-sitemap fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.category}</h5>
								</div>
							</div>
							<div className="col-md-5">
								<div className="mr-3 address">
									<i className="fa fa-globe fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.website}</h5>
								</div>
							</div>
						</div>
						{
							currentBusiness.userId === userId
							?
								<div style={{'display': 'inline-block', 'float': 'right'}}>
									<Link to={`/${id}/edit`} className="btn btn-primary mr-2"> Edit</Link>
									<button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
										Delete
									</button>
								</div>
							: null
						}
						<br /><br /> 
						<hr />

						<ReviewList reviews={reviews} id={id} />
					</div>
				</div>
			
				{/* Delete modal class */}
				<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">WeConnect</h5>
								<button id="deleteBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<p>Are you sure you want to delete this business?</p>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
								<button
									className="btn btn-danger"
									onClick={this.onClick.bind(this)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

BusinessProfilePage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default BusinessProfilePage;
