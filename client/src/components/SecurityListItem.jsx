import { ListItemButton, Typography } from "@mui/material";
import { useCreateSubscription } from "../api/useCreateSubscription";

export const SecurityListItem = ({ name, ticker }) => {
  const createSubscription = useCreateSubscription();

  return (
    <ListItemButton
      r
      onClick={() => {
        createSubscription.mutate({ ticker });
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>
        {ticker}:<Typography>{name}</Typography>
      </Typography>
    </ListItemButton>
  );
};
