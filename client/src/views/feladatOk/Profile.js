import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../../state/authSlice";
import { useGetTaskListsNumberQuery } from "../../state/feladatOKApiSlice";
import { dropWipTaskList } from "../../state/taskListSlice";

export const Profile = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetTaskListsNumberQuery();

  return (
    <Container>
      <h1>Profil</h1>
      <Container>
        <TextField
          id="outlined"
          sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
          label="Név:"
          value={user.fullname}
        ></TextField>
        <br />
        <TextField
          id="outlined"
          sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
          label="Email cím:"
          value={user.email}
        ></TextField>
        <br />
        <TextField
          id="outlined"
          sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
          label="Feladatsorok száma:"
          value={isLoading ? "Loading..." : data}
        ></TextField>
        <br />
        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: "50px 0px 0px 0px",
            backgroundColor: "red",
            "&:hover": { background: "darkred" },
          }}
          onClick={() => {
            dispatch(logout());
            dispatch(dropWipTaskList());
          }}
        >
          Kijelentkezés
        </Button>
      </Container>
    </Container>
  );
};
