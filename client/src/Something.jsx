import styled from "@emotion/styled";
import { Securities, Subscriptions } from "./components";
import { Box } from "@mui/material";

export const Something = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        gap: "10",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, overflowY: "scroll" }}>
        <Securities />
      </Box>
      <Box sx={{ display: "flex", flex: 4, overflowY: "scroll" }}>
        <Subscriptions />
      </Box>
    </Box>
  );
};
