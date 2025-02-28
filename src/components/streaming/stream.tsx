import React, { useState, useEffect } from "react";

const VideoStream: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const fetchFrame = async () => {
      try {
        const response = await fetch("http://localhost:8000/streal/video_feed", {
          headers: {
            Authorization: "Bearer mon_secret_token", // Remplace avec ton vrai token
          },
        });

        if (response.ok) {
          setImageSrc("http://localhost:8000/stream/video_feed");
        } else {
          console.error("Requête non autorisée");
        }
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      }
    };

    fetchFrame();
  }, []);

  return (
    <div>
      <h2>Détection d'objets avec YOLO</h2>
      {imageSrc ? (
        <img src={imageSrc} alt="Video Stream" width="640" />
      ) : (
        <p>Chargement du flux...</p>
      )}
    </div>
  );
};

export default VideoStream;
