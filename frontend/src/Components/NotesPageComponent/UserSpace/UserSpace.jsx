import React from 'react';
import InputArea from './InputArea/InputArea';
import NotesDisplayArea from './NotesDisplayArea/NotesDisplayArea';
import './UserSpace.css'

function UserSpace() {
    return ( <main className="user-space-container">
        <InputArea />
        <NotesDisplayArea />
    </main> );
}

export default UserSpace;