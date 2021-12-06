import React, { useState } from 'react';
import FileBox from '../Components/Utils/FileBox/FileBox';

function HomePage() {
	const [show, setShow] = useState(false);
	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				{show && <FileBox activeIndex={0} setVisible={setShow} />}
				<button onClick={() => setShow(true)}>Show Files</button>
			</div>
		</>
	);
}

export default HomePage;
