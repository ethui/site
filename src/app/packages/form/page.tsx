"use client";

import Image from "next/image";
import { AbiForm } from "@ethui/form";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function App() {
  const [item, setItem] = useState<string>(
    "function transfer(uint256[] amount)",
  );

  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignSelf="center"
        sx={{ height: "100%", mt: 5 }}
      >
        <Grid item xs={12}>
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Image
                src="https://github.com/ethui/.github/blob/main/logo/symbol-black.png?raw=true"
                alt="logo"
                width={50}
                height={50}
              />
              <Typography component="h1" variant="h4">
                @ethui/form
              </Typography>
            </Stack>
            <Paper sx={{ p: 4 }} elevation={3}>
              <TextField
                label="ABI Item"
                fullWidth
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <Box sx={{ mt: 2 }}>
                <AbiForm abiItem={item} debug={false} preview={true} />
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
