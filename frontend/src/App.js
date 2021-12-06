import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './LoginPage/LoginPage';
import NotesPage from './Pages/NotesPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/notes/:id" element={<NotesPage />} />
			</Routes>
		</Router>
	);
}

export default App;
