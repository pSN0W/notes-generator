import React, { useState, useEffect } from 'react';

import { AiFillSetting } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { checkDataHomePage } from './Data/checkData';
import { BsCheck2Circle } from 'react-icons/bs';

import FileBox from '../Utils/FileBox/FileBox';

import './HomePageComponent.css';
import { featureData } from './Data/featureData';
import LogoGIF from '../../pen-writing.gif';
import MainPage from './Images/main_page.png';
function HomePageComponent() {
	// to display the filebox
	const [show, setShow] = useState(false);

	// which index to of filebox must be displayed
	const [activeIndex, setActiveIndex] = useState(0);

	// data used with checkbox
	const [checkData, setCheckData] = useState([]);

	// features of the app
	const [features, setFeatures] = useState([]);

	// what we want to be displayed in the circle of feature box
	const featureHeading = [
		'#',
		'>',
		<AiFillSetting />,
		<BsFillPersonPlusFill />
	];

	// update checkdata from the file when the component gets rendered
	useEffect(() => {
		// if user has logged in display recent else global
		setActiveIndex(localStorage.getItem('userInfo') ? 0 : 3);
		setCheckData(checkDataHomePage);
		setFeatures(featureData);
	}, []);
	return (
		<div className="homepage-wrapper">
			{show && <FileBox activeIndex={activeIndex} setVisible={setShow}/>}
			<div className="homepage-header">
				<div className="homepage-header-wrapper">
					<img
						src={LogoGIF}
						alt="logo"
						className="homepage-header-img"
					/>
					<div className="homepage-header-title">Notesy</div>
				</div>
				<div className="homepage-header-wrapper">
					<button onClick={()=>setShow(true)}>Notes</button>
					<div>Login</div>
				</div>
			</div>
			<div className="homepage-display">
				<div className="homepage-display-content">
					<div className="homepage-display-title">Notesy</div>
					<div className="homepage-display-content">
						An automatic flowchart generator for your notes
					</div>
				</div>
				<img
					src={MainPage}
					alt="main-page-img"
					className="homepage-display-img"
				/>
			</div>
			<div className="homepage-check">
				{checkData.map((check, index) => (
					<div className="homepage-check-cell" key={index}>
						<BsCheck2Circle
							className="homepage-check-checkbox"
							size={100}
						/>
						<div>{check}</div>
					</div>
				))}
			</div>
			<hr className="homepage-line" />
			<div className="homepage-about">
				<h1>Learn Effectively</h1>
				<div>
					Study suggests that Flowcharts can help in memorising the
					topic longer and can also helps us in remembering the
					relation between topic. Notesy - the notes generator, helps
					you in achieving just that. It can convert your regular
					markdown file with heading, subheading and going further
					down the heirarchy into a beautiful looking flowchart.
					Notesy also provides you the feature to write details on any
					topic which will be hidden until clicked on that topic.
				</div>
			</div>
			<hr className="homepage-line" />
			<div className="homepage-feature">
				{features.map((feature, index) => (
					<div key={index}>
						<div
							className={`homepage-feature-cell ${
								index % 2
									? 'homepage-feature-left'
									: 'homepage-feature-right'
							}`}
						>
							<div className="homepage-feature-title">
								{featureHeading[index]}
							</div>
							<div>{feature}</div>
						</div>
						<hr className="homepage-line" />
					</div>
				))}
			</div>
			<h1 style={{ marginLeft: '320px' }}>
				Contribute to this project{' '}
				<a href="https://github.com/pSN0W/notes-generator">here</a>{' '}
			</h1>
		</div>
	);
}

export default HomePageComponent;
