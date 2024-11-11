import { Box, Divider, List, TextField } from "@mui/material";
import { useSecurities } from "../api/useSecurities";
import { SecurityListItem } from "./SecurityListItem";
import { useState } from "react";

export const Securities = () => {
  const securitiesQuery = useSecurities();
  const [inputValue, setInputValue] = useState("");

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
          ?.filter((security) => {
            if (
              security.name.toLowerCase().includes(inputValue.toLowerCase())
            ) {
              return true;
            }

            if (
              security.ticker.toLowerCase().includes(inputValue.toLowerCase())
            ) {
              return true;
            }

            return false;
          })
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
