import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', bio: '', skills: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skills: user.skills?.join(', ') || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put('/api/users/me', {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim())
    }, { withCredentials: true });
    setUser(res.data);
    alert('Profile updated!');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border rounded" />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
