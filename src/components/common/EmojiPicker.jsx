import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ icon, onIconChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((val) => codesArray.push("0x" + val));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    onIconChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
