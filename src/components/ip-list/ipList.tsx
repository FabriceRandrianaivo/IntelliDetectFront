import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteIp, fetchIP, setActiveIps } from "../../store/features/ipsSlice";
import { useNavigate } from "react-router-dom";
import { fetchCollection } from "../../store/features/collectionSlice";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Chip,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Sensors as SensorsIcon,
  PlayArrow as PlayIcon,
} from "@mui/icons-material";

export function IpList() {
  const token = Cookies.get("user");
  const API_BASE_URL =
    import.meta.env.VITE_API_SERVER_URL || "http://localhost:8000";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeIndexCollection = useAppSelector(
    (state) => state.collection.activeIndex,
  );
  const collectionItems = useAppSelector((state) => state.collection.items);
  const IpListItems = useAppSelector((state) => state.ip.items);

  const collectionActive = collectionItems[activeIndexCollection || 0];

  useEffect(() => {
    if (collectionItems.length === 0) {
      dispatch(fetchCollection());
    }
  }, []);

  useEffect(() => {
    if (collectionActive?.id) {
      dispatch(fetchIP(collectionActive.id));
    }
  }, [collectionActive?.id, dispatch]);

  const handleSelectIp = (ipAddress: string) => {
    dispatch(setActiveIps(ipAddress));
    navigate("/stream");
  };

  const handleDeleteIp = (e: React.MouseEvent, ipId: string) => {
    e.stopPropagation();
    if (collectionActive) {
      dispatch(
        deleteIp({ collection_id: collectionActive.id, ip_id: ipId }),
      ).then(() => dispatch(fetchIP(collectionActive.id)));
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {IpListItems.length === 0 ? (
        <Paper className="futuristic-card" sx={{ p: 8, textAlign: "center" }}>
          <SensorsIcon
            sx={{ fontSize: 64, color: "primary.main", mb: 2, opacity: 0.5 }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ opacity: 0.7, fontFamily: "monospace" }}
          >
            [ ALERTE : AUCUNE SOURCE DÉTECTÉE ]
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {IpListItems.map((ip, index) => (
            <Grid item xs={12} sm={6} md={4} key={ip.id}>
              <Card
                className="futuristic-card"
                sx={{
                  overflow: "hidden",
                  cursor: "pointer",
                  borderWidth: "2px !important",
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 0 30px rgba(0, 229, 255, 0.3)",
                    ".stream-overlay": { opacity: 1 },
                  },
                }}
                onClick={() => handleSelectIp(ip.ip_address)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={`${API_BASE_URL}/stream/from-ip/${ip.ip_address}/?bearer=${token}`}
                    alt={`Caméra ${index + 1}`}
                    sx={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      background: "#000",
                      filter: "contrast(1.1) brightness(0.9)",
                    }}
                  />

                  {/* Futuristic Overlays */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: "none",
                      border: "1px solid rgba(0, 229, 255, 0.1)",
                    }}
                  />

                  <Box
                    className="stream-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "0.3s",
                    }}
                  >
                    <PlayIcon
                      sx={{
                        fontSize: 60,
                        color: "primary.main",
                        filter: "drop-shadow(0 0 10px #00e5ff)",
                      }}
                    />
                  </Box>

                  <Chip
                    size="small"
                    className="glow-active"
                    label="LIVE"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "rgba(255, 64, 129, 0.8)",
                      color: "white",
                      fontWeight: 900,
                      fontSize: "0.65rem",
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 12,
                      color: "primary.main",
                      fontFamily: "monospace",
                      bgcolor: "rgba(0,0,0,0.6)",
                      px: 1,
                      borderRadius: 0.5,
                    }}
                  >
                    CH_{index + 1}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 2, bgcolor: "rgba(10, 25, 41, 0.8)" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        className="neon-text-blue"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 700,
                        }}
                      >
                        <SensorsIcon fontSize="small" /> {ip.ip_address}
                      </Typography>
                    </Box>
                    <Tooltip title="RÉVOQUER">
                      <IconButton
                        size="small"
                        sx={{
                          color: "secondary.main",
                          "&:hover": { color: "#ff1744" },
                        }}
                        onClick={(e) => handleDeleteIp(e, ip.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
