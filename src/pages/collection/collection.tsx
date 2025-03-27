import React from "react";
// import { Plus } from "lucide-react";
// import { CiCirclePlus } from "react-icons/ci";
import { CollectionList } from "../../components/collection/collectionList";
import HeadSection from "../../components/ui/HeadSection";

    const Collection : React.FC = () => {
    return (
        <div className="  ">
          <div className={"b-section-left"}>
            <HeadSection title="Collection List" />
            <button onClick={()=>{console.log("create collection");
            }} className="create-new">
              <span>Créer nouveau</span><br />
              {/* <Plus className="plus" /> */}
              {/* <CiCirclePlus className="plus"/> */}
              +
            </button>
            <CollectionList/>
          </div>
        </div>
      );
}
export default Collection;
