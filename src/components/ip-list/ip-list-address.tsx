// import { CircleX, Copy } from "lucide-react";

import { useState } from "react";
import Cookies from "js-cookie";
import { IpList } from "./ipList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createIp, fetchIP } from "../../store/features/ipsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export function IpListAddress() {
  const [ipUrls, setIpUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");
  const token = Cookies.get("user");
  const dispatch = useAppDispatch();
  const collectionIndex = useAppSelector((state)=> state.collection.activeIndex);
  const collectionItemsActive = useAppSelector((state)=> state.collection.items[collectionIndex || 0]);
  const collection_id = collectionItemsActive.id
  const addIp = () => {
    if (inputUrl.trim()) {
      setIpUrls([...ipUrls, inputUrl.trim()])
      setInputUrl("");
    }
  };

  const handleCreateIp = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputUrl.trim().length > 0) {
            const credential = {
              payload:{
                collection_id: collection_id
              },
              ips: inputUrl
            }
            dispatch(createIp(credential))
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                    dispatch(fetchIP(collection_id));
                    setInputUrl("");
                })
                .catch((error: any) => {
                    console.error("Login error:", error);
                })
                .finally();
        } else {
            console.error("Veuillez entrer une Ip valides.");
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
              (e.key =="Enter")&& handleCreateIp(e)
            }}
            placeholder="http://192.168.x.x:8080/video"
          />
          <button onClick={(e) => handleCreateIp(e)}>Ajout</button>
        </div>

        <IpList/>
        {/* <div className="ip-grid" key={inputUrl.length}>
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
        </div> */}
      </div>
    </>
  );
}
