import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.name || '');
  const [photo, setPhoto] = useState(user.photo || '');

  const handleSave = () => {
    updateProfile({ name, photo });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Link Foto Profile"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-1 text-gray-500">Batal</button>
          <button onClick={handleSave} className="bg-orange-500 text-white px-4 py-1 rounded">Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
