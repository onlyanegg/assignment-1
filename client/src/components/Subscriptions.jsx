import { useSubscriptions } from "../api/useSubscriptions";
import { useRemoveSubscription } from "../api/useRemoveSubscription";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

export const Subscriptions = () => {
  const subscriptionsQuery = useSubscriptions();
  const removeSubscription = useRemoveSubscription();

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {subscriptionsQuery.data?.map((sub) => (
        <Card raised sx={{ width: 200, height: 200 }}>
          <CardContent>
            <Typography variant="h4">{sub.security.ticker}</Typography>
            <Typography>Name: {sub.security.name}</Typography>
            <Typography>Price: {sub.security.last_price}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                removeSubscription.mutate({ ticker: sub.security.ticker });
              }}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
