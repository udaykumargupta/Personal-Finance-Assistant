import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect } from 'react';
import { getUser } from './state/Auth/Action';

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
