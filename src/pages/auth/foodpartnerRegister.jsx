import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import registerLogo from "../../component/assets/image/registerImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export default function FoodpartnerRegister() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
   await handleSubmit(values)
  };

  const handleSubmit=async(values)=>{
      let { userName, email, brandName, phoneNo, password } = values;
    userName = userName.trim().toLowerCase();
    email = email.trim().toLowerCase();
    brandName = brandName.trim().toLowerCase();
    password = password.trim();
    if (!userName || !email || !brandName || !phoneNo || !password) {
      return message.warning("Please fill all the input.");
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/food-partner/register",
        {
          userName,
          email,
          brandName,
          phoneNo,
          password,
        }
      );

      if (res.status === 200) {
         const email = res.data.email
      localStorage.setItem("email",email)
        message.success("Verifiy otp via send to your email.");
        form.resetFields();
        navigate("/auth/verify-otp");
        return;
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong.");
      console.log(err.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 bg-sky-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-gray-200 dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block sticky top-0 h-screen">
          <img
            src={registerLogo}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Form Section */}
        <div className="w-full px-5 sm:px-10 py-8">
          <div className="text-center mb-3 md:mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Partner Sign Up
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Grow your business with our platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Food Partner?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            {/* Name */}
            <Form.Item
              label={<span className="dark:text-gray-300">Name</span>}
              name="userName"
              rules={[
                { required: true, message: "Enter your name" },
                { min: 3, message: "Minimum 3 characters required" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your name"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label={<span className="dark:text-gray-300">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Enter your email" },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
              />
            </Form.Item>

            {/* Brand + Phone */}
            <div className="flex flex-row  gap-x-4 ">
              <Form.Item
                label={<span className="dark:text-gray-300">Brand Name</span>}
                name="brandName"
                className="flex-1"
                rules={[
                  { required: true, message: "Enter brand name" },
                  { min: 3, message: "Minimum 3 characters required" },
                ]}
              >
                <Input placeholder="Brand name" />
              </Form.Item>

              <Form.Item
                label={<span className="dark:text-gray-300">Phone No</span>}
                name="phoneNo"
                className="flex-1"
                rules={[
                  { required: true, message: "Enter phone number" },
                  {
                    pattern: /^[0-9]{11}$/,
                    message: "Enter 11 digit number",
                  },
                ]}
              >
                <Input
                  prefix={
                    <span className="text-gray-900 dark:text-gray-300 pr-3 border-r-2 border-gray-700">
                      +92
                    </span>
                  }
                  placeholder="3XXXXXXXXXX"
                />
              </Form.Item>
            </div>

            {/* Password */}
            <Form.Item
              label={<span className="dark:text-gray-300">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Minimum 6 characters" },
                {
                  pattern: /^(?=.*[!@#$%^&*])/,
                  message: "At least one special character required",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
              />
            </Form.Item>

            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full text-lg font-semibold"
            >
              Register
            </Button>
          </Form>

          <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
