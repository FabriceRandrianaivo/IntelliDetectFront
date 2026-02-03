import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { Sensors as SensorsIcon } from "@mui/icons-material";
import { useAppSelector } from "../../store/store";
import Cookies from "js-cookie";

const Detection: React.FC = () => {
  const token = Cookies.get("user");
  const API_BASE_URL =
    import.meta.env.VITE_API_SERVER_URL || "http://localhost:8000";
  const itemsIp = useAppSelector((state) => state.ip.items);
  const indexCollectionActive = useAppSelector(
    (state) => state.collection.activeIndex,
  );
  const collectionItems = useAppSelector((state) => state.collection.items);
  const collectionActive = collectionItems[indexCollectionActive || 0];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, width: "100%" }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h1"
          className="neon-text-blue"
          sx={{ fontSize: "2.5rem", fontWeight: 900 }}
        >
          [ SURVEILLANCE_MULTI_CIBLES ]
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", opacity: 0.7, fontFamily: "monospace" }}
        >
          // MATRICE_ACTIVE :{" "}
          {collectionActive?.collection_name?.toUpperCase() || "SYS_DEFAULT"}
        </Typography>
      </Box>

      {itemsIp.length === 0 ? (
        <Paper className="futuristic-card" sx={{ p: 10, textAlign: "center" }}>
          <SensorsIcon
            sx={{ fontSize: 80, color: "primary.main", mb: 3, opacity: 0.3 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
            [ SIGNAL_NON_DÉTECTÉ ]
          </Typography>
          <Typography color="text.secondary">
            COMMENCEZ PAR ENREGISTRER DES TERMINAUX DANS CETTE COLLECTION.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {itemsIp.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
              <Card
                className="futuristic-card"
                sx={{
                  borderRadius: 2,
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(0, 229, 255, 0.2)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={`${API_BASE_URL}/stream/from-ip/${encodeURIComponent(item.ip_address)}/?bearer=${token}`}
                    alt={`Camera ${item.ip_address}`}
                    sx={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      background: "#000",
                      filter: "brightness(0.8) contrast(1.2)",
                    }}
                  />

                  {/* Digital HUD Element */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: "1px solid rgba(0, 229, 255, 0.1)",
                      pointerEvents: "none",
                    }}
                  />

                  <Chip
                    size="small"
                    className="glow-active"
                    label="LIVE_FEED"
                    sx={{
                      position: "absolute",
                      top: 15,
                      left: 15,
                      bgcolor: "rgba(255, 64, 129, 0.8)",
                      color: "white",
                      fontWeight: 900,
                      fontSize: "0.7rem",
                      fontFamily: "monospace",
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 15,
                      color: "primary.main",
                      bgcolor: "rgba(0,0,0,0.6)",
                      px: 1,
                      borderRadius: 0.5,
                      fontFamily: "monospace",
                    }}
                  >
                    NODE_{index + 1}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 2, background: "rgba(0,0,0,0.4)" }}>
                  <Typography
                    variant="subtitle1"
                    className="neon-text-blue"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      fontWeight: 700,
                    }}
                  >
                    <SensorsIcon fontSize="small" /> {item.ip_address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Detection;
