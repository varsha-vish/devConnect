import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const { user } = useContext(AuthContext);
   useEffect(() => {
    axios.get('/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);
  const avatar = user?.avatar || '/default-avatar.png';

  return (
    <div className="text-center mt-10">
      {user && (
        <>
            <div className="text-center mt-4">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mx-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.png';
            }}
          />
          <p className="mt-2">Welcome, {user.name}</p>
          <a
            href="/api/auth/logout"
            className="mt-4 inline-block text-red-500 hover:underline"
          >
            Logout
          </a>
        </div>
          <Link to="/profile/edit" className="block mt-4 text-blue-500 underline">
            Edit Profile
          </Link>
          <Link to="/explore" className="mt-4 text-blue-500 underline block">
            Explore Developers
          </Link>
        </>
      )}
    </div>
  );
}
