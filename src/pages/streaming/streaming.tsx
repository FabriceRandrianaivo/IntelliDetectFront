import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "../../store/store";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Videocam as VideocamIcon,
  Search as SearchIcon,
  Sensors as SensorsIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

const Streaming: React.FC = () => {
  const token = Cookies.get("user");
  const API_BASE_URL =
    import.meta.env.VITE_API_SERVER_URL || "http://localhost:8000";

  const itemsIp = useAppSelector((state) => state.ip.items);
  const activeIpIndex = useAppSelector((state) => state.ip.activeIpIndex);

  const [selectedIp, setSelectedIp] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [searchTarget, setSearchTarget] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (itemsIp.length > 0) {
      const initialIp = itemsIp[activeIpIndex || 0]?.ip_address;
      setSelectedIp(initialIp || "");
    }
  }, [itemsIp, activeIpIndex]);

  const handleSearch = () => {
    setTarget(searchTarget);
  };

  const getStreamUrl = () => {
    if (!selectedIp) return "";
    const base = `${API_BASE_URL}/stream`;
    if (target) {
      return `${base}/detect-object/${selectedIp}/${target}/?bearer=${token}`;
    }
    return `${base}/from-ip/${selectedIp}/?bearer=${token}`;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, width: "100%" }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h1"
          className="neon-text-blue"
          sx={{ fontSize: "2.5rem", fontWeight: 900 }}
        >
          [ UNITÉ_VIGILANCE_LIVE ]
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", opacity: 0.7, fontFamily: "monospace" }}
        >
          // PROTOCOLE_ANALYSE_AI_GÉNÉRATIVE_V8
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Main Stream Section */}
        <Grid item xs={12} lg={8.5}>
          <Paper
            className="futuristic-card"
            sx={{
              p: 1,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
            }}
          >
            {selectedIp ? (
              <img
                key={`${selectedIp}-${target}`}
                className="flux-video"
                src={getStreamUrl()}
                alt="Flux vidéo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <Box sx={{ textAlign: "center", p: 4, opacity: 0.4 }}>
                <VideocamIcon sx={{ fontSize: 120, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  [ ATTENTE_SIGNAL ]
                </Typography>
                <Typography color="text.secondary">
                  SÉLECTIONNEZ UNE SOURCE POUR INITIALISER LA DÉTECTION
                </Typography>
              </Box>
            )}

            {isLoading && selectedIp && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress color="primary" thickness={2} size={60} />
              </Box>
            )}

            <Box
              sx={{
                position: "absolute",
                top: 24,
                left: 24,
                display: "flex",
                gap: 2,
              }}
            >
              <Chip
                className="glow-active"
                label={selectedIp || "SYSTÈME_HORS_LIGNE"}
                sx={{
                  background: "rgba(0,0,0,0.7)",
                  color: selectedIp ? "#00e5ff" : "#ff4081",
                  border: `1px solid ${selectedIp ? "#00e5ff" : "#ff4081"}`,
                  fontWeight: 900,
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                }}
                icon={<SensorsIcon sx={{ color: "inherit !important" }} />}
              />
              {target && (
                <Chip
                  label={`DETECTION_CIBLE: ${target.toUpperCase()}`}
                  onDelete={() => {
                    setTarget("");
                    setSearchTarget("");
                  }}
                  sx={{
                    background: "rgba(0,0,0,0.7)",
                    color: "#ff4081",
                    border: "1px solid #ff4081",
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                  }}
                />
              )}
            </Box>

            {/* HUD Overlay Decor */}
            <Box
              sx={{
                position: "absolute",
                bottom: 24,
                right: 24,
                pointerEvents: "none",
                opacity: 0.6,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  fontFamily: "monospace",
                  display: "block",
                  textAlign: "right",
                }}
              >
                X: 192.839 | Y: 43.201
                <br />
                FRAME_BUF: 240FPS
                <br />
                LATENCY: 12ms
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Controls Section */}
        <Grid item xs={12} lg={3.5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Camera Selection */}
            <Paper className="futuristic-card" sx={{ p: 4 }}>
              <Typography
                variant="h3"
                className="neon-text-blue"
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <VideocamIcon /> SOURCES_IP
              </Typography>
              <TextField
                select
                fullWidth
                value={selectedIp}
                onChange={(e) => setSelectedIp(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(0,0,0,0.3)",
                    "& fieldset": { borderColor: "rgba(0,229,255,0.2)" },
                  },
                }}
              >
                {itemsIp.map((item) => (
                  <MenuItem key={item.id} value={item.ip_address}>
                    {item.ip_address}
                  </MenuItem>
                ))}
                {itemsIp.length === 0 && (
                  <MenuItem disabled>AUCUN TERMINAL RÉPERTORIÉ</MenuItem>
                )}
              </TextField>
            </Paper>

            {/* AI Search */}
            <Paper className="futuristic-card" sx={{ p: 4 }}>
              <Typography
                variant="h3"
                className="neon-text-pink"
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <SearchIcon /> RECHERCHE_IA
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="EX: PERSON, CAR..."
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(0,0,0,0.3)",
                      fontFamily: "monospace",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  className="glow-active"
                  sx={{
                    minWidth: 64,
                    background: "linear-gradient(45deg, #ff4081, #f50057)",
                    borderRadius: 2,
                  }}
                >
                  <SearchIcon />
                </Button>
              </Box>
            </Paper>

            <Paper className="futuristic-card" sx={{ p: 4 }}>
              <Typography
                variant="h3"
                className="neon-text-blue"
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <AssessmentIcon /> DATA_CORE
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "rgba(0,0,0,0.3)",
                  borderLeft: "3px solid #00e5ff",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "monospace", color: "primary.main" }}
                >
                  // PROTOCOLE: YOLO_NEURAL_V8
                  <br />
                  // STATUT: ANALYSE_TEMPS_RÉEL
                  <br />
                  // CONFIANCE: 98.4%
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Streaming;
