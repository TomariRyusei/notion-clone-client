import React from "react";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => {
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
