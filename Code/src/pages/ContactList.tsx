import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { removeContact } from '../store/contactSlice'; // Import the remove action

interface Contact {
  id: string;            // Unique identifier for the contact
  name: string;          // Name of the contact
  email: string;         // Email address of the contact
  phone: string;         // Phone number of the contact
  profilePic?: string;   // Optional profile picture URL
}

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch(); // Get the dispatch function

  const handleDelete = (id: string) => {
    dispatch(removeContact(id)); // Dispatch the remove action
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <Link to="/add" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block">
        Add New Contact
      </Link>
      {contacts.length === 0 ? (  // Check if there are no contacts
        <p className="text-gray-600">No contacts available. Please add a new contact.</p>
      ) : (
        <ul className="space-y-8">
          {contacts.map((contact: Contact) => (
            <li key={contact.id} className="flex flex-col items-center bg-gray-100 p-6 rounded shadow">
              <img
                src={contact.profilePic || 'default-profile-pic.png'} // Use a default profile pic if none is provided
                alt={contact.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <div className="flex justify-between w-full px-4">
                <Link
                  to={`/edit/${contact.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit Contact
                </Link>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete Contact
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
