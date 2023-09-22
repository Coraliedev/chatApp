import React from "react";
import {
  Container,
  Stack,
} from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";



const Register: React.FC = () => {

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
    <RegisterForm />
    </>
  );
};

export default Register;
