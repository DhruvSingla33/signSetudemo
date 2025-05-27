import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Sign.css"; 

const Sign = () => {
  const { id } = useParams();
  const [sign, setSign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSign = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sign/${id}`);
        setSign(response.data);
      } catch (error) {
        console.error("Error fetching sign", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSign();
  }, [id]);


  if (loading) return <p>Loading...</p>;
  if (!sign) return <p>Sign not found.</p>;

  return (
    <div class="outer-wrapper2">
      <div className="sign-page-container2">
      <h1 className="sign-title2">Word: {sign.word}</h1>
      <div className="sign-content-row2">
        <div className="video-container2">
          <iframe
            src={`http://localhost:8000/${sign.videoUrl}`}
            title={sign.word}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <div className="sign-definition2">
          {sign.definition}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sign;
