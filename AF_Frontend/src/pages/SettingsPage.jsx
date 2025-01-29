import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";

const SettingsPage = () => {
  // Sample user data - replace with actual user data from your backend
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    mobileNumber: "1234567890",
    dateOfBirth: "1990-01-01",
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Details updated successfully.");
    // updateUserData(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg px-4 py-8 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Edit Profile
          </h2>

          <div className="relative flex justify-center mb-6">
            <div className="relative">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {userData.fullName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <Camera className="h-5 w-5 text-gray-600" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Address"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
