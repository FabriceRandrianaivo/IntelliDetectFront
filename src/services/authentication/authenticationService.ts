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
});

let isLogoutInProgress = false;

authService.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const token = Cookies.get("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

authService.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      if (!isLogoutInProgress) {
        handleLogout();
      }
    }
    return Promise.reject(error.response);
  },
);

const handleLogout = () => {
  if (isLogoutInProgress) return;
  isLogoutInProgress = true;

  toast.info(
    "Votre session a expiré, redirection vers la page de connexion...",
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    },
  );

  setTimeout(() => {
    Cookies.remove("user");
    Cookies.remove("userDetail");
    window.location.href = "/login";
  }, 3000);
};

export default authService;
