import React, { useState } from 'react';
import HomePageComponent from '../Components/HomePageComponent/HomePageComponent';

function HomePage() {
	const [show, setShow] = useState(false);
	return (
		<>
			<HomePageComponent />
		</>
	);
}

export default HomePage;
