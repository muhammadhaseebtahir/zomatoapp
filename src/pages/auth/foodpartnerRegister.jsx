import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export default function FoodpartnerRegister() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await handleSubmit(values);
  };
  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 dark:bg-gray-800 shadow-xl bg-slate-100 rounded-lg ">
        <div className="text-center">
          <h1 className="text-gray-900  font-bold mb-3 dark:text-white text-3xl ">
            Partner sign up
          </h1>
          <p className="text-gray-900  dark:text-gray-300">
            Grow your business with our platform.
          </p>
          <p className="text-gray-900  dark:text-gray-300">
            Food Partner:{" "}
            <Link className="text-blue-800 hover:underline" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label={
              <span className="text-gray-800 dark:text-gray-300">Name</span>
            }
            name="userName"
            rules={[
              {
                required: true,
                message: "Enter you name.",
              },
              { min: 3, message: "Name must be at least 3 characters." },
            ]}
          >
            <Input
              placeholder="Enter you Name"
              size="large"
              prefix={<UserOutlined className="text-gray-400 pr-3" />}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
