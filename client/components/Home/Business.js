import React from 'react';
import { Link } from 'react-router-dom';

const Business = (props) => {
	const { id, name, description, address, businessImage, location, category } = props;
	return (
		<div className="col-lg-3 col-md-6">
			<div className='card mb-4 testimonial-card'>
				<div className="avatar mx-auto white">
					<img
						className="rounded-circle mt-2"
						src={businessImage}
						alt="BusinessLogo"
						style={{width: '120px', height: '120px'}}
					/>
    		</div>
				<div className='card-body'>
					<p className="category text-center">{name}</p>
					<hr />
					<p className="card-text"><small>Description: {description}</small></p>
					<Link to={`/${id}`} className="btn btn-orange d-block mb-1">
						View Profile
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Business;