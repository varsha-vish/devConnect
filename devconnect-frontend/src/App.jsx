import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';
import axios from 'axios';
import UserDirectory from './pages/UserDirectory';

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // const avatar = user?.avatar || '/default-avatar.png';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">DevConnect</h1>
      {user ? (
      
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/explore" element={<UserDirectory />} />
            </Routes>
          </Router>
      ) : (
        <a
          href="/api/auth/google"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login with Google
        </a>
      )}
    </div>
  );
}

export default App;
