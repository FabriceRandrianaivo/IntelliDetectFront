import { useLocation } from "react-router-dom";

/**
 * Returns the ID from the URL parameter.
 *
 * @param { string } pathSegment The path segment to split the URL by
 * @return { string } The ID from the URL parameter
 */
const useSessionID = (pathSegment: string) => {
  const location = useLocation();
  const id = location.pathname.split(`/${pathSegment}/`)[1];
  return id;
};

export default useSessionID;
