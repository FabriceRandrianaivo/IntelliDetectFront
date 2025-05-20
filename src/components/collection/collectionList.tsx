import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteCollection, setActiveCollection } from "../../store/features/collectionSlice";
import { useNavigate } from "react-router-dom";

export function CollectionList() {
  const collectionList = useAppSelector((state) => state.collection.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDeleteCollection = (collectionId: string) => {
    dispatch(deleteCollection(collectionId))
      .then()
      .catch((e: any) => {
        console.error("une erreur est suvenue lors de la suppression :" + e);
      });
  }
  return (
    <>
      <div className="b_list" >
        {
          collectionList.map((collection, key) => (
            <div className="b_card-list" key={key}
              onClick={(e) => {
                e.detail === 1 ? dispatch(setActiveCollection(collection.collection_name)) 
                : 
                dispatch(setActiveCollection(collection.collection_name))
                navigate("/ip-list");
              }
              }>
              <div className="b_head-card">
                <h2>{collection.collection_name}</h2>
                {/* <CircleX /> */}
              </div>
              <div className="b_content-list">
                {/* <div className="b_api-key">
                    <p>453sadvc;lqr3***</p>
                    <p className="b_copy">
                      <span>Copy</span>
                      <Copy />
                    </p>
                  </div> */}
                <div className="b_action-list">
                  <div className="b_left">
                    <p>Modifier</p>
                    <small>Créer le {collection.created_at}</small>
                  </div>
                  <div className="b_right">
                    <p onClick={() => handleDeleteCollection(collection.id)}>Revoquer</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
