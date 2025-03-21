import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

const VideoStream: React.FC = () => {
  const token = Cookies.get("user");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isYolo,setIsYolo] = useState<boolean>(false);

  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleStartStreaming = () => {
    setIsStreaming(true);
    if (imgRef.current) {
      imgRef.current.src = `http://localhost:8000/stream/video_feed?bearer=${token}`;  // Arrête l'affichage du flux
    }
  };

  const handleStopStreaming = () => {
    setIsStreaming(false);
    if (imgRef.current) {
      imgRef.current.src = "";  // Arrête l'affichage du flux
    }
  };

  return (
    <div >
      <h1>Flux vidéo en direct</h1>
      <div>
        <button onClick={handleStartStreaming} disabled={isStreaming}>
          Démarrer le Streaming
        </button>
        <button onClick={handleStopStreaming} disabled={!isStreaming}>
          Arrêter le Streaming
        </button>
      </div>
      {/* {isLoading && <p>Chargement du flux vidéo...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}
        <img
          ref={imgRef}
          alt="Flux vidéo"
          style={{ width: "600px", height:"400px", border: "2px solid #333" }}
        />
    </div>
  );
};

export default VideoStream;
