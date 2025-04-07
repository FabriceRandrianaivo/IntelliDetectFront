// import { CircleX, Copy } from "lucide-react";

import { useState } from "react";
import Cookies from "js-cookie";

export function IpListAddress() {
  const [ipUrls, setIpUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");
  const token = Cookies.get("user");

  const addIp = () => {
    if (inputUrl.trim()) {
      setIpUrls([...ipUrls, inputUrl.trim()])
      setInputUrl("");
    }
  };

  return (
    <>
      <div className="ip-dashboard">
        {/* <h1>Monitoring</h1> */}
        <div className="ip-form">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e)=>{
              (e.key =="Enter")&&addIp()
            }}
            placeholder="http://192.168.x.x:8080/video"
          />
          <button onClick={addIp}>Ajout</button>
        </div>
        <div className="ip-grid" key={inputUrl.length}>
          {ipUrls.map((ip, idx) => (
            <>
              <div className="ip_card-list" key={idx}>
                <div className="ip_head-card">
                  Camera {idx + 1}
                </div>
                <div className="ip_content-list">
                  <img src={ip} alt={`Camera ${idx + 1}`} />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
