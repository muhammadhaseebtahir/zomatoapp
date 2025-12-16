import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Verify_otp() {
  const { fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const payload = {
        email: localStorage.getItem("email"),
        otp: values.otp,
      };

      const res = await axios.post(
        "http://localhost:8000/auth/user/verify-Otp",
        payload
      );

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        message.success(res.data.message || "OTP verified successfully");

        // ✅ optional: clear email after verification
        localStorage.removeItem("email");
      }
      await fetchUser();

      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Invalid or expired OTP");
      console.log(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setOtpLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:8000/auth/user/resend-Otp",
        {
          email: localStorage.getItem("email"),
        }
      );
      if (res.status === 201) {
        message.success(res.data.message || "New otp send to your Email.");
      }
    } catch (err) {
      console.log(err.response?.data?.error);
      message.error(err.response?.data?.message);
    } finally {
      setOtpLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen px-3 flex items-center justify-center bg-slate-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg shadow-xl bg-gray-100 dark:bg-gray-700 p-6">
        <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-white font-bold">
          OTP Verification
        </h1>

        <p className="text-center mb-4 text-gray-900 dark:text-gray-300">
          Enter OTP sent to:
          <br />
          <span className="text-blue-600 font-semibold">{email}</span>
        </p>

        <Form layout="vertical" className="text-center" onFinish={onFinish}>
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "OTP required hai" },
              { len: 6, message: "OTP must be 6 digits." },
            ]}
          >
            <Input.OTP />
          </Form.Item>
          <p className="text-gray-900 dark:text-white  mb-3 ">
            Didn't got the code?{" "}
            <span
              onClick={resendOtp}
              className={`text-blue-600 underline cursor-pointer ml-1  ${
      otpLoading
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600 cursor-pointer"
    }`}
            >
              Resend{" "}
            </span>{" "}
            {otpLoading && (
              <Spin size="small" className="ml-2 dark:text-white" />
            )}{" "}
          </p>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full py-3"
          >
            Verify
          </Button>
        </Form>
      </div>
    </div>
  );
}
