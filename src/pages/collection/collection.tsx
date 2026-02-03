import React, { useEffect, useState } from "react";
import { CollectionList } from "../../components/collection/collectionList";
import { fetchCollection } from "../../store/features/collectionSlice";
import { useAppDispatch } from "../../store/store";
import DrawerCollection from "../../components/collection/drawerCollection";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const Collection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewCollection, setIsNewCollection] = useState<boolean>(false);
  const onClose = () => {
    setIsNewCollection(false);
  };
  const handleGetCollection = async () => {
    try {
      await dispatch(fetchCollection());
    } catch (e) {
      console.error("une erreur est suvenue :" + e);
    }
  };
  useEffect(() => {
    handleGetCollection();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            className="neon-text-blue"
            sx={{ fontSize: "2.5rem", fontWeight: 900 }}
          >
            [ GESTION_DES_COLLECTIONS ]
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              opacity: 0.7,
              fontFamily: "monospace",
            }}
          >
            // RÉPERTOIRE_SÉQUENCES_DÉTECTION
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsNewCollection(true)}
          className="glow-active"
          sx={{
            background: "linear-gradient(45deg, #ff4081, #f50057)",
            color: "white",
            fontWeight: 800,
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          CRÉER_NOUVELLE
        </Button>
      </Box>

      <CollectionList />

      {isNewCollection && (
        <DrawerCollection entry={"Create"} onClose={onClose} />
      )}
    </Box>
  );
};
export default Collection;
