import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Signs.css';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Fuse from 'fuse.js';

const Signs = ({ type }) => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSigns();
  }, [type]);

  const fetchSigns = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/signs`);
      setSigns(res.data);
      setTimeout(() => setLoading(false), 2000); 
    } catch (err) {
      console.error("Error fetching signs", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sign?")) {
      try {
        await axios.delete(`http://localhost:8000/api/sign/${id}`);
        fetchSigns();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  useEffect(() => {
    const fuse = new Fuse(signs, { keys: ['word'], includeScore: true });
    if (searchTerm === '') {
      setSearchResults(signs);
    } else {
      const results = fuse.search(searchTerm);
      setSearchResults(results.map(result => result.item));
    }
  }, [searchTerm, signs]);

  return (
    <div className="sign-page-wrapper" data-theme="light">
      <h2 className="page-title">Search a particular sign</h2>

      <div className="action-bar">
        <Link to="/upload">
          <button className="add-word-btn">+ Add Sign</button>
        </Link>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {loading ? (
        <div className="spinner-box">
          <CircularProgress />
        </div>
      ) : searchResults.length ? (
        <div className="strips-container">
          {searchResults.map((sign) => (
            <div key={sign._id} className="sign-card-horizontal">
              <div className="sign-img-section">
                <Link to={`/sign/${sign._id}`}>
                  <img src={`http://localhost:8000/${sign.imageUrl}`} alt={sign.word} className="sign-img-large" />
                </Link>
              </div>
              <div className="sign-text-section">
                <Link to={`/sign/${sign._id}`} className="sign-word-link">
                  <h2>{sign.word}</h2>
                </Link>
                <p className="sign-description">{sign.definition}</p>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(sign._id)}
                  className="delete-btn"
                >
                  <DeleteIcon />
                </IconButton>
                  <IconButton
      aria-label="update"
      component={Link}
      to={`/update/${sign._id}`}
      className="update-btn"
    >
      ✏️
    </IconButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No data is available for the selected category</div>
      )}
    </div>
  );
};

export default Signs;