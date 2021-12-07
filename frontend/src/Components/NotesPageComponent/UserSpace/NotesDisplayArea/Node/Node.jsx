import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Node.css';
import MoreInformationBox from './MoreInformationBox/MoreInformationBox';

function Node({ text, children, root, leave, position, content }) {
	// Whether or not to show detail
	const [showDetail, setShowDetail] = useState(false);

	// states related to custom styling of different components
	const [boxStyle, setBoxStyle] = useState({});
	const [lineStyle, setLineStyle] = useState({});
	const [lineHzStyle, setLineHzStyle] = useState({});
	const [textStyle, setTextStyle] = useState({});

	// getting notes detail from store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// setting the custom styles for components once finished loading
	useEffect(() => {
		setBoxStyle(notesDetail.settings.box);
		setLineStyle(notesDetail.settings.line);
		setLineHzStyle(notesDetail.settings['line-hz']);
		setTextStyle(notesDetail.settings.text);
	}, [loading, notesDetail]);
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
			{!root && (
				<div
					className={`node-line ${position}`}
					style={lineHzStyle}
				></div>
			)}

			{/* If the element is not root then display a cap over it */}
			{!root && <div className="node-cap" style={lineStyle}></div>}

			{/* Display Notes Area */}
			<div className="node-text" style={boxStyle}>
				<h2
					className="node-text-content"
					onClick={() => setShowDetail(!showDetail)}
					style={textStyle}
				>
					{text}
				</h2>

				{/* Display and hide content when user clicks on text */}
				{content && showDetail && (
					<MoreInformationBox content={content} />
				)}
			</div>

			{/* If the node is not leave then display a cap below text are */}
			{!leave && <div className="node-cap" style={lineStyle}></div>}

			{/* Render all the children of this note in a flex */}
			<div className="node-footer">
				<div className="node-children">{children}</div>
			</div>
		</section>
	);
}

export default Node;
