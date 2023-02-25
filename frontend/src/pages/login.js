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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const Login = (data) => {
    console.log(data);
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
    </Box>
  );
};

export default Login;
