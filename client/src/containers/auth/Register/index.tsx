import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Logo from "../../../assets/images/logo";
import wallpaper from "../../../assets/wallpaper/auth_wallpaper.jpg";
// * Package
import { cloneDeep } from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// * Components
import Copyright from "../../../components/Copyright/index";
// * Shared
import { checkValidity } from "../../../shared/checkValidity";
// * Store
import { authRegister } from "../../../store/actions/index";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1878f2",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function Register() {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.auth.errorRegister);
  const [controls, setControls] = React.useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "name",
        placeholder: "Full Name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      showPassword: false,
    },
    type: {
      elementType: "input",
      elementConfig: {
        type: "client" || "organization",
      },
      value: "client",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const token =
    useSelector((state: any) => state.auth.token) ||
    localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) return navigate("/");
  }, [token, navigate]);

  const handleClickShowPassword = () => {
    setControls((prevControls) => ({
      ...prevControls,
      password: {
        ...prevControls.password,
        showPassword: !prevControls.password.showPassword,
      },
    }));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const changedInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    elementIdentifer: "email" | "password" | "type" | "name"
  ) => {
    const updatedcontrols = cloneDeep(controls);
    updatedcontrols[
      elementIdentifer
    ].value = (event.target as HTMLInputElement).value;
    updatedcontrols[elementIdentifer].valid = checkValidity(
      (event.target as HTMLInputElement).value,
      controls[elementIdentifer].validation
    );
    updatedcontrols[elementIdentifer].touched = true;
    setControls(updatedcontrols);
  };

  const authEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = controls.name.value;
    const email = controls.email.value;
    const password = controls.password.value;
    const type = controls.type.value;

    if (email && password !== ("" || null || undefined)) {
      const data = {
        name: name,
        email: email,
        password: password,
        type: type,
      };
      dispatch(authRegister(data));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${wallpaper})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
            <Typography
              component="h1"
              sx={{
                fontSize: 50,
                marginTop: "12vh",
                fontWeight: 700,
                marginBottom: 2,
                textAlign: "center",
                lineHeight: 1.1,
              }}
              variant="h5"
            >
              Sign up
            </Typography>
            {error && (
              <Alert style={{ width: "100%" }} severity="error">
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={authEvent}
              sx={{ mt: 1, width: "100%" }}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  autoFocus
                  value={controls.name.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "name")
                  }
                  color={
                    !controls.name.valid && controls.name.touched
                      ? "secondary"
                      : "primary"
                  }
                />
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={controls.email.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "email")
                  }
                  color={
                    !controls.email.valid && controls.email.touched
                      ? "secondary"
                      : "primary"
                  }
                />
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <TextField
                  margin="normal"
                  id="outlined-adornment-password"
                  type={controls.password.showPassword ? "text" : "password"}
                  value={controls.password.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "password")
                  }
                  required
                  fullWidth
                  label="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {controls.password.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ThemeProvider>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ flexGrow: 1 }}
                >
                  Sign up as a/an *
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  sx={{ flexDirection: "row" }}
                  value={controls.type.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changedInputHandler(event, "type")
                  }
                >
                  <FormControlLabel
                    value="client"
                    control={<Radio />}
                    label="client"
                  />
                  <FormControlLabel
                    value="organization"
                    control={<Radio />}
                    label="organization"
                  />
                </RadioGroup>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#1878f2",
                  fontWeight: "700",
                  transition: "all .5s ease",
                  "&:hover": {
                    backgroundColor: "#216FDB",
                  },
                }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Typography
                    sx={{
                      color: "#1d3a5f",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontSize: "14px",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <NavLink
                      style={{
                        color: "inherit",
                        textDecoration: "inherit",
                      }}
                      to="/login"
                    >
                      {"Already have an account? Log in"}
                    </NavLink>
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
