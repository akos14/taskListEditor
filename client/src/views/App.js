import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import { Layout } from "./layout/Layout";
import { FeladatOK } from "./feladatOk/FeladatOK";
import { Container } from "@mui/system";
import { Taskbank } from "./feladatOk/Taskbank";
import { Register } from "./auth/Register";
import { TaskLists } from "./feladatOk/TaskLists";
import { WipTaskList } from "./feladatOk/WipTaskList";
import { Profile } from "./feladatOk/Profile";
import { RequireAuth } from "./auth/RequireAuth";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<FeladatOK />} />
            <Route path="/login" element={<Login />} />
            <Route path="/taskbank" element={<Taskbank />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasklists"
              element={
                <RequireAuth>
                  <TaskLists />
                </RequireAuth>
              }
            />
            <Route
              path="/wiptasklist"
              element={
                <RequireAuth>
                  <WipTaskList />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
