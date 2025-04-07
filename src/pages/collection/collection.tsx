import React, { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { CollectionList } from "../../components/collection/collectionList";
import HeadSection from "../../components/ui/headSection";
import { fetchCollection } from "../../store/features/collectionSlice";
import { useAppDispatch } from "../../store/store";
import DrawerCollection from "../../components/collection/drawerCollection";

const Collection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewCollection, setIsNewCollection] = useState<boolean>(false)
  const onClose=()=>{
    setIsNewCollection(false)
  }
  const handleGetCollection = async () => {
    try {
      await dispatch(fetchCollection());
    } catch (e) {
      console.error("une erreur est suvenue :" + e);
    }
  }
  useEffect(() => {
    handleGetCollection();
  }, [])
  return (
    <>
      <div className="wrapper-section">
        <div className={"b-section-left"}>
          {/* <div className={isNewCollection ? "reduce-section" : "b-section-left"}> */}
          <HeadSection title="Collection List" />
          <button onClick={() => {
            setIsNewCollection(true);
            console.log("create collection");
          }} className="create-new">
            <span>Créer nouveau</span>
            {/* <Plus className="plus" /> */}
            <CiCirclePlus />
          </button>
          <CollectionList />
        {
          isNewCollection == true && <DrawerCollection entry={"Create"} onClose={onClose}  onCreateClick={onClose}/>
        }
        </div>
        {/* <div className="b-section-center">
      <div className="b-new-bot">
        <p>newCollection</p>
      </div>
    </div> */}
      </div>
    </>
  );
}
export default Collection;
