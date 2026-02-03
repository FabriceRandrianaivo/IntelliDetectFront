import React from "react";
// import { Plus } from "lucide-react";
// import { CiCirclePlus } from "react-icons/ci";
import { IpListAddress } from "../../components/ip-list/ip-list-address";
import HeadSection from "../../components/ui/headSection";
import { useAppSelector } from "../../store/store";

const Ip_list: React.FC = () => {
  const indexCollectionActive = useAppSelector(
    (state) => state.collection.activeIndex,
  );
  const collectionItems = useAppSelector((state) => state.collection.items);
  const collectionActive = collectionItems[indexCollectionActive || 0];
  return (
    <div className="wrapper-section">
      <div className={"b-section-left"}>
        <HeadSection
          title={`Ip List on collection ${collectionActive?.collection_name}`}
        />
        {/* <button onClick={()=>{console.log("create collection");
            }} className="create-new">
              <span>Créer nouveau</span> */}
        {/* <Plus className="plus" /> */}
        {/* <CiCirclePlus />
            </button> */}
        <IpListAddress />
      </div>
    </div>
  );
};
export default Ip_list;
