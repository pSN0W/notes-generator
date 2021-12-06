import React, { useState, useEffect } from 'react';
import './NotesDisplayArea.css';
import JsxParser from 'react-jsx-parser';
import Node from './Node/Node';

function NotesDisplayArea() {
	const graphContent = `
	<Node text="Hello " content="A kind of salutation \n" position="" leave={false} root={true} > <Node text="Hi " content="> Used For \nWhen you meet someone \n" position="left" leave={true} root={false} > </Node> <Node text="Bye " content="" position="" leave={true} root={false} > </Node> <Node text="Okay " content="" position="right" leave={false} root={false} > <Node text="How are you? " content="" position="center" leave={true} root={false} > </Node> </Node> </Node>
	`;
	return (
		<div className="notes-disp-container">
			{/* JSX parser is used to render our string */}
			<JsxParser components={{ Node }} jsx={graphContent} />
		</div>
	);
}

export default NotesDisplayArea;
