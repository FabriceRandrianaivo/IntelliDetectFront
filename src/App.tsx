import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./assets/scss/pages/App.scss";
import Home from "./pages/home/home.tsx";
import Login from "./pages/login/login.tsx";
import Signup from "./pages/sign-up/signup.tsx";
import Detection from "./pages/detection/detection.tsx";
import Streaming from "./pages/streaming/streaming.tsx";
import LandingPage from "./pages/home/landingPage.tsx";
import Collection from "./pages/collection/collection.tsx";
import Root from "./pages/Root.tsx";
import withAuthRouteRedirect from "./components/routeGuards/withAuthRouteRedirect.tsx";
import MainLayout, { ProtectedRoute } from "./MainLayout.tsx";
import Ip_list from "./pages/ip-list/ip-list.tsx";

const App: React.FC = () => {
  const LoginWrapper = withAuthRouteRedirect(Login);
  const RegisterWrapper = withAuthRouteRedirect(Signup);
  const GuestPageWrapper = withAuthRouteRedirect(Outlet);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="*" element={<p>Not Found</p>} />

          {/* Public Routes */}
          <Route element={<GuestPageWrapper />}>
            <Route path="login" element={<LoginWrapper />} />
            <Route path="sign-up" element={<RegisterWrapper />} />
          </Route>

          {/* Private Routes */}
          <Route
            element={
              <ProtectedRoute
                element={
                  <Suspense>
                    <Outlet />
                  </Suspense>
                }
              />
            }
          >
            <Route path="landing" element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<MainLayout />}>
              <Route path="stream" element={<Streaming theme />} />
              <Route path="collection" element={<Collection />} />
              <Route path="detection" element={<Detection />} />
              <Route path="ip-list" element={<Ip_list />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
