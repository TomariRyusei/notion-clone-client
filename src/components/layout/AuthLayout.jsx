import React from "react";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      //ページ切り替える度に認証チェック(トークン持ってるかどうか確認)
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 6,
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン
        </Box>
      </Container>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
