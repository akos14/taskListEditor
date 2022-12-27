import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetTasksQuery } from "../../state/feladatOKApiSlice";
import { Task } from "./Task";

export const Taskbank = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetTasksQuery(page);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!isLoading);
  }, [isLoading]);

  const nextPage = () => {
    if ((page + 1) * 10 < data.total) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <Container>
      <h1>Feladatbank</h1>
      <Container>
        <Accordion sx={{ width: "88%", pointerEvents: "none" }}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: "gray",
              color: "white",
              border: "1px solid black",
            }}
          >
            <Typography sx={{ width: "32%", fontWeight: "bold" }}>
              Cím
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>Leírás</Typography>
          </AccordionSummary>
        </Accordion>
      </Container>
      {isLoaded ? (
        <>
          {data.data.map((task) => (
            <Task task={task} key={task.id}></Task>
          ))}
          <Container sx={{ paddingTop: "20px", width: "90%" }}>
            <Button
              onClick={prevPage}
              sx={{ width: "41.5%" }}
              disabled={!(page > 0)}
            >
              {"< Előző"}
            </Button>
            <Button
              onClick={nextPage}
              sx={{ width: "41.5%", marginLeft: "5%" }}
              disabled={!((page + 1) * 10 < data.total)}
            >
              {"Következő >"}
            </Button>
          </Container>
        </>
      ) : (
        <Container sx={{ textAlign: "center", paddingTop: "50px" }}>
          <h1>Loading...</h1>
        </Container>
      )}
    </Container>
  );
};
