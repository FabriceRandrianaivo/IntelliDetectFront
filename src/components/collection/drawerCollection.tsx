import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import {
  createCollection,
  fetchCollection,
} from "../../store/features/collectionSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon, AddCircle as AddIcon } from "@mui/icons-material";

interface SidePanelProps {
  entry: string;
  onClose: () => void;
}

const DrawerCollection: React.FC<SidePanelProps> = ({ entry, onClose }) => {
  const [inputName, setInputName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim().length > 0) {
      setLoading(true);
      dispatch(
        createCollection({
          payload: {
            collection_name: inputName,
          },
        }),
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(fetchCollection());
          onClose();
        })
        .catch((error: any) => {
          console.error("Create collection error:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          background: "rgba(10, 25, 41, 0.95)",
          backdropFilter: "blur(10px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          p: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h2" color="primary">
          {entry}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <form onSubmit={handleCreateCollection}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Nom de la collection"
            variant="outlined"
            placeholder="Ex: Entrepôt Nord"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            autoFocus
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !inputName.trim()}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <AddIcon />
              )
            }
            sx={{ py: 1.5 }}
          >
            {loading ? "Création..." : "Créer la collection"}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            Annuler
          </Button>
        </Box>
      </form>
    </Drawer>
  );
};

export default DrawerCollection;
