import { TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const SignUp = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const signUp = (data) => {
    console.log(data);
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
      <form onSubmit={handleSubmit(signUp)}>
        <h1>Sign up</h1>
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
              <TextField
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required={true}
                type="password"
              />
            )}
            rules={{
              required: "Password is required",
            }}
          />
        </div>
        <div>
          <label>First Name:</label>
          <Controller
            name="firstName"
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
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "First name should contain only alphabets",
              },
              required: "First name is required",
            }}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <Controller
            name="lastName"
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
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Last name should contain only alphabets",
              },
              required: "Last name is required",
            }}
          />
        </div>
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
