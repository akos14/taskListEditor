import { Button, Divider, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  newTaskList,
  selectWipTaskList,
  setWipTaskList,
} from "../../state/taskListSlice";

export const TaskListData = ({ tasklist }) => {
  const wipTaskList = useSelector(selectWipTaskList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let points = 0;
  tasklist.tasks.forEach((task) => (points += task.points));

  const handleClick = () => {
    if (!wipTaskList) {
      dispatch(newTaskList());
      dispatch(setWipTaskList({ taskList: tasklist }));
      navigate("/wiptasklist");
    }
  };

  return (
    <Container>
      <h2>Adatok</h2>
      <TextField
        id="outlined"
        sx={{ pointerEvents: "none", width: "47.5%" }}
        label="Feladatsor címe"
        value={tasklist.title}
      ></TextField>
      <TextField
        id="outlined"
        sx={{ pointerEvents: "none", marginLeft: "5%", width: "47.5%" }}
        label="Státusz"
        value={tasklist.status}
      ></TextField>
      <br />
      <TextField
        id="outlined-multiline-flexible"
        multiline
        sx={{ pointerEvents: "none", marginTop: "20px", width: "100%" }}
        label="Leírás"
        value={tasklist.description}
      ></TextField>
      <br />
      <TextField
        id="outlined"
        sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
        label="Létrehozva:"
        value={new Date(tasklist.createdAt).toLocaleDateString("hu-HU", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      ></TextField>
      <TextField
        id="outlined"
        sx={{
          pointerEvents: "none",
          marginTop: "20px",
          marginLeft: "5%",
          width: "47.5%",
        }}
        label="Módosítva:"
        value={new Date(tasklist.updatedAt).toLocaleDateString("hu-HU", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      ></TextField>
      <br />
      <TextField
        id="outlined"
        sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
        label="Összpontszám:"
        value={points}
      ></TextField>
      <h2>Feladatok</h2>
      {tasklist.tasks.map((task, i) => {
        return (
          <Container key={task.id}>
            <h3>{i + 1}. Feladat</h3>
            <TextField
              id="outlined"
              sx={{ pointerEvents: "none", width: "47.5%" }}
              label="Feladat címe:"
              value={task.title}
            ></TextField>
            <TextField
              id="outlined"
              sx={{ pointerEvents: "none", marginLeft: "5%", width: "47.5%" }}
              label="Pontszám:"
              value={task.points}
            ></TextField>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              sx={{
                pointerEvents: "none",
                marginTop: "20px",
                width: "47.5%",
              }}
              label="Feladat leírása:"
              value={task.description}
            ></TextField>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              sx={{
                pointerEvents: "none",
                marginTop: "20px",
                marginLeft: "5%",
                width: "47.5%",
              }}
              label="Megjegyzés:"
              value={task.notes}
            ></TextField>

            <br />
            <Divider sx={{ paddingTop: "20px" }} />
          </Container>
        );
      })}
      <h2>Funkciók</h2>
      <Container>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            "&:hover": { background: "darkblue" },
            marginBottom: "20px",
          }}
          onClick={handleClick}
          disabled={wipTaskList !== null}
        >
          Szerkesztés
        </Button>
      </Container>
    </Container>
  );
};
