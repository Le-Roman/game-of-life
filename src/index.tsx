import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import FormLogin from "./components/FormLogin/FormLogin";
import { RequireLogin } from "./components/RequireLogin/RequireLogin";
import { UserLoginProvider } from "./components/UserLoginProvider/UserLoginProvider";
import { ROUTE } from "./constants";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <UserLoginProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTE.ROOT}
          element={
            <RequireLogin>
              <App />
            </RequireLogin>
          }
        />
        <Route path={ROUTE.AUTH} element={<FormLogin />} />
        <Route path={ROUTE.OTHER} element={<Navigate to={ROUTE.ROOT} />} />
      </Routes>
    </BrowserRouter>
  </UserLoginProvider>
);
