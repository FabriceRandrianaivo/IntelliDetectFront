import React from "react";
import {
  Box,
  Container,
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
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #00e5ff 30%, #ff4081 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Tableau de Bord
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenue sur IntelliDetect. Voici un aperçu de votre système de
          surveillance intelligent.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Caméras Actives"
            value="12"
            icon={<VideocamIcon />}
            color="#00e5ff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Detections (24h)"
            value="156"
            icon={<AlertIcon />}
            color="#ff4081"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Flux Réseau"
            value="450 Mbps"
            icon={<SensorsIcon />}
            color="#00e5ff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Précision Moy."
            value="98.2%"
            icon={<TrendingUpIcon />}
            color="#00e5ff"
          />
        </Grid>

        {/* Action Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, background: "rgba(16, 32, 48, 0.5)" }}>
            <Typography variant="h3" gutterBottom>
              Dernières Activités
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AlertIcon sx={{ color: "#ff4081", mr: 2 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="600">
                        Intrusion détectée sur Caméra 04
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Il y a 10 minutes
                      </Typography>
                    </Box>
                  </Box>
                  <Button size="small" variant="outlined">
                    Détails
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, background: "rgba(16, 32, 48, 0.5)", height: "100%" }}
          >
            <Typography variant="h3" gutterBottom>
              Raccourcis
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Button
                variant="contained"
                startIcon={<VideocamIcon />}
                fullWidth
                href="/stream"
              >
                Lancer le Direct
              </Button>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                fullWidth
                href="/collection"
              >
                Historique des Captures
              </Button>
              <Button variant="outlined" startIcon={<SettingsIcon />} fullWidth>
                Configuration Système
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
