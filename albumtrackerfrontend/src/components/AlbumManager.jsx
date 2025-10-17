import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import "../App.css"; // import colorful CSS

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({ title: "", artist: "", genre: "", year: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all albums on load
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(config.url);
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.title || !formData.artist || !formData.genre || !formData.year) {
      alert("Please fill all fields!");
      return;
    }

    // Year must be 4 digits
    if (formData.year < 1000 || formData.year > 9999) {
      alert("Please enter a valid 4-digit year!");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${config.url}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(config.url, formData);
      }
      setFormData({ title: "", artist: "", genre: "", year: "" });
      fetchAlbums();
    } catch (error) {
      console.error("Error saving album:", error);
    }
  };

  const handleEdit = (album) => {
    setFormData(album);
    setEditId(album.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      try {
        await axios.delete(`${config.url}/${id}`);
        fetchAlbums();
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  return (
    <div className="album-manager">
      <h2>🎵 Album Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="album-form">
        <input
          type="text"
          name="title"
          placeholder="Album Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          min="1000"
          max="9999"
        />
        <button type="submit">{editId ? "Update Album" : "Add Album"}</button>
      </form>

      {/* Album List */}
      <h3>Total Albums: {albums.length}</h3>
      <ul className="album-list">
  {albums.map((album) => (
    <li key={album.id} className="album-item">
      <div className="album-box">{album.title}</div>
      <div className="album-box">{album.artist}</div>
      <div className="album-box">{album.genre}</div>
      <div className="album-box">{album.year}</div>
      <div className="album-buttons">
        <button onClick={() => handleEdit(album)}>Edit</button>
        <button onClick={() => handleDelete(album.id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default AlbumManager;
