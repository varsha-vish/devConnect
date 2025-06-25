import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function UserProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/users/${id}`).then(res => {
      setProfile(res.data);
      if (user && res.data.followers.includes(user._id)) {
        setIsFollowing(true);
      }
    });
  }, [id, user]);

  const handleFollow = async () => {
    const url = `/api/users/${id}/${isFollowing ? 'unfollow' : 'follow'}`;
    await axios.post(url, {}, { withCredentials: true });
    setIsFollowing(!isFollowing);
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <img src={profile.avatar} className="w-20 h-20 rounded-full mx-auto mb-2" />
      <h2 className="text-xl font-bold">{profile.name}</h2>
      <p className="text-gray-600">{profile.bio}</p>
      <p className="mt-2">
        <strong>Skills:</strong> {profile.skills.join(', ') || 'None'}
      </p>
      {user && user._id !== id && (
        <button
          className={`mt-4 px-4 py-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-green-500'} text-white`}
          onClick={handleFollow}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
}
