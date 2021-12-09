import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import JsxParser from 'react-jsx-parser';

import './NotesDisplayArea.css';
import Node from './Node/Node';

function NotesDisplayArea() {
	// graph content that will be passed to the JSX parser
	const [graphContent, setGraphContent] = useState('');

	// in line custom styling for the graph display area
	const [styleScreen, setStyleScreen] = useState({});

	// getting notes detail from store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// once loading is done set style and graph content
	useEffect(() => {
		setGraphContent(notesDetail?.graph_content);
		setStyleScreen(notesDetail.settings?.screen);
	}, [loading, notesDetail]);
	return (
		<div className="notes-disp-container" style={styleScreen}>
			{/* JSX parser is used to render our string */}
			<JsxParser components={{ Node }} jsx={graphContent} />
		</div>
	);
}

export default NotesDisplayArea;
