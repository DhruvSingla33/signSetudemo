import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";

const UpdateSign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sign, setSign] = useState({ word: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSign = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/sign/${id}`);
        setSign(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading sign", err);
      }
    };
    fetchSign();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/sign/${id}`, sign);
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return loading ? (
    <div className="spinner-box"><CircularProgress /></div>
  ) : (
    
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Update Sign</h2>

      <TextField
        label="Word"
        fullWidth
        margin="normal"
        value={sign.word}
        onChange={(e) => setSign({ ...sign, word: e.target.value })}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={sign.definition}
        onChange={(e) => setSign({ ...sign, definition: e.target.value })}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Update
      </Button>
    </div>
  </div>


  );
};

export default UpdateSign;
