import React from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "../../store/store";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  Videocam as VideocamIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  NotificationsActive as AlertIcon,
  Sensors as SensorsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
  <Card
    sx={{
      height: "100%",
      background: "rgba(16, 32, 48, 0.7)",
      backdropFilter: "blur(10px)",
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: `${color}20`,
            color: color,
            mr: 2,
            display: "flex",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="700">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const collectionItems = useAppSelector((state) => state.collection.items);
  const itemsIp = useAppSelector((state) => state.ip.items);

  return (
    <Box sx={{ minHeight: "100%", width: "100%", p: { xs: 2, md: 5 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h1"
          className="neon-text-blue"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "3.5rem" },
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 2,
            mb: 1,
          }}
        >
          [ CENTRE_DE_COMMANDEMENT ]
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "primary.main", opacity: 0.8, fontFamily: "monospace" }}
        >
          // ACCÈS AUTORISÉ :{" "}
          {(Cookies.get("userDetail")
            ? JSON.parse(Cookies.get("userDetail")!)?.username?.toUpperCase()
            : null) || "UTILISATEUR_INCONNU"}{" "}
          // SYSTÈME OPÉRATIONNEL
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="SÉQUENCES"
            value={collectionItems.length}
            icon={<HistoryIcon />}
            color="#ff4081"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="POINTS_FLUX"
            value={itemsIp.length}
            icon={<VideocamIcon />}
            color="#00e5ff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="RÉSEAU"
            value={itemsIp.length}
            icon={<SensorsIcon />}
            color="#00e5ff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="PRECISION_IA"
            value="98.2%"
            icon={<TrendingUpIcon />}
            color="#00e5ff"
          />
        </Grid>

        {/* Action Section */}
        <Grid item xs={12} lg={8}>
          <Paper className="futuristic-card" sx={{ p: 4 }}>
            <Typography
              variant="h3"
              className="neon-text-pink"
              sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}
            >
              <AlertIcon /> JOURNAL_D'ACTIVITÉ
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0, 229, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "0.2s",
                    "&:hover": {
                      background: "rgba(0, 229, 255, 0.05)",
                      transform: "translateX(10px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "#ff4081",
                        mr: 3,
                        boxShadow: "0 0 10px #ff4081",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="700"
                        sx={{ color: "white" }}
                      >
                        DÉTECTION_ANORMALE SUR FLUX_0{item}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                          opacity: 0.6,
                          fontFamily: "monospace",
                        }}
                      >
                        T+ 00:{item * 5}:00 // ANALYSE EN COURS
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="text"
                    sx={{ color: "primary.main", fontWeight: 800 }}
                  >
                    EXAMINER →
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} lg={4}>
          <Paper className="futuristic-card" sx={{ p: 4, height: "100%" }}>
            <Typography variant="h3" className="neon-text-blue" sx={{ mb: 4 }}>
              PROTOCOLES_ACCÈS
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<VideocamIcon />}
                fullWidth
                href="/stream"
                className="glow-active"
                sx={{
                  py: 2,
                  background: "linear-gradient(45deg, #00e5ff, #00b0ff)",
                  color: "#000",
                  fontWeight: 900,
                }}
              >
                LANCER_DÉTECTION_LIVE
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<HistoryIcon />}
                fullWidth
                href="/collection"
                sx={{
                  py: 2,
                  borderColor: "primary.main",
                  color: "primary.main",
                }}
              >
                ACCÉDER_AUX_ARCHIVES
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SettingsIcon />}
                fullWidth
                sx={{
                  py: 2,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "text.secondary",
                }}
              >
                PARAMS_SYSTÈME
              </Button>
            </Box>

            <Box
              sx={{
                mt: 6,
                p: 3,
                borderRadius: 2,
                background: "rgba(0,0,0,0.3)",
                border: "1px dashed rgba(0,229,255,0.2)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  display: "block",
                  mb: 1,
                  fontFamily: "monospace",
                }}
              >
                STATUT_SÉCURITÉ
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                CRYPTAGE_AES_256 : ACTIF
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
