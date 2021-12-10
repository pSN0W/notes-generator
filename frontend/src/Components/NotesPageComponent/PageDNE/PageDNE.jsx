import React from 'react';
import { Link } from 'react-router-dom';

import './PageDNE.css'

function PageDNE() {
	const user = JSON.parse(localStorage.getItem('userInfo'));
	return (
		<div className="dne-wrapper">
			<div className="dne-container">
				<h1 className='dne-heading'>Page Does Not Exist</h1>
				<h3>
					Either the page does not exist or you are not authorised to
					access it
				</h3>
				{user && (
					<div className="dne-user-container">
						<img
							src={`http://127.0.0.1:8000${user["image"]}`}
							alt="user image"
							className="dne-user-image"
						/>
						<div className="dne-user-info">
							<h5>{user.username}</h5>
							<p>{user.full_name}</p>
						</div>
					</div>
				)}
                <Link to="/login"><h4>Login</h4></Link>
			</div>
		</div>
	);
}

export default PageDNE;
