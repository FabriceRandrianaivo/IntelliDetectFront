import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const API_BASE_URL = `${import.meta.env.VITE_API_SERVER_URL}`;
const authService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

let isLogoutInProgress = false; // Variable pour suivre l'état de déconnexion
authService.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const token = Cookies.get("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
authService.interceptors.response.use(
  (response:any) => {
    return response;
  },
  (error:any) => {
    if (error.response && error.response.status === 401) {
      if (!isLogoutInProgress) {
        handleLogout();
      }
    }
    return Promise.reject(error.response);
  }
);

const handleLogout = () => {
  isLogoutInProgress = true;
  const toastId = toast.loading(
    "Votre session est expirée, déconnexion en cours...",
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
  setTimeout(() => {
    // toast.update(toastId, {
    //   render: "Déconnexion réussie",
    //   type: "success",
    //   isLoading: false,
    //   autoClose: 2000,
    // });
    Cookies.remove("user");
    Cookies.remove("userDetail");
    window.location.href = "/login";
  }, 4000);
};
export default authService;
