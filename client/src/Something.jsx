import styled from "@emotion/styled";
import { Securities, Subscriptions } from "./components";
import { Box } from "@mui/material";

export const Something = () => {
  return (
    <Box sx={{ display: "flex", flex: 1, flexDirection: "row", gap: "10" }}>
      <Box sx={{ display: "flex", flex: 1 }}>
        <Securities />
      </Box>
      <Box sx={{ display: "flex", flex: 4 }}>
        <Subscriptions />
      </Box>
    </Box>
  );
};
