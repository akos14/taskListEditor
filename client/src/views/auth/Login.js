import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../state/authSlice";
import { useLoginMutation } from "../../state/feladatOKApiSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    const newErrors = {};

    if (email === "") {
      newErrors.email = "Email megadása kötelező!";
    }
    if (password === "") {
      newErrors.password = "Jelszó megadása kötelező!";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    try {
      const result = await authLogin({
        strategy: "local",
        email: email,
        password: password,
      }).unwrap();
      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
        })
      );
      navigate("/", { replace: true });
    } catch (err) {
      newErrors.email = " ";
      newErrors.password = "Helytelen adatok!";
      setErrors({ ...newErrors });
    }
  };

  const handleChange = (e) => {
    if (errors.password === "Helytelen adatok!") setErrors({});
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1>Bejelentkezés</h1>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <TextField
            variant="standard"
            type="email"
            id="email"
            name="email"
            value={data.email}
            label="Email cím"
            autoFocus
            error={errors.email !== undefined}
            helperText={errors.email}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <TextField
            variant="standard"
            type="password"
            id="password"
            name="password"
            value={data.password}
            label="Jelszó"
            error={errors.password !== undefined}
            helperText={errors.password}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: "20px",
              "&:hover": { background: "darkblue" },
            }}
          >
            Login
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default Login;
