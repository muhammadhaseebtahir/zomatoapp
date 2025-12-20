import { Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

export default function UserLogin() {
  const navigate= useNavigate()
  const {fetchUser}= useAuthContext()
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await handleSubmit(values);
  };
  const handleSubmit = async (values) => {
    let { email, password } = values;
    if (!email || !password) {
      return message.warning("Email and password are required");
    }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/auth/user/login", {
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      await fetchUser()
      message.success("Login successfully.");
navigate("/")
    } catch (err) {
      // console.log(`err :${err}`);
      message.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      console.log(err.response?.data?.error)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 ">
      <div className="w-full max-w-md dark:bg-gray-800 bg-slate-100 p-6 rounded-xl  border-gray-100 shadow-2xl dark:shadow-sm dark:shadow-gray-700   ">
        <div className="text-center mb-3">
          <h1 className="text-gray-900 font-bold mb-3 dark:text-white text-3xl">
            Welcome back.
          </h1>
          <p className="dark:text-slate-300 ">
            Sign in to continue your food journey.
          </p>
          <p className="dark:text-slate-300">
            Food partner:{" "}
            <Link to="/auth/foodpartner-register" className="text-blue-800 hover:underline">
              {" "}
              Register{" "}
            </Link>{" "}
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            label={<span className="dark:text-slate-300 ">Email</span>}
            rules={[
              { required: true, message: "Please enter your email." },
              { type: "email", message: "Enter valid email." },
            ]}
          >
            <Input
              placeholder="Email"
               size="large"
              prefix={<MailOutlined className="text-gray-400 pr-3" />}
            />
          </Form.Item>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700 dark:text-white font-medium" >Password</label>
          <Link to="/auth/forgot-password" className="text-blue-500  hover:underline" >Forgot Password</Link>
          </div>
          <Form.Item
            name="password"            
            rules={[
              { required: true, message: "Please enter your Password." },
              {
                min: 6,
                message: "Password must be at least 6 characters.",
              },
            ]}
          >
            
            <Input.Password
              placeholder="Password"
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
             size="large"
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full mt-3 "
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-[17px] dark:text-white">
          {" "}
          Create a new Account?{" "}
          <Link
            to="/auth/user-register"
            className="text-blue-800 hover:underline"
          >
            {" "}
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
