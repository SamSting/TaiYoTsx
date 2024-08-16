import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Dashboard from './pages/Dashboard';
import 'leaflet/dist/leaflet.css';
import { FiMenu } from 'react-icons/fi';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Mobile menu button */}
        <button
          className="p-2 text-white bg-gray-800 fixed top-4 left-4 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>

        {/* Original Sidebar for desktop */}
        <div className="w-64 bg-gray-800 text-white fixed h-full p-5 hidden md:block">
          <h1 className="text-2xl mb-6">Contact Manager</h1>
          <Link to="/" className="block mb-4 hover:underline">
            Contact List
          </Link>
          <Link to="/add" className="block mb-4 hover:underline">
            Create Contact
          </Link>
          <Link to="/dashboard" className="block mb-4 hover:underline">
            Chart Dashboard
          </Link>
        </div>

        {/* Slide-in sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full p-5 z-20 md:hidden transition-transform duration-300 ease-in-out">
            <h1 className="text-2xl mb-6">Contact Manager</h1>
            <Link to="/" className="block mb-4 hover:underline" onClick={closeSidebar}>
              Contact List
            </Link>
            <Link to="/add" className="block mb-4 hover:underline" onClick={closeSidebar}>
              Create Contact
            </Link>
            <Link to="/dashboard" className="block mb-4 hover:underline" onClick={closeSidebar}>
              Chart Dashboard
            </Link>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 ml-0 md:ml-64 p-5 transition-all duration-300 ${isSidebarOpen ? 'mt-20' : 'mt-20'}`}>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
