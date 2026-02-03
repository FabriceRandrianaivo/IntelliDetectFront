import { IpListAddress } from "../../components/ip-list/ip-list-address";
import { useAppSelector } from "../../store/store";
import { Box, Typography } from "@mui/material";

const Ip_list: React.FC = () => {
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
          [ RÉSEAU_TERMINAUX ]
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", opacity: 0.7, fontFamily: "monospace" }}
        >
          // FLUX_ACTIFS :{" "}
          {collectionActive?.collection_name?.toUpperCase() || "INCONNU"}
        </Typography>
      </Box>

      <IpListAddress />
    </Box>
  );
};
export default Ip_list;
