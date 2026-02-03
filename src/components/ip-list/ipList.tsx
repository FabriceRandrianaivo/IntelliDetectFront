import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteIp, fetchIP, setActiveIps } from "../../store/features/ipsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCollection } from "../../store/features/collectionSlice";

export function IpList() {
  const activeIndexCollection = useAppSelector(
    (state) => state.collection.activeIndex,
  );
  const collectionItems = useAppSelector((state) => state.collection.items);
  const collectionActive =
    collectionItems[activeIndexCollection ? activeIndexCollection : 0];

  const IpListAddress = useAppSelector((state) => state.ip.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("user");

  const handleGetCollection = async () => {
    try {
      await dispatch(fetchCollection());
    } catch (e) {
      console.error("une erreur est suvenue :" + e);
    }
  };
  useEffect(() => {
    collectionItems.length === 0 && handleGetCollection();
  }, []);

  useEffect(() => {
    dispatch(fetchIP(collectionActive.id));
  }, []);

  useEffect(() => {
    dispatch(fetchIP(collectionActive.id));
  }, [activeIndexCollection]);

  return (
    <div className="b_list">
      {IpListAddress.length === 0 ? (
        <div className="b_card-list">Il n'y a pas d'IP dans la collection</div>
      ) : (
        IpListAddress.map((ip, key) => (
          <div
            className="b_card-list"
            key={key}
            onClick={(e) => {
              if (e.detail === 1) {
                console.log(ip);
                navigate(`/stream`);
                // navigate(`/stream/${ip.collection_id}/${ip.id}`);
                // dispatch(setActiveIps(ip.ip_address)); // ou `ip.id` selon ton slice
              } else {
                dispatch(setActiveIps(ip.ip_address));
                navigate("/stream");
              }
            }}
          >
            <div className="ip_card-list">
              {/* <h2>{ip.ip_address}</h2> */}
              <div className="ip_head-card">
                Camera {key + 1}
                {/* {ip.ip_address} */}
              </div>
              <div className="ip_content-list">
                <img
                  src={`http://localhost:8000/stream/from-ip/${ip.ip_address}/?bearer=${token}`}
                  alt={`Camera ${key + 1} erreur`}
                />
              </div>
              {/* <CircleX /> */}
            </div>
            <div className="b_content-list">
              <div className="b_action-list">
                <div className="b_left">
                  <p>Modifier</p>
                </div>
                <div className="b_right">
                  <p
                    onClick={(e) => {
                      e.stopPropagation(); // évite de déclencher onClick du parent
                      console.log("delete");
                      const payload = {
                        collection_id: ip.collection_id,
                        ip_id: ip.id,
                      };
                      dispatch(deleteIp(payload)).then(() =>
                        dispatch(fetchIP(collectionActive.id)),
                      );
                    }}
                  >
                    Révoquer
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
        // IpListAddress.map((ip, key) => (
        //   <>
        //     <div className="ip_card-list" key={key}>
        //       <div className="ip_head-card">
        //         {/* Camera {idx + 1} */}
        //         {ip.ip_address}
        //       </div>
        //       <div className="ip_content-list">
        //         <img src={ip.ip_address} alt={`Camera ${key + 1}`} />
        //       </div>
        //     </div>
        //   </>
        // ))
      )}
    </div>
  );
}
