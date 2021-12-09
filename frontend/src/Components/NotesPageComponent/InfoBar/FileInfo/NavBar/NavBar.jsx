import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { VscNewFile } from 'react-icons/vsc';
import { VscCopy } from 'react-icons/vsc';
import { VscOpenPreview } from 'react-icons/vsc';
import { RiFolderSharedFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoIosCreate } from 'react-icons/io';
import { RiMailStarFill } from 'react-icons/ri';

import './NavBar.css';
import NavButton from './NavButton/NavButton';
import FileBox from '../../../../Utils/FileBox/FileBox';

import {
	updateFavourite,
	createNotes,
	updateNotes
} from '../../../../../Action/notesAction';

function NavBar() {
	const [fav, setFav] = useState(false);

	// what tab of FileBox should be opened
	const [index, setIndex] = useState(0);

	// whether file box should be displayed
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();
	const id = useParams().id;

	// the global data of this note
	const data = useSelector((state) => state['notesValue']);

	// getting notesDetail from the store
	const { loading, notesDetail } = useSelector(
		(state) => state['notesDetail']
	);

	// getting loading detail from reducer
	const {
		loading: createLoading,
		success: createSuccess,
		createdProduct: createdProduct,
		error: createError
	} = useSelector((state) => state['notesCreate']);

	// openFileBox displays the FileBox with particular tab
	const openFileBox = (ind) => {
		setIndex(ind);
		setVisible(true);
	};

	// update the value of favourite when the note has loaded
	useEffect(() => {
		setFav(notesDetail?.favourite);
	}, [loading, notesDetail]);

	// update the global favourite everytime favourite is updated
	useEffect(() => {
		dispatch(updateFavourite(fav));
	}, [fav]);

	// If a new note has been created successfully redirect there
	useEffect(() => {
		if (createSuccess) {
			window.location.href = `/notes/${createdProduct.id}`;
		}
	}, [createSuccess]);

	// Handle updating the note by sending the global data of note to database
	// this global data gets updated everytime any item changes
	const handleUpdate = () => {
		dispatch(updateNotes(id, data));
	};

	// create a new product with default data
	const handleCreateNew = () => {
		dispatch(createNotes({}));
	};

	// create a copy of the note with data of current notes
	const handleCreateCopy = () => {
		dispatch(createNotes(data));
	};
	return (
		<>
			{visible && <FileBox activeIndex={index} setVisible={setVisible} />}
			<nav>
				<ul>
					<li>
						<NavButton text="New">
							<VscNewFile onClick={handleCreateNew} />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open">
							<VscOpenPreview onClick={() => openFileBox(0)} />
						</NavButton>
					</li>
					<li>
						<NavButton text="Make a copy">
							<VscCopy onClick={handleCreateCopy} />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open Favourites">
							<RiMailStarFill onClick={() => openFileBox(1)} />
						</NavButton>
					</li>
					<li>
						<NavButton text="Open Shared Notes">
							<RiFolderSharedFill
								onClick={() => openFileBox(2)}
							/>
						</NavButton>
					</li>
					<li>
						<NavButton text="Save & Create">
							<IoIosCreate onClick={handleUpdate} />
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
