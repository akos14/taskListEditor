import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TaskListData } from "./TaskListData";

export const TaskList = ({ tasklist }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Accordion
        expanded={expanded === `panel${tasklist.id}`}
        onChange={handleChange(`panel${tasklist.id}`)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${tasklist.id}bh-content`}
          id={`panel${tasklist.id}bh-header`}
          sx={{
            backgroundColor: "lightgray",
            border: "1px solid black",
            marginTop: "-1px",
          }}
        >
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            {tasklist.title}
          </Typography>
          {!expanded ? (
            <>
              <Typography sx={{ width: "20%" }}>{tasklist.status}</Typography>
              <Typography sx={{ width: "25%" }}>
                {tasklist.description.substring(0, 10) + "..."}
              </Typography>
              <Typography sx={{ width: "10%" }}>
                {tasklist.tasks.length}
              </Typography>
              <Typography sx={{ width: "20%" }}>
                {new Date(tasklist.createdAt).toLocaleDateString("hu-HU", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </Typography>
              <Typography sx={{ width: "20%" }}>
                {new Date(tasklist.updatedAt).toLocaleDateString("hu-HU", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </Typography>
            </>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <TaskListData tasklist={tasklist}></TaskListData>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
