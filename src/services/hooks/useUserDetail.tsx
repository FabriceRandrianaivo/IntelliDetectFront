import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<Record<string, string>[]>([]);
  useEffect(() => {
    const userDetailCookie = Cookies.get("userDetail");
    if (userDetailCookie) {
      const userDetailObject = JSON.parse(userDetailCookie);
      setUserDetails(userDetailObject);
    }
  }, []);
  return userDetails;
};