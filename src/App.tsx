import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
// import Cookies from 'js-cookie';
// import TopHeader from './components/topHeader.tsx';
import './assets/scss/pages/App.scss';
// import Navbar from './components/navBar.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import Signup from './pages/sign-up/signup.tsx';
// import Detection from './pages/detection/detection.tsx';
import Streaming from './pages/streaming/streaming.tsx';
import LandingPage from './pages/home/landingPage.tsx';
import Collection from './pages/collection/collection.tsx';
import Root from './pages/Root.tsx';
import withAuthRouteRedirect from './components/routeGuards/withAuthRouteRedirect.tsx';
import MainLayout, { ProtectedRoute } from './mainLayout.tsx';




const App: React.FC = () => {
  // const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  // const token = Cookies.get("user"); 
  const LoginWrapper = withAuthRouteRedirect(Login);
  const RegisterWrapper = withAuthRouteRedirect(Signup);
  const GuestPageWrapper = withAuthRouteRedirect(Outlet);

  // useEffect(() => {
  //   const body = document.body;
  //   if (isDarkTheme) {
  //     body.classList.add('theme-dark');
  //     body.classList.remove('theme-light');
  //   } else {
  //     body.classList.add('theme-light');
  //     body.classList.remove('theme-dark');
  //   }
  // }, [isDarkTheme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="*" element={<p>Not Found</p>} />
          {/* <Route path="404" element={<AppErrorPage />} /> */}

          {/* Public Routes */}
          <Route element={<GuestPageWrapper />}>
            <Route path="login" element={<LoginWrapper />} />
            <Route path="sign-up" element={<RegisterWrapper />} />
            {/* <Routepath="reset-password/:token"element={<ResetPassword />}/>
          <Route path="forgot-password"element={<ForgotPassword />}/> */}
          </Route>

          {/* Private Routes */}
          <Route
            element={
              <ProtectedRoute
                element={
                  <Suspense
                  // fallback={
                  //   <LoadingPage openLoading={true} />
                  // }
                  >
                    <Outlet />
                  </Suspense>
                }
              />
            }
          >
            <Route path="landing" element={<LandingPage />} />
            <Route path="home" element={<Home theme />} />
            <Route path="*" element={<MainLayout />}>
              <Route path="stream" element={<Streaming theme />} />
              <Route path="collection" element={<Collection />} />
              {/* <Route path="camera/:IpCam?" element={<Streaming theme/>}
            /> */}

            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
