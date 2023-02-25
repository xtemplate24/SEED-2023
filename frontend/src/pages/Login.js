import * as React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [username] = watch(["username"]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Login = (data) => {
    axios
      .post("http://localhost:8000/users/login", data, {
        mode: "cors",
      })
      .then((res) => {
        sessionStorage.setItem("eid", username);
        navigate("/");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error);
        }
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <form onSubmit={handleSubmit(Login)}>
        <h1>Login</h1>
        <div style={{ display: "flex" }}>
          <label>Username:</label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required={true}
              />
            )}
            rules={{
              required: "Username is required",
            }}
          />
        </div>
        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required={true}
                />
              </FormControl>
            )}
            rules={{
              required: "Password is required",
            }}
          />
        </div>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Forget Password?
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Forgot your password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the email you use to sign in and we will send you an email
              with the recovery instructions.
            </DialogContentText>

            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required={true}
                />
              )}
              rules={{
                required: "Username is required",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Send Email</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default Login;
