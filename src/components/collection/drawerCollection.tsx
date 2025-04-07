import React, { useState } from "react"
import { useAppDispatch } from "../../store/store";
import { createCollection, fetchCollection } from "../../store/features/collectionSlice";
import { unwrapResult } from "@reduxjs/toolkit";

interface SidePanelProps {
    entry: string;
    onClose: () => void;
    // onCreateClick: () => void;
}
const DrawerCollection: React.FC<SidePanelProps> = ({ entry, onClose }) => {
    const [inputName, setInputName] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleCreateCollection = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.length > 0) {
            dispatch(createCollection(
                {
                    payload: {
                        collection_name: inputName
                    }
                }))
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                    dispatch(fetchCollection());
                    console.log(originalPromiseResult);

                })
                .catch((error: any) => {
                    console.error("Login error:", error);
                })
                .finally(onClose);
        } else {
            console.error("Veuillez entrer un email et un mot de passe valides.");
        }

    };
    return (

        <div className="dr_content">
            <div className="dr_head-tab">
                <h2 className="text-xl font-bold">{entry}</h2>
                <button
                    onClick={onClose}
                    className="dr_btn-close"
                >
                    X
                </button>
            </div>
            <form onSubmit={handleCreateCollection}>
                <div className="dr_input-name">
                    <input
                        className="nameCollection"
                        type="text"
                        id="name"
                        placeholder="Enter name collection"
                        value={inputName}
                        onChange={(e) => {
                            setInputName(e.target.value);
                            // validateEmail(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="login-button" >
                    {/* {showLoading ? "Connexion..." : "Login"} */}
                    Create collection
                </button>
            </form>
        </div>
    );
}

export default DrawerCollection;