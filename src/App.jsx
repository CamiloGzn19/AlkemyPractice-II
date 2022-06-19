import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

import { Login } from "./components/views/auth/Login/Login";
import { Task } from "./components/views/Tasks/Task";
import { Registro } from "./components/views/auth/Register/Register"

const Error404 = lazy(() => import("./components/views/Error/Error404"));

const RequiredAuth = ({ children }) => {
  if (!localStorage.getItem("logged")) {
    return <Navigate to="/Login" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Task />
                </motion.div>
              </RequiredAuth>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Registro />
              </motion.div>
            }
          />
          <Route
            path="/*"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Error404 />
                </Suspense>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
