import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Review = ({ username, review, createdAt, image }) => {
	return (
		<div className="row">
			<div className="col-lg-1 text-center">
				<img
					className="rounded-circle mt-2"
					src={image}
					alt="UserImage"
					style={{ width: '60px', height: '60px' }}
				/>
			</div>
			<div className="col-lg-11">
				<p><strong>{username}</strong></p>
				<p>{review}</p>
				<p id="review-createdTime">{moment(createdAt).format('Do MMMM YYYY HH:mm')}</p>
			</div>
			<hr />
		</div>
	);
}

export default Review;