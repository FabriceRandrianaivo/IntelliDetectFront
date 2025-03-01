/**
 * Fait le gestion des accès des utilisateurs au route d'authentfication.
 * Par route d'authentification, on spécifie les routes de connexion, de création de compte,
 * vérification d'email, etc. Tout ce qui est par rapport à l'authentification de l'utilisateur.
 *
 * Cet composant verifie à ce que tout utilisateur connecté ne doît plus avoir accès aux routes d'authentification.
 * Que si seulement apres avoir été déconnecté.
 */

import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
// import LoadingPage from "../../ui/LoadingPage";

const withAuthRouteRedirect = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const token = Cookies.get("user");
    const [isVerify, _] = useState(true);

    if (!!token) {
      return isVerify ? (
        <Navigate to="/home" />
      ) : (
        // <LoadingPage openLoading={isVerify} />
      <div>Loading page</div>
      );
    }

    return isVerify ? (
      <Component {...props} navigate={navigate} />
    ) : (
      // <LoadingPage openLoading={isVerify} />
      <div>Loading page</div>
    );
  };
};
export default withAuthRouteRedirect;
