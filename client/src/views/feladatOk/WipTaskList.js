import { TextField, Button, Divider, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../state/authSlice";
import {
  useCreateMutation,
  useModifyMutation,
} from "../../state/feladatOKApiSlice";
import {
  dropWipTaskList,
  selectOriginal,
  selectWipTaskList,
  setWipTaskList,
  storeWipTaskList,
} from "../../state/taskListSlice";

export const WipTaskList = () => {
  const wipTaskList = useSelector(selectWipTaskList);
  const original = useSelector(selectOriginal);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [taskListCreate] = useCreateMutation();
  const [taskListModify] = useModifyMutation();

  const [data, setData] = useState({
    title: wipTaskList.title ?? "",
    status: wipTaskList.status ?? "",
    description: wipTaskList.description ?? "",
    createdAt: wipTaskList.createdAt ?? "",
    updatedAt: wipTaskList.updatedAt ?? "",
    tasks: wipTaskList.tasks,
  });

  useEffect(() => {
    dispatch(storeWipTaskList({ taskList: data }));
  }, [data, dispatch]);

  useEffect(() => {
    setData({
      ...data,
      tasks: data.tasks.map((dTask) =>
        !dTask.points ? { ...dTask, points: 0 } : dTask
      ),
    });
  }, [data]);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!wipTaskList) {
    return <Navigate to="/tasklists" replace />;
  }

  let points = 0;

  data.tasks.forEach((task) => {
    if ("points" in task && task.points !== "") points += parseInt(task.points);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, status, description } = data;

    const newErrors = {};

    if (title === "") {
      newErrors.title = "Cím megadása kötelező!";
    }
    if (status === "") {
      newErrors.status = "Státusz megadása kötelező!";
    } else if (status !== "draft" && status !== "published") {
      newErrors.status = "Státusz csak 'draft' vagy 'published' lehet!";
    }
    if (description === "") {
      newErrors.description = "Leírás megadása kötelező!";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    if (original) {
      const sendData = {};
      for (const key in data) {
        if (data[key] !== original[key] || key === "title") {
          sendData[key] = data[key];
        }
      }
      sendData.id = original.id;
      try {
        const result = await taskListModify(sendData).unwrap();
        dispatch(setWipTaskList({ taskList: result }));
        setData(result);
        newErrors.success = "Sikeres mentés!";
        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 2000);
      } catch (err) {
        newErrors.send = "Beküldési hiba!";
        setErrors(newErrors);
      }
    } else {
      const sendData = {};
      for (const key in data) {
        if (data[key]) {
          sendData[key] = data[key];
        }
      }

      try {
        const result = await taskListCreate(sendData).unwrap();
        dispatch(setWipTaskList({ taskList: result }));
        setData(result);
        newErrors.success = "Sikeres mentés!";
        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 2000);
      } catch (err) {
        newErrors.send = "Beküldési hiba!";
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container>
        <p style={{ float: "right", color: "red" }}>{errors.send}</p>
        <p style={{ float: "right", color: "green" }}>{errors.success}</p>
        <h1>Szerkesztett feladatsor</h1>
        <Container>
          <h2>Adatok</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined"
              name="title"
              sx={{ width: "47.5%" }}
              label="Feladatsor címe"
              value={data.title}
              error={errors.title !== undefined}
              helperText={errors.title}
              onChange={handleChange}
            ></TextField>
            <TextField
              id="outlined"
              name="status"
              sx={{ marginLeft: "5%", width: "47.5%" }}
              label="Státusz"
              value={data.status}
              error={errors.status !== undefined}
              helperText={errors.status}
              onChange={handleChange}
              select
            >
              <MenuItem value="draft">draft</MenuItem>
              <MenuItem value="published">published</MenuItem>
            </TextField>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              name="description"
              multiline
              sx={{ marginTop: "20px", width: "100%" }}
              label="Leírás"
              value={data.description}
              error={errors.description !== undefined}
              helperText={errors.description}
              onChange={handleChange}
            ></TextField>
            <br />
            <TextField
              id="outlined"
              sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
              label="Létrehozva:"
              value={
                data.createdAt &&
                new Date(data.createdAt).toLocaleDateString("hu-HU", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })
              }
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
              value={
                data.updatedAt &&
                new Date(data.updatedAt).toLocaleDateString("hu-HU", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })
              }
            ></TextField>
            <br />
            <TextField
              id="outlined"
              type="number"
              sx={{ pointerEvents: "none", marginTop: "20px", width: "47.5%" }}
              label="Összpontszám:"
              value={points}
            ></TextField>
            <h2>Feladatok</h2>
            {data.tasks.map((task, i) => {
              const handleTaskDataChange = (e) => {
                setData({
                  ...data,
                  tasks: data.tasks.map((dTask) =>
                    dTask.id === task.id
                      ? { ...dTask, [e.target.name]: e.target.value }
                      : dTask
                  ),
                });
              };

              return (
                <Container key={task.id}>
                  <h3>{i + 1}. Feladat</h3>
                  <TextField
                    id="outlined"
                    name="title"
                    sx={{ width: "47.5%" }}
                    label="Feladat címe:"
                    value={task.title}
                  ></TextField>
                  <TextField
                    id="outlined"
                    type="number"
                    name="points"
                    sx={{
                      marginLeft: "5%",
                      width: "47.5%",
                    }}
                    label="Pontszám:"
                    defaultValue={task.points}
                    onChange={handleTaskDataChange}
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
                    name="notes"
                    multiline
                    sx={{
                      marginTop: "20px",
                      marginLeft: "5%",
                      width: "47.5%",
                    }}
                    label="Megjegyzés:"
                    defaultValue={task.notes}
                    onChange={handleTaskDataChange}
                  ></TextField>

                  <br />
                  <Divider sx={{ paddingTop: "20px" }} />
                </Container>
              );
            })}
            <Container
              sx={{
                paddingTop: "20px",
                marginLeft: "22px",
                marginRight: "20px",
                paddingBottom: " 20px",
              }}
            >
              <Link
                to="/tasklists"
                style={{
                  textDecoration: "none",
                }}
                onClick={() => {
                  dispatch(dropWipTaskList());
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "45.5%",
                    backgroundColor: "red",
                    "&:hover": { background: "darkred" },
                  }}
                >
                  Szerkesztés zárása
                </Button>
              </Link>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "45.5%",
                  marginLeft: "5%",
                  backgroundColor: "green",
                  "&:hover": { background: "darkgreen" },
                }}
              >
                Mentés
              </Button>
            </Container>
          </form>
        </Container>
      </Container>
    </>
  );
};
