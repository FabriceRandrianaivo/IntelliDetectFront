import VideoStream from '../../components/streaming/stream';
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
interface headerType {
  theme: boolean;
  // setTheme: (theme: boolean) => void;
}
const Streaming = (props: headerType) => {
  const token = Cookies.get("user");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isYolo, setIsYolo] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleStartStreaming = () => {
    setIsStreaming(true);
    if (imgRef.current) {
      imgRef.current.src = `http://localhost:8000/stream/video_feed?bearer=${token}`;
    }
  };
console.log(imgRef.current );

  const handleStopStreaming = () => {
    setIsStreaming(false);
    if (imgRef.current) {
      imgRef.current.src = "";
    }
  };

  return (
    <div className="content-stream">
      <div className="ctn-section-top">
        <section className="section-str">
          <div >
            <h2>Flux vidéo en direct</h2>
            <div>
              <button onClick={handleStartStreaming} disabled={isStreaming}>
                Démarrer le Streaming
              </button>
              <button onClick={handleStopStreaming} disabled={!isStreaming}>
                Arrêter le Streaming
              </button>
            </div>
            {isLoading && <p>Chargement du flux vidéo...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isStreaming ?
              <img
                ref={imgRef}
                alt="Flux vidéo"
                className='flux-video'
              // style={{ width: "600px", height: "400px", border: "2px solid #333" }}
              />
              :
              <div className='no-stream'>
                Attend de video
              </div>
            }

          </div>
        </section>

        {/* Search */}
        <section className="section-search">
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <input type="search" className="input-search" id="" placeholder='Prompt . . .' />
          <h2 className="text-xl font-semibold mb-4">Resultat</h2>
          <div className='resultat-search'>
            Result
          </div>
        </section>
      </div>
      <div className="ctn-section-bottom">
        {/* Utilisation model  */}
        <section className="section-use">
          <h2 className="text-xl font-semibold mb-4">Utilisation de model</h2>
          <div className='inference'>
            Inference
          </div>
        </section>
        {/* Statistiques d'utilisation */}
        <section className="section-stat">
          <h2 className="text-xl font-semibold mb-4">Statistiques d&apos;utilisation</h2>
          <div className='utilisation'>
            Usage
          </div>
        </section>
      </div>
    </div>
  );
};

export default Streaming;

