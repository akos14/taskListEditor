import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useGetTaskListsQuery } from "../../state/feladatOKApiSlice";
import { TaskList } from "./TaskList";
import { newTaskList } from "../../state/taskListSlice";
import { Link } from "react-router-dom";

export const TaskLists = () => {
  const { data, isLoading } = useGetTaskListsQuery();
  const dispatch = useDispatch();

  return (
    <Container>
      <Link
        to="/wiptasklist"
        style={{
          textDecoration: "none",
        }}
        onClick={() => {
          dispatch(newTaskList());
        }}
      >
        <Button
          variant="contained"
          sx={{
            float: "right",
            "&:hover": { background: "darkblue" },
            marginTop: "10px",
          }}
        >
          Új feladatsor
        </Button>
      </Link>
      <h1>Feladatsoraim</h1>
      <Container>
        <Accordion sx={{ pointerEvents: "none" }} className="disabledAccord">
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: "gray",
              color: "white",
              border: "1px solid black",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Cím</Typography>
            <Typography sx={{ marginLeft: "165px", fontWeight: "bold" }}>
              Státusz
            </Typography>
            <Typography sx={{ marginLeft: "115px", fontWeight: "bold" }}>
              Leírás
            </Typography>
            <Typography sx={{ marginLeft: "130px", fontWeight: "bold" }}>
              Feladatok
            </Typography>
            <Typography sx={{ marginLeft: "40px", fontWeight: "bold" }}>
              Létrehozva
            </Typography>
            <Typography sx={{ marginLeft: "83px", fontWeight: "bold" }}>
              Módosítva
            </Typography>
          </AccordionSummary>
        </Accordion>
      </Container>
      {!isLoading ? (
        data.data.map((tasklist) => (
          <TaskList tasklist={tasklist} key={tasklist.id}></TaskList>
        ))
      ) : (
        <Container sx={{ textAlign: "center", paddingTop: "50px" }}>
          <h1>Loading...</h1>
        </Container>
      )}
    </Container>
  );
};
