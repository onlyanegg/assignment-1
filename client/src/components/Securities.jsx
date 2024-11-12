import { Box, Divider, List, TextField } from "@mui/material";
import { useSecurities } from "../api/useSecurities";
import { useSubscriptions } from "../api/useSubscriptions";
import { SecurityListItem } from "./SecurityListItem";
import { useState } from "react";

export const Securities = () => {
  const securitiesQuery = useSecurities();
  const subscriptionsQuery = useSubscriptions();
  const [inputValue, setInputValue] = useState("");

  const matchesSearchQuery = (security) => {
    if (security.name.toLowerCase().includes(inputValue.toLowerCase())) {
      return true;
    }

    if (security.ticker.toLowerCase().includes(inputValue.toLowerCase())) {
      return true;
    }

    return false;
  };

  const isNotSubscribed = (security) => {
    if (
      subscriptionsQuery.data
        ?.map((sub) => sub?.security?.ticker.toLowerCase())
        .includes(security.ticker.toLowerCase())
    ) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <TextField
        placeholder="Search..."
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
      />

      <List>
        {securitiesQuery.data
          ?.filter(matchesSearchQuery)
          .filter(isNotSubscribed)
          .map((security) => (
            <Box key={security.ticker}>
              <SecurityListItem name={security.name} ticker={security.ticker} />
              <Divider />
            </Box>
          ))}
      </List>
    </div>
  );
};
