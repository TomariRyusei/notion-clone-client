import React from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    if (username === "") {
      setUsernameErrText("名前を入力してください。");
      return;
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください。");
      return;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErrText("確認用パスワードを入力してください。");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります。");
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      const errors = error.data.errors;
      console.log(errors);
      errors.forEach((error) => {
        if (error.param === "username") setUsernameErrText(error.msg);
        if (error.param === "password") setPasswordErrText(error.msg);
        if (error.param === "confirmPassword")
          setConfirmPasswordErrText(error.msg);
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="お名前"
          name="username"
          disabled={loading}
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          disabled={loading}
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          disabled={loading}
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="primary"
          type="submit"
          loading={loading}
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        すでにアカウント持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
