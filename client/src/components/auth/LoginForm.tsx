import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginValuesModel from "../../models/LoginValuesModel";
import React from "react";

const LoginForm: React.FC = () => {

  const getUser = () => {
    fetch("http://localhost:3000/api/users/users", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      }
    }
    ).then((res) => res.json()).then((data) => {
      console.log(data);
    })
  }


  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values: LoginValuesModel) {
    console.log("Form data", values);
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }).then(() => {
        // rediriger à la page d'accueil
        window.location.href = "/"
      })
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </form>
        <button onClick={getUser}>getUserrs</button>
      </Box>
    </Container>
  )
}

export default LoginForm