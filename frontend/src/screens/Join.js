import {  useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css'

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('JavaScript');
    const [alertClass, setAlertClass] = useState('hide')

    const alertUser = (e) => {
        e.preventDefault()
        setAlertClass('')
    }

    return (
        <div className="join-container">
            <header className="join-header">
                <h1>John's ChatApp</h1>
            </header>
            <main className="join-main">
                <div>
                    <label>Username</label>
                    <input
                        className="joinInput"
                        type="text"
                        name="username"
                        placeholder="Enter username..."
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{marginTop: 10}}>
                    <label>Room</label>
                    <select 
                        name="room"
                        onChange={(e) => setRoom(e.target.value)}
                    >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="PHP">PHP</option>
                        <option value="C">C</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Java">Java</option>
                    </select>
                </div>
                <p  className={alertClass} style={{color: 'pink', marginTop: 5, marginBottom: 0}}><strong>Please Identify Yourself!!'</strong></p>
                <Link 
                    to={`/chat?name=${name}&room=${room}`}
                    onClick={e => (!name) ? alertUser(e) : null}    
                >
                    <button type="submit" className="btn">Join Chat</button>
                </Link>

            </main>
        </div>
    )
}

export default Join
