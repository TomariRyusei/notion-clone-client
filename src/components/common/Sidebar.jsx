import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";

import assets from "../../assets/index";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (error) {
        alert(error);
      }
    };

    getMemos();
  }, [dispatch]);

  // ハイライト対象のメモID(クリックされているメモ)を格納
  useEffect(() => {
    const activeItem = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeItem);
  }, [memos, memoId]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addMemo = async () => {
    try {
      console.log("addmemo");
      const res = await memoApi.create();
      const newList = [res, ...memos];
      dispatch(setMemo(newList));
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo, index) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${memo._id}`}
            key={memo._id}
            selected={index === activeIndex} //　選択されているメモをハイライト
          >
            <Typography>
              {memo.icon} {memo.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
