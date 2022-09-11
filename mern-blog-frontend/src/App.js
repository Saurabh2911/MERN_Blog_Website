import './App.css';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Settings from './components/pages/settings/Settings';
import Single from './components/pages/single/Single';
import Write from './components/pages/write/Write';
import Topbar from './components/topbar/Topbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import UserContext from './context/user/UserContext';

function App() {
  const context = useContext(UserContext);
    const {user} = context;
  return (
    <div className="App">
      
        <Router>
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />}> </Route>
            <Route path="/post/:postId" element={<Single />}> </Route>
            <Route path="/write" element={user ? <Write /> : <Login />}> </Route>
            <Route path="/setting" element={user ? <Settings /> : <Login />}> </Route>
            <Route path="/register" element={user ? <Home /> : <Register />}> </Route>
            <Route path="/login" element={user ? <Home /> : <Login />}> </Route>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
