import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    await handleSubmit(values);
  };

  const handleSubmit = async (values) => {
    let { firstName, lastName, email, password } = values;
    setIsLoading(true)
    if (!firstName || !lastName || !email || !password) {
      return message.info("Please fill all the input.");
    }
    let userName = firstName + lastName;

    try {
      const res = await axios.post("http://localhost:8000/auth/user/register", {
        userName,
        email,
        password
        
      });
      message.success("Verifiy otp via send to your email.")
         form.resetFields();
      navigate("/auth/verify-otp");
    } catch (err) {
      // console.log(err);
      message.error(err?.response?.data?.message || "Something went wrong. Please try again.");
      
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-white">
      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="text-center mb-3">
          <h1 className="text-3xl mb-3 text-gray-800 font-bold  dark:text-white">
            Create your Account
          </h1>
          <p className="  dark:text-gray-300 mb-3">
            Join to explore and enjoy delicious meals.
          </p>
          <p className=" dark:text-gray-300">
            Switch :{" "}
            <Link to="/auth/foodpartner-register" className="text-blue-600 ">
              Join Food partner
            </Link>
          </p>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* First Name + Last Name in one line */}
          <div className="flex flex-col md:flex-row gap-3 ">
            <Form.Item
              name="firstName"
              label={<span className="dark:text-gray-300">First Name</span>}
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              className=" flex-1"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 pr-3" />}
                placeholder="First Name"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="dark:text-gray-300">Last Name</span>}
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
              className="flex-1"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 pr-3" />}
                placeholder="Last Name"
              />
            </Form.Item>
          </div>

          {/* Email */}
          <Form.Item
            name="email"
            label={<span className="dark:text-gray-300 ">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400 pr-3" />}
              placeholder="Email"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label={<span className="dark:text-gray-300">Password</span>}
            rules={[
              { required: true, message: "Please enter your password" },
              {
                pattern: /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
                message: "Password must contain at least one special character",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <p className="dark:text-white text-center  ">
          {" "}
          Already have an account?{" "}
          <Link to="/auth/user-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
