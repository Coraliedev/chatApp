import React from "react";

import {
  Stack,
  Container,
} from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";



const Login: React.FC = () => {


  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 120, width: 120 }} src="/logo.png" alt="Logo" />
          </Stack>
        </Stack>
      </Container>
      <LoginForm />
    </>
  );
};

export default Login;
