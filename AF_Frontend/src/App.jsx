import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      {/* PAGES */}
      {/* 
        Registeration Page - a new user can register
        Log In Page - registered user can login
        Profile Page - any registered user can view any registered user's profile
        Settings Page - Logged in user can change the profile details and preferences
        Main Page - Page to find an Alumni
    */}

      {/* 
        In Main Page, the logged in user can search for other Almunis using either their name or their username.
    */}

      {/*
        If a user has not logged in, then redirect the user to the Login Page.
        Without logging in, the user cannot view any pages except for the Registeration Page
    */}

      {/* 
        In Settings Page, the logged in user can edit the personal details provided by him.
        The user can toggle the visibility of the profile information that others can view.
    */}

    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile_page" element={<ProfilePage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
