import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Navbar from "./page/Navbar/Navbar";
import Profile from "./page/Profile/Profile";
import NotFound from "./page/NotFound/NotFound";
import Auth from "./page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./state/Auth/Action";
import ForgotPasswordForm from "./page/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./page/Auth/ResetPasswordForm";
import CreateTransaction from "./page/Transaction/CreateTransaction";
import UploadPdf from "./page/Transaction/UploadPdf";
import UploadReceipt from "./page/Transaction/UploadReceipt";

function App() {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  return (
    <>
      {auth.user ? (
        // --- PROTECTED ROUTES ---
        // These pages are only for logged-in users.
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-transaction" element={<CreateTransaction />} />
            <Route path="/upload-statement" element={<UploadPdf />} />
            <Route path="/upload-receipt" element={<UploadReceipt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        // --- PUBLIC ROUTES ---
        // These pages are for users who are NOT logged in.
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />

          {/* If a non-logged-in user tries any other URL, show the Auth page */}
          <Route path="*" element={<Auth />} />
        </Routes>
      )}
    </>
  );
}

export default App;
