import React, { useState, useEffect } from 'react';
import './Node.css';
import MoreInformationBox from './MoreInformationBox/MoreInformationBox';

function Node({ text, children, root, leave, position, content }) {
	// Whether or not to show detail
	const [showDetail, setShowDetail] = useState(false);
	return (
		<section className="node-container">
			{/* If the element is not root then display a connecting line over it
				The position defines the width of the line */}
			{/*
					_____ -> connecting line
			    ___|__ -> cap
				|	  |
				|_____| -> Text
			*/}
			{!root && <div className={`node-line ${position}`}></div>}

			{/* If the element is not root then display a cap over it */}
			{!root && <div className="node-cap"></div>}

			{/* Display Notes Area */}
			<div className="node-text">
				<div
					className="node-text-content"
					onClick={() => setShowDetail(!showDetail)}
				>
					{text}
				</div>

				{/* Display and hide content when user clicks on text */}
				{content && showDetail && (
					<MoreInformationBox content={content} />
				)}
			</div>

			{/* If the node is not leave then display a cap below text are */}
			{!leave && <div className="node-cap"></div>}

			{/* Render all the children of this note in a flex */}
			<div className="node-footer">
				<div className="node-children">{children}</div>
			</div>
		</section>
	);
}

export default Node;
