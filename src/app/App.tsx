import React from "react";
import "../css/app.css";

import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { RippleBadge } from "./material/MaterialTheme/styled";

function App() {
  return (
    <Container sx={({background:"orange"})}>
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on Typescript with REDUX
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}> <Button variant="contained">Contained</Button></RippleBadge>
        </Box>
       
      </Stack>
    </Container>
  );
}

export default App;