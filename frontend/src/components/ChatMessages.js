import './ChatMessages.css';

import ReactEmoji from 'react-emoji';
import { useEffect } from 'react';

function ChatMessages({ messages, userName }) {

    useEffect(() => {
        var element = document.querySelector('.chat-messages');
        element.scrollTop = element.scrollHeight;
    },[messages])

    return (
        <div className="chat-messages">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.userName === userName && "user"} ${message.bot && "bot"}`}>
                    <p className="meta">{message.userName === userName ? "Me": message.userName } <span>{message.time}</span></p>
                    <p className="text">
                        {ReactEmoji.emojify(message.text)}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ChatMessages
