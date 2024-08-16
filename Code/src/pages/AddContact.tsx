import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const defaultProfilePic = 'https://cdn.vectorstock.com/i/preview-1x/61/97/black-contact-person-icon-on-white-background-vector-31046197.webp'; // Set the path to your default profile picture

  const handleSubmit = () => {
    if (!name || !phone) { // Check if Name and Phone are provided
      setError('Name and Phone are required fields.'); 
      return;  
    }

    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(addContact({
          id: uuidv4(),
          name,
          email,
          phone,
          profilePic: reader.result as string,
        }));
        navigate('/');
      };
      reader.readAsDataURL(profilePic);
    } else {
      dispatch(addContact({
        id: uuidv4(),
        name,
        email,
        phone,
        profilePic: defaultProfilePic, // Use default profile picture if none is provided
      }));
      navigate('/');
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Add New Contact</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}  
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);  
          }}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(null);  
          }}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default AddContact;
