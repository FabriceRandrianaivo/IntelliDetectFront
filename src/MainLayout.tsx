import { Navigate, Outlet} from "react-router-dom";

// import ResponsiveTopheader from "./components/myAux/ResponsiveTopheader";
// import TopHeader from "./components/myAux/TopHeader";
// import { Skeleton, Stack } from "@mui/material";
import Cookies from "js-cookie";
import SideBar from "./components/sidBar"
import { useState } from "react";
import React from "react";


function App() {
    const token = Cookies.get("user");
    const [isOpenBar, setIsOpenBar] = useState<boolean>(true);
    return (
        token && (
            <>
                {/* <DrawerProvider> */}
                <div className="m-app">
                    <SideBar isOpenBar={isOpenBar} setIsOpenBar={setIsOpenBar} />
                    <div className="m-principle">
                        <Outlet />
                    </div>
                </div>
                {/* </DrawerProvider> */ }
            </>
        )
    );
}
export const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
    element,
}) => {
    const token = Cookies.get("user");
    const [isVerify, _] = useState(true);

    return isVerify && (token ? element : <Navigate to="/login" />);
};

// const CollectionLoading: React.FC = () => {
//   return (
//     <Stack spacing={1} className="mt-5">
//       <Skeleton
//         className="ml-2"
//         variant="text"
//         sx={{ fontSize: "28px", marginLeft: "10px" }}
//       />
//       <Skeleton
//         className="ml-2"
//         variant="text"
//         sx={{ fontSize: "28px", marginLeft: "10px" }}
//       />
//       <Skeleton
//         className="ml-2"
//         variant="text"
//         sx={{ fontSize: "28px", marginLeft: "10px" }}
//       />
//       <Skeleton
//         className="ml-2"
//         variant="text"
//         sx={{ fontSize: "28px", marginLeft: "10px" }}
//       />
//     </Stack>
//   );
// };
export default App;
