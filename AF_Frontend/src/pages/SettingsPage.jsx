import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";

const SettingsPage = ({ username }) => {
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
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const token = useSelector((state) => state.user.token);

  // Fetch the user data from the backend on mount
  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-user-data/?username=${username}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = response.data;
      setUserData(data.userData);
      setFieldVisibility(data.fieldVisibility);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Validate the user data
  const validateForm = () => {
    const newErrors = {};

    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (usernameAvailable === false) {
      newErrors.username = "Username is already taken";
    }

    if (!userData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!userData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!userData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(userData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!userData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(userData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    return newErrors;
  };

  // Check the availability of username
  const checkUsernameAvailability = async () => {
    if (userData.username.trim()) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/check-username/?username=${userData.username}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUsernameAvailable(response.data.available);
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameAvailable(false);
      }
    } else {
      setUsernameAvailable(null);
    }
  };

  // Handle the user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (`${name}` === "username") {
      checkUsernameAvailability();
    }
  };

  // Handle the image upload
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

  // Handle the saving of any changes made to the user details
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/save-changes/",
        { userData: userData, fieldVisibility: fieldVisibility }
      );
      const { status } = response.data;
      if (status === "pass") {
        alert("Changed saved successfully!");
      } else {
        alert("Unable to save! Try again later!");
      }
    } catch (err) {
      setErrors(err.response?.data?.error || "Saving failed");
    }
  };

  // Handle the form submission and saving updated information
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      handleSaveChanges();
    } else {
      setErrors(newErrors);
    }
  };

  // Get initials if profile photo is unavailable
  const getInitials = () => {
    var initials = "";
    if (userData.firstName) {
      initials += userData.firstName[0];
    }
    if (userData.lastName) {
      initials += userData.lastName[0];
    }
    return initials.toUpperCase();
  };

  // Handle the toggle of field visiblity
  const handleVisibilityToggle = (fieldName) => {
    setFieldVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: !prevVisibility[fieldName],
    }));
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
                  {getInitials()}
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
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Username
                  <button
                    type="button"
                    onClick={() => handleVisibilityToggle("username")}
                    className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                      fieldVisibility.username ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Toggle Username Visibility</span>
                    <span
                      className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                        fieldVisibility.username ? "translate-x-3" : ""
                      }`}
                    ></span>
                  </button>
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
                {usernameAvailable === false && (
                  <p className="mt-2 text-sm text-red-600">
                    Username is taken.
                  </p>
                )}
                {usernameAvailable === true && userData.username.trim() && (
                  <p className="mt-2 text-sm text-green-600">
                    Username is available.
                  </p>
                )}
              </div>
            </div>

            {/* Split Name Fields */}
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div className="w-full grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 px-1 pb-1 items-center">
                    First Name
                    <button
                      type="button"
                      onClick={() => handleVisibilityToggle("firstName")}
                      className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                        fieldVisibility.firstName
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span className="sr-only">
                        Toggle First Name Visibility
                      </span>
                      <span
                        className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                          fieldVisibility.firstName ? "translate-x-3" : ""
                        }`}
                      ></span>
                    </button>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 px-1 pb-1 items-center">
                    Last Name
                    <button
                      type="button"
                      onClick={() => handleVisibilityToggle("lastName")}
                      className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                        fieldVisibility.lastName ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span className="sr-only">
                        Toggle Last Name Visibility
                      </span>
                      <span
                        className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                          fieldVisibility.lastName ? "translate-x-3" : ""
                        }`}
                      ></span>
                    </button>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Email
                  <button
                    type="button"
                    onClick={() => handleVisibilityToggle("email")}
                    className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                      fieldVisibility.email ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Toggle Email Visibility</span>
                    <span
                      className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                        fieldVisibility.email ? "translate-x-3" : ""
                      }`}
                    ></span>
                  </button>
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Mobile Number
                  <button
                    type="button"
                    onClick={() => handleVisibilityToggle("mobileNumber")}
                    className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                      fieldVisibility.mobileNumber
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">
                      Toggle Mobile Number Visibility
                    </span>
                    <span
                      className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                        fieldVisibility.mobileNumber ? "translate-x-3" : ""
                      }`}
                    ></span>
                  </button>
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Mobile Number"
                />
                {errors.mobileNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Date Of Birth
                  <button
                    type="button"
                    onClick={() => handleVisibilityToggle("dateOfBirth")}
                    className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                      fieldVisibility.dateOfBirth
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">
                      Toggle Date Of Birth Visibility
                    </span>
                    <span
                      className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                        fieldVisibility.dateOfBirth ? "translate-x-3" : ""
                      }`}
                    ></span>
                  </button>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-500 px-1 pb-1">
                  Address
                  <button
                    type="button"
                    onClick={() => handleVisibilityToggle("address")}
                    className={`cursor-pointer ml-2 relative inline-flex items-center h-3 w-6 rounded-full transition duration-200 ease-in-out ${
                      fieldVisibility.address ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Toggle Address Visibility</span>
                    <span
                      className={`absolute left-0.5 bg-white rounded-full h-2 w-2 transform transition duration-200 ease-in-out ${
                        fieldVisibility.address ? "translate-x-3" : ""
                      }`}
                    ></span>
                  </button>
                </label>
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                  placeholder="Address"
                  rows={3}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
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
