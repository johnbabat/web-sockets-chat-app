import './Chat.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

// Components
import ChatSidebar from '../components/ChatSidebar';
import ChatMessages from '../components/ChatMessages';

function Chat({ location, socket }) {

    const [userName, setuserName] = useState('');
    const [userRoom, setuserRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const onComponentLoad = (name, room) => {
        setuserName(name)
        setuserRoom(room)
    }

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        onComponentLoad(name, room)
    }, [location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        return () => {
            socket.off('message');
         };
    }, [messages, socket])

    useEffect(() => {
        if (userName && userRoom) {
            socket.emit('join', {name: userName, room: userRoom}, ( error ) => {
                var href = window.location.origin
                alert(error)
                window.location.href = href
            })
        }
    }, [userName, userRoom, socket])

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const disconnectUser = () => {
        socket.disconnect();
        socket.connect();
    }

    return (
        <>
        { (userName && userRoom) ?
            <div className="chat-container">
                <header className="chat-header">
                    <h1>John's ChatApp</h1>
                    <Link to='/'>
                        <button 
                            className="btn leaveBtn"
                            onClick={disconnectUser}
                        >
                            Leave <span>Room</span>
                        </button>
                    </Link>
                </header>

                <main className="chat-main">
                    < ChatSidebar userRoom={userRoom} userName={userName} socket={socket} />
                    < ChatMessages messages={messages} userName={userName} />
                </main>

                <div className="sendMessage">
                    <textarea
                        value={message}
                        placeholder="Enter Message"
                        className="enterMessage"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && e.shiftKey ? null : e.key === "Enter" ? sendMessage(e) : null}
                        rows={1}
                    />
                    <button
                        className="btn sendMessageBtn"
                        onClick={(e) => sendMessage(e)}
                    >
                        <i className="fas fa-paper-plane"></i> Send
                    </button>
                            
                </div>
            </div>

            : 
            <div className="inValid">
                <h2>PLEASE JOIN CHAT FROM FROM THE <Link to='/'><span>HOME PAGE</span></Link></h2>
            </div>
            
        }
        </>
        
    )
}

export default Chat
