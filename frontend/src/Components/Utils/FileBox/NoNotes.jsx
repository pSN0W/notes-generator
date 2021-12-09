import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

function NoNotes() {
	return ( 
		<div
			style={{
				display: 'flex',
				flexDirection:"column",
				gap:"20px",
				width: '100%',
				height: '60vh',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white'
			}}
		>
			<BsPencilSquare size={50} />
			<h5>No Notes here yet</h5>
		</div>
	);
}

export default NoNotes;
