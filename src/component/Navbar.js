import React, { useState } from 'react';
import {  signOut } from 'firebase/auth'; 
import { auth } from "../config/firebase";
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LockOpen ,Send } from '@material-ui/icons';



function Navbar() {
  const currentUser = auth.currentUser;
  const categories = useSelector((state) => state.policies.categories);
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
    // setSelectedCategory(category); 
    navigate(`/PoliciesPage?category=${category}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    navigate(`/PoliciesPage?query=${searchQuery}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/SignIn'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        <Link to="/" className="navbar-brand heading"   ><span className='green'>Insurance</span> Domain</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/PoliciesPage" className="nav-link active" aria-current="page">All Policies</Link>
            </li>
            <li className="nav-item">
              <Link to="/compare" className="nav-link active" aria-current="page">Compare Policies</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button className="dropdown-item" onClick={() => handleCategoryClick(category)}>
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
          {currentUser ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/ProfileInfo" className="nav-link active">User Profile <AccountCircleIcon className='green'/>
</Link>
              </li> 
               <li className="nav-item">
                <Link to="/Chat" className="nav-link active">Chat <Send className='green' />
</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link active" onClick={handleLogout}>Logout <ExitToAppIcon className='green'/>
</button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/SignIn" className="nav-link active">Login <LockOpen fontSize="small" className="ms-1" /></Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
