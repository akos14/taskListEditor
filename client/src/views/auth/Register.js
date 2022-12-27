import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../state/feladatOKApiSlice";

export const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [authRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password } = data;

    const newErrors = {};

    if (email === "") {
      newErrors.fullname = "Teljes név megadása kötelező!";
    }
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
      await authRegister({
        fullname: fullname,
        email: email,
        password: password,
      }).unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      newErrors.fullname = " ";
      newErrors.email = " ";
      newErrors.password = "Helytelen adatok!";
      setErrors(newErrors);
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
      <h1>Regisztráció</h1>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <TextField
            variant="standard"
            type="text"
            id="fullname"
            name="fullname"
            value={data.fullname}
            label="Teljes név"
            autoFocus
            error={errors.fullname !== undefined}
            helperText={errors.fullname}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <TextField
            variant="standard"
            type="email"
            id="email"
            name="email"
            value={data.email}
            label="E-mail cím"
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
            Regisztráció
          </Button>
        </form>
      </Container>
    </Container>
  );
};
