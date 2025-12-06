import { Form, Input,Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function UserLogin() {
  const [form] = Form.useForm();
  const onFinish = async(values) => {
   await handleSubmit(values)
  };
  const  handleSubmit =async(values)=>{
    let {email,password}= values
   try{
   const res = await axios.post("http://localhost:8000/auth/user/login",{
    email,password
   })
   }catch(err){

   }


  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 ">
      <div className="w-full max-w-md dark:bg-gray-800 bg-gray-50 p-6 rounded-xl  border-gray-100 shadow-xl dark:shadow-sm dark:shadow-gray-700   ">
        <div className="text-center mb-3">
          <h1 className="text-gray-900 font-bold mb-3 dark:text-white text-3xl">
            Welcome back.
          </h1>
          <p className="dark:text-slate-300 ">
            Sign in to continue your food journey.
          </p>
          <p className="dark:text-slate-300">
            Food partner:{" "}
            <Link to="/auth/foodpartner-login" className="text-blue-800">
              {" "}
              Login{" "}
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
              prefix={<MailOutlined className="text-gray-400 pr-3" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="dark:text-slate-300 pr-3 ">Password</span>}
            rules={[
              { required: true, message: "Please enter your Password." },
              {
                min: 6, message: "Password must be at least 6 characters."
              }
            ]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="text-gray-400" />}
            />
          </Form.Item>
          <Form.Item>
  <Button
  type="primary"
  htmlType="submit"
  className="w-full mt-3 font-semibold"
>
  Login
</Button>
</Form.Item>

        </Form>
        <p className="text-center text-[17px] dark:text-white" > Create new Account? <Link to="/auth/user-register" className="text-blue-800 hover:underline" > Register</Link> </p>
      </div>
    </div>
  );
}
