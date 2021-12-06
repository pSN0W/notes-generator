import React, { useState, useEffect } from 'react';
import './NavBar.css';
import NavButton from './NavButton/NavButton';
import FileBox from '../../../../Utils/FileBox/FileBox';
import { VscNewFile } from 'react-icons/vsc';
import { VscCopy } from 'react-icons/vsc';
import { VscOpenPreview } from 'react-icons/vsc';
import { RiFolderSharedFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoIosCreate } from 'react-icons/io';
import { RiMailStarFill } from 'react-icons/ri';

function NavBar() {
	const [fav, setFav] = useState(false);

	// what tab of FileBox should be opened
	const [index, setIndex] = useState(0);

	// whether file box should be displayed
	const [visible, setVisible] = useState(false);
	const handleClick = (ind) => {
		setIndex(ind);
		setVisible(true);
	};
	return (
		<>
			{visible && <FileBox activeIndex={index} setVisible={setVisible} />}
			<nav>
				<ul>
					<li>
						<NavButton text="New">
							<VscNewFile />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open">
							<VscOpenPreview />
						</NavButton>
					</li>
					<li>
						<NavButton text="Make a copy">
							<VscCopy />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open Favourites">
							<RiMailStarFill onClick={() => handleClick(1)} />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open Shared Notes">
							<RiFolderSharedFill
								onClick={() => handleClick(2)}
							/>
						</NavButton>
					</li>
					<li>
						<NavButton text="Save & Create">
							<IoIosCreate />
						</NavButton>
					</li>
					<li>
						{/*If it is favourite then display the filled heart else empty one */}
						<NavButton text="Favorite">
							{fav ? (
								<MdFavorite onClick={() => setFav(false)} />
							) : (
								<MdOutlineFavoriteBorder
									onClick={() => setFav(true)}
								/>
							)}
						</NavButton>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default NavBar;
