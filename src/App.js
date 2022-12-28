import Signin from "./component/login_Page/Signin";
import SignUp from "./component/register_Page/SignUp";
import ResetPassword from "./component/resetPassword_Page/ResetPassword";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import MainPage from "./component/mainpage/MainPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./component/protected_Route/ProtectedRoutes";
import EditProfile from "./component/profile/editProfile/EditProfile";
import AppContextProvider from "./component/core/AppContextProvider";
import EditPassword from "./component/profile/resetPasswordProfile/EditPassword";
import 'react-toastify/dist/ReactToastify.css';
import ActiveUsers from "./component/activeusersPage/ActiveUsers"
import Layout from "./component/layout/Layout";
function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ToastContainer theme="#fff" toastStyle={{ backgroundColor: "#1976D2", color: "white", colorAdjust: "white" }} />
        <div className="app">
          <Routes>
            {/* //users'a activepage dedim */}
            <Route path="/mainpage" element={<Layout><ProtectedRoutes>  <MainPage /></ProtectedRoutes></Layout>} />
            <Route path="/activepage" element={<Layout> <ActiveUsers /></Layout>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/mainpage/editprofile" element={<Layout> <EditProfile /></Layout>} />
            <Route path="/mainpage/editpassword" element={<Layout><EditPassword /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter >
    </AppContextProvider>
  );
}

export default App;
