import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  return (
    <>
      <Box component="form">
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="お名前"
          name="username"
          // disabled={loading}
          required
          // error={usernameErrText !== ""}
          // helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          // disabled={loading}
          required
          // error={passwordErrText !== ""}
          // helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          // disabled={loading}
          required
          // error={confirmPasswordErrText !== ""}
          // helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="primary"
          type="submit"
          loading={false}
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
