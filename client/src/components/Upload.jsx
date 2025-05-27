import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("word", inputs.word);
    formData.append("definition", inputs.definition);
    formData.append("image", img);
    formData.append("video", video);

    try {
      const res = await axios.post("http://localhost:8000/api/sign", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload success", res.data);
      navigate("/");
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
   <div className="z">
  <div className="upload-container1">
    <div className="upload-box1">
      <h2>Upload New Sign</h2>

      <label>Word:</label>
      <input
        type="text"
        name="word"
        placeholder="e.g., Learn"
        onChange={handleChange}
        required
      />

      <label>Definition:</label>
      <textarea
        name="definition"
        placeholder="To gain knowledge"
        onChange={handleChange}
        rows={4}
        required
      />

      <label>Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
        required
      />

      <label>Video:</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        required
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  </div>
</div>
  );
};

export default Upload;
