import { TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="Username" variant="outlined" />

      <TextField id="outlined-basic" label="Password" variant="outlined" />

      <Button variant="contained">Hello World</Button>
    </div>
  );
};

export default Login;
