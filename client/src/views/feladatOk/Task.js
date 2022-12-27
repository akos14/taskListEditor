import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  addToTaskList,
  newTaskList,
  selectWipTaskList,
} from "../../state/taskListSlice";
import { selectLoggedInUser } from "../../state/authSlice";

export const Task = ({ task }) => {
  const [expanded, setExpanded] = useState(false);
  const wipTaskList = useSelector(selectWipTaskList);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = () => {
    if (!wipTaskList) {
      dispatch(newTaskList());
    }
    dispatch(addToTaskList({ task: task }));
  };

  const isInWipTaskList =
    wipTaskList &&
    wipTaskList.tasks.filter((wTask) => wTask.id === task.id).length > 0;

  return (
    <Container>
      {user ? (
        <Button
          sx={{ display: "inline", float: "right" }}
          onClick={handleClick}
          disabled={isInWipTaskList}
        >
          {isInWipTaskList ? "Kiválasztva" : "Kiválaszt"}
        </Button>
      ) : (
        ""
      )}
      <Accordion
        expanded={expanded === `panel${task.id}`}
        onChange={handleChange(`panel${task.id}`)}
        sx={{ width: "88%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${task.id}bh-content`}
          id={`panel${task.id}bh-header`}
          sx={{
            backgroundColor: "lightgray",
            border: "1px solid black",
            marginTop: "-1px",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {task.title}
          </Typography>
          <Typography>
            {expanded ? "" : task.description.substring(0, 10) + "..."}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Typography>{task.description}</Typography>
          </Container>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
