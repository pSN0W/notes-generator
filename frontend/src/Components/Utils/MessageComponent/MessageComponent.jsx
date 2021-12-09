import React, { useState, useEffect } from 'react';
import './Message Component.css';

function MessageComponent({ message, classname, reRender }) {
	// wheather to display the message box or not
	const [show, setShow] = useState(true);

	useEffect(() => {
		// everytime there is a change in any of the parameter we want to rerender
		setShow(true);

		// hide the messaage box after 5 seconds
		const timeout = setTimeout(() => {
			setShow(false);
		}, 5000);

		// clear time out after every time you assign it
		return () => {
			clearTimeout(timeout);
		};

		// here re render is just a boolean parameter that can be used enforce a rerender
	}, [message,reRender,classname]);
	if (!message) {
		return <div />;
	}
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
