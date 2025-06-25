import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function UserDirectory() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users', { withCredentials: true })
      .then(res => setUsers(res.data));
  }, []);

  const handleFollowToggle = async (id, isFollowing) => {
    const url = `/api/users/${id}/${isFollowing ? 'unfollow' : 'follow'}`;
    await axios.post(url, {}, { withCredentials: true });

    setUsers(prev => prev.map(u => {
      if (u._id === id) {
        const updatedFollowers = isFollowing
          ? u.followers.filter(fid => fid !== user._id)
          : [...u.followers, user._id];
        return { ...u, followers: updatedFollowers };
      }
      return u;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Connect with Developers</h2>
      <div className="space-y-4">
        {users.map(u => {
          const isFollowing = u.followers.includes(user._id);
          return (
            <div key={u._id} className="flex items-center justify-between p-4 border rounded">
              <div className="flex items-center gap-4">
                <img src={u.avatar} className="w-12 h-12 rounded-full" />
                <div>
                  <Link to={`/user/${u._id}`} className="text-lg font-semibold hover:underline">
                    {u.name}
                  </Link>
                  <p className="text-sm text-gray-600">{u.skills.join(', ')}</p>
                </div>
              </div>
              <button
                onClick={() => handleFollowToggle(u._id, isFollowing)}
                className={`px-3 py-1 text-sm rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
