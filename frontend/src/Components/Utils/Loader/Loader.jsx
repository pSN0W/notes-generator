import React from 'react';

function Loader() {
	return (
		<div
			className="loader" 
			style={{
				position: 'fixed',
				left: '0px',
				top: '0px',
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<div
				className="spinner-border text-danger"
				style={{ width: '100px', height: '100px' }}
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Loader;
