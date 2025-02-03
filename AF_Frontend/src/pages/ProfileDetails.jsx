import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileDetails = ({ username }) => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user.id);

  // Sample user data - replace with actual user data from your backend
  const [userData, setUserData] = useState({
    username: "johndoe69",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    mobileNumber: "1234567890",
    dateOfBirth: "1990-01-01",
    profileImage: null,
  });

  const [fieldVisibility, setFieldVisibility] = useState({
    username: true,
    firstName: true,
    lastName: true,
    email: true,
    address: true,
    mobileNumber: true,
    dateOfBirth: true,
  });

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://your-backend-url.com/api/get-user-data/${username}`
      );
      const data = response.data;
      setUserData(data.userData);
      setFieldVisibility(data.fieldVisibility);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const isOwnProfile = loggedInUserId === username;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="bg-blue-600 h-32 rounded-t-lg"></div>

          <div className="px-4 sm:px-6 lg:px-8 pb-8">
            {/* Profile Picture Section */}
            <div className="relative -mt-16 flex justify-center">
              <div className="relative">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                    {getInitials(userData.firstName + " " + userData.lastName)}
                  </div>
                )}
              </div>
            </div>

            {/* User Information */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.firstName + " " + userData.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  Member since January 2024
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                    {(isOwnProfile || fieldVisibility.username) && (
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Username
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {userData.username}
                            </p>
                          </div>
                        </div>
                      )}

                      {(isOwnProfile ||
                        (fieldVisibility.firstName &&
                          fieldVisibility.lastName)) && (
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Full Name
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {userData.firstName + " " + userData.lastName}
                            </p>
                          </div>
                        </div>
                      )}

                      {(isOwnProfile || fieldVisibility.email) && (
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Email
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {userData.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {(isOwnProfile || fieldVisibility.mobileNumber) && (
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Mobile Number
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {userData.mobileNumber}
                            </p>
                          </div>
                        </div>
                      )}

                      {(isOwnProfile || fieldVisibility.dateOfBirth) && (
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Date of Birth
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {new Date(
                                userData.dateOfBirth
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {(isOwnProfile || fieldVisibility.address) && (
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3">
                            <label className="block text-sm font-medium text-gray-500">
                              Address
                            </label>
                            <p className="mt-1 text-sm text-gray-900">
                              {userData.address}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                {isOwnProfile && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/${username}/settings`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
