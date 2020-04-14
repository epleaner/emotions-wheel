import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "theme-ui";
import chroma from "chroma-js";

const EmotionButtons = ({ emotions, onSelect, baseColor }) => {
  const [emotionSelected, setEmotionSelected] = useState();

  const isSelected = ({ label }) => emotionSelected === label;

  const onClick = (emotion) => {
    setEmotionSelected(emotion.label);
    onSelect(emotion);
  };

  return (
    <Box width="100%" my={2}>
      {emotions.map((emotion) => {
        const bgColor = baseColor || emotion.color;
        return (
          <Button
            key={emotion.label}
            sx={{
              bg:
                !emotionSelected || isSelected(emotion)
                  ? bgColor
                  : chroma(bgColor).desaturate(3).hex(),

              boxShadow: isSelected(emotion) && "0px 0px 10px grey",
              ":hover": {
                bg: bgColor,
              },
            }}
            onClick={() => onClick(emotion)}
          >
            {emotion.label}
          </Button>
        );
      })}
    </Box>
  );
};

EmotionButtons.propTypes = {
  emotions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  baseColor: PropTypes.string,
};

export default EmotionButtons;
