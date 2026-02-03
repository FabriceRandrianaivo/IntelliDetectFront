import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteCollection,
  setActiveCollection,
} from "../../store/features/collectionSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Folder as FolderIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

export function CollectionList() {
  const collectionList = useAppSelector((state) => state.collection.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteCollection = (
    e: React.MouseEvent,
    collectionId: string,
  ) => {
    e.stopPropagation();
    dispatch(deleteCollection(collectionId)).catch((e: any) => {
      console.error("Erreur lors de la suppression :", e);
    });
  };

  const handleSelectCollection = (collectionName: string) => {
    dispatch(setActiveCollection(collectionName));
    navigate("/ip-list");
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {collectionList.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              sx={{ py: 6, opacity: 0.5 }}
            >
              [ SYSTÈME VIDE ] <br /> AUCUNE COLLECTION DÉTECTÉE
            </Typography>
          </Grid>
        ) : (
          collectionList.map((collection) => (
            <Grid item xs={12} sm={6} md={4} key={collection.id}>
              <Card
                className="futuristic-card"
                sx={{
                  height: "100%",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 10px 30px rgba(0, 229, 255, 0.2)",
                    borderColor: "primary.main",
                  },
                }}
                onClick={() =>
                  handleSelectCollection(collection.collection_name)
                }
              >
                {/* Decorative Cyber Line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background:
                      "linear-gradient(to bottom, #00e5ff, transparent)",
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        background: "rgba(0, 229, 255, 0.1)",
                        border: "1px solid rgba(0, 229, 255, 0.3)",
                        color: "primary.main",
                        display: "flex",
                        boxShadow: "0 0 10px rgba(0, 229, 255, 0.2)",
                      }}
                    >
                      <FolderIcon />
                    </Box>
                    <Box>
                      <Typography
                        variant="h3"
                        className="neon-text-blue"
                        sx={{ fontSize: "1.25rem" }}
                      >
                        {collection.collection_name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "primary.main",
                          opacity: 0.7,
                          fontFamily: "monospace",
                        }}
                      >
                        ID_{collection.id.substring(0, 8)}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.05)" }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        INITIALISÉ LE
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontFamily: "monospace" }}
                      >
                        {collection.created_at
                          ? new Date(collection.created_at).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="ACCÉDER">
                        <IconButton
                          size="small"
                          sx={{
                            color: "primary.main",
                            "&:hover": { background: "rgba(0, 229, 255, 0.1)" },
                          }}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="SUPPRIMER">
                        <IconButton
                          size="small"
                          sx={{
                            color: "secondary.main",
                            "&:hover": {
                              background: "rgba(255, 64, 129, 0.1)",
                            },
                          }}
                          onClick={(e) =>
                            handleDeleteCollection(e, collection.id)
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
