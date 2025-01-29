import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ProfileDetails from "./ProfileDetails"
import SettingsPage from "./SettingsPage";

const ProfilePage = () => {
  const { username } = useParams();
  return (
      <Routes>
        <Route path="/" element={<ProfileDetails username={username} />} />
        <Route path="/settings" element={<SettingsPage username={username} />} />
      </Routes>
  );
};

export default ProfilePage;
