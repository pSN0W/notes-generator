import React, { useState, useEffect } from 'react';
import './Message Component.css';

function MessageComponent({ message, classname }) {
	const [show, setShow] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShow(false);
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);
	return (
		<div className="message-component-wrapper">
			{show && (
				<div className={`message-component-div ${classname}`}>
					{message}
				</div>
			)}
		</div>
	);
}

export default MessageComponent;
