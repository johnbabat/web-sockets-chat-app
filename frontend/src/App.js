import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

// Screens
import Chat from './screens/Chat';
import Join from './screens/Join';
import NotFound from './screens/NotFound';

var socket;

if (window.location.hostname === "localhost") {
  socket = io.connect('http://127.0.0.1:5000')
} else {
  socket = io.connect(window.location.hostname)
}


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
            <Route 
              exact 
              path="/" 
              render={(props) => (
                <Join {...props} socket={socket}/>
              )}
            />
            <Route
              path='/chat'
              render={(props) => (
                <Chat {...props} socket={socket} />
              )}
            />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      
    </Router>
  );
}

export default App;
