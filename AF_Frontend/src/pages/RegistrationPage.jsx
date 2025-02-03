import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    mobileNumber: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (`${name}` === "username") {
      checkUsernameAvailability();
    }
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (usernameAvailable === false) {
      newErrors.username = "Username is already taken";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    return newErrors;
  };

  const checkUsernameAvailability = async () => {
    if (formData.username.trim()) {
      try {
        const response = await axios.get(
          `https://your-backend-url.com/api/check-username?username=${formData.username}`
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

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-url.com/api/register",
        formData
      );
      const { status } = response.data;
      if (status === "pass") {
        alert(`Welcome! ${formData.username}`);
        navigate("/login", {
          replace: true,
        });
      } else {
        alert("Unable to register! Try again later!");
      }
    } catch (err) {
      setErrors(err.response?.data?.error || "Registration failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      handleRegistration();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.username ? "border-red-300" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                  {usernameAvailable === false && (
                    <p className="mt-2 text-sm text-red-600">
                      Username is taken.
                    </p>
                  )}
                  {usernameAvailable === true && formData.username.trim() && (
                    <p className="mt-2 text-sm text-green-600">
                      Username is available.
                    </p>
                  )}
                </div>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.firstName
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={`block w-full px-3 py-2 border ${
                          errors.lastName ? "border-red-300" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className={`block w-full pl-10 pr-10 py-2 border ${
                          errors.password ? "border-red-300" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - with adjusted spacing */}
              <div className="space-y-6 flex flex-col">
                {/* Address Field - with increased height */}
                <div className="flex-1">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complete Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm h-55">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      id="address"
                      className={`block w-full h-full pl-10 pr-3 py-2 border ${
                        errors.address ? "border-red-300" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none`}
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      maxLength="10"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.mobileNumber
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.dateOfBirth
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
