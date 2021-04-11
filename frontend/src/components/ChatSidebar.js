import { useEffect, useState } from "react";

import './ChatSidebar.css';

function ChatSidebar({ userRoom, userName, socket }) {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
        return () => {
            socket.off('roomData');
         };
    }, [socket])

    return (
        <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
            <h2>{userRoom}</h2>
            <h3><i className="fas fa-users"></i> Users</h3>
            <div className="sidebarUsers">
                <ul>
                    {users?.filter(user => user.room === userRoom)?.map(user =>
                        <li key={user.id}><i className="fas fa-user"></i> {`${user.name}${user.name === userName ? " (Me)" : ""}`}</li>
                        )}
                </ul>
            </div>
        </div>
    )
}

export default ChatSidebar
