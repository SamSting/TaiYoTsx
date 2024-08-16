import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { editContact } from '../store/contactSlice';
import { Contact } from './types';  

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState<Contact | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const defaultProfilePic = 'https://cdn.vectorstock.com/i/preview-1x/61/97/black-contact-person-icon-on-white-background-vector-31046197.webp'; // Set the path to your default profile picture

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      setContactData(contact);
      setProfilePic(contact.profilePic || null); // Initialize with existing profile picture or null
    }
  }, [contacts, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactData) {
      const updatedContact = {
        ...contactData,
        profilePic: profilePic || defaultProfilePic,  
      };
      dispatch(editContact(updatedContact));
      navigate('/'); // Redirect to contact list
    }
  };

  const handleRemovePic = () => {
    setProfilePic(defaultProfilePic);  
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePic(reader.result as string);  
      };

      reader.readAsDataURL(file);  
    }
  };

  if (!contactData) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="profilePic">
            Choose New Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {profilePic && (
            <img src={profilePic} alt="Profile Preview" className="w-24 h-24 rounded-full mt-4" />
          )}
          <button
            type="button"
            onClick={handleRemovePic}
            className="text-red-500 hover:underline mt-2"
          >
            Remove Profile Picture
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={contactData.name}
            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={contactData.email}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={contactData.phone}
            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
