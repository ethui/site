"use client";

import Image from "next/image";
import { AbiForm, type AbiFunction, Debug } from "@ethui/form";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

function App() {
  const [item, setItem] = useState<string>(
    "function transfer(string[] amount)",
  );

  const [parsedItem, setParsedItem] = useState<AbiFunction | undefined>();
  const [value, setValue] = useState<bigint | undefined>();
  const [data, setData] = useState<`0x${string}` | undefined>();
  const [args, setArgs] = useState<any[] | undefined>();

  const onChange = useCallback(
    ({
      item,
      value,
      data,
      args,
    }: {
      item?: AbiFunction;
      value?: bigint;
      data?: `0x${string}`;
      args?: any[];
    }) => {
      setParsedItem(item);
      setArgs(args);
      setData(data);
      setValue(value);
    },
    [],
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
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <AbiForm abiItem={item} debug={false} onChange={onChange} />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Paper sx={{ width: "100%", height: "100%" }}>
                      <Stack spacing={1} sx={{ p: 2 }}>
                        {parsedItem &&
                          args &&
                          parsedItem.inputs.map((input, i) => (
                            <div key={i}>
                              <Typography fontWeight="bold">
                                {input.name || i.toString()}:
                              </Typography>
                              <Debug value={args[i]} />
                            </div>
                          ))}
                        <Typography fontWeight="bold">calldata:</Typography>
                        <Typography
                          fontFamily="monospace"
                          sx={{ overflowWrap: "break-word" }}
                        >
                          {data}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
