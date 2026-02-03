import React, { useState } from "react";
import { IpList } from "./ipList";
import { useAppDispatch, useAppSelector, RootState } from "../../store/store";
import { createIp, fetchIP } from "../../store/features/ipsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Language as LanguageIcon,
  Sensors as SensorsIcon,
} from "@mui/icons-material";

export function IpListAddress() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const collectionIndex = useAppSelector(
    (state: RootState) => state.collection.activeIndex,
  );
  const collectionItems = useAppSelector(
    (state: RootState) => state.collection.items,
  );
  const collectionActive = collectionItems[collectionIndex || 0];

  const handleCreateIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionActive) return;

    if (inputUrl.trim().length > 0) {
      setLoading(true);
      const credential = {
        payload: {
          collection_id: collectionActive.id,
        },
        ips: inputUrl.trim(),
      };

      dispatch(createIp(credential))
        .then(unwrapResult)
        .then(() => {
          dispatch(fetchIP(collectionActive.id));
          setInputUrl("");
        })
        .catch((error: any) => {
          console.error("Create IP error:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        className="futuristic-card"
        sx={{
          p: 4,
          mb: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100px",
            height: "100px",
            background:
              "linear-gradient(135deg, transparent 50%, rgba(0, 229, 255, 0.1) 50%)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            className="neon-text-blue"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <AddIcon color="primary" sx={{ fontSize: 32 }} /> [
            ENREGISTREMENT_APPAREIL ]
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              mb: 4,
              fontFamily: "monospace",
              opacity: 0.8,
            }}
          >
            // INITIALISATION DU PROTOCOLE DE CONNEXION MULTI-PROTOCOLE
            (IP/URL)...
          </Typography>

          <form onSubmit={handleCreateIp}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="ADRESSE_IP ou URL_PUBLIQUE (ex: 192.168.1.50 ou https://...) "
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(0,0,0,0.3)",
                    fontFamily: "monospace",
                    "& fieldset": { borderColor: "rgba(0, 229, 255, 0.3)" },
                    "&:hover fieldset": { borderColor: "primary.main" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon
                        sx={{ color: "primary.main", opacity: 0.6 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateIp}
                disabled={loading || !inputUrl.trim()}
                className={!loading && inputUrl.trim() ? "glow-active" : ""}
                sx={{
                  minWidth: 180,
                  height: 56,
                  background: "linear-gradient(45deg, #00e5ff, #00b0ff)",
                  color: "#000",
                  fontWeight: 900,
                  letterSpacing: 2,
                  "&:hover": {
                    background: "#00e5ff",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {loading ? "CHARGEMENT..." : "DÉPLOYER"}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>

      <Typography
        variant="h3"
        className="neon-text-pink"
        sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}
      >
        <SensorsIcon color="secondary" /> TERMINAUX_ACTIFS
      </Typography>
      <IpList />
    </Box>
  );
}
