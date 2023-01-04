import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import memoApi from "../api/memoApi";
import EmojiPicker from "../components/common/EmojiPicker";

const Memo = () => {
  const { memoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIsFavorite(res.favorite);
        setIcon(res.icon);
      } catch (err) {
        if (err.data) alert(err.data);
        console.error(err);
      }
    };

    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTiele = e.target.value;
    setTitle(newTiele);
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTiele });
      } catch (error) {
        if (error.data) alert(error.data);
        console.error(error);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        if (error.data) alert(error.data);
        console.error(error);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemoMsg = await memoApi.delete(memoId);
      alert(deletedMemoMsg);
      const newMemos = memos.filter((memo) => memo._id !== memoId);
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0].id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (error) {
      if (error.data) alert(error.data);
      console.error(error);
    }
  };

  const onIconChange = async (newIcon) => {
    let tmpMemos = [...memos];
    const index = tmpMemos.findIndex((memo) => memo._id === memoId);
    tmpMemos[index] = { ...tmpMemos[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(tmpMemos));

    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (error) {
      if (error.data) alert(error.data);
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          diplay: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton onClick={deleteMemo}>
          <DeleteOutlinedIcon variant="outlined" color="error" />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onIconChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "unset" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "unset" },
              ".MuiOutlinedInput-root": { fontSize: "0,8rem" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
