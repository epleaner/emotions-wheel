import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex, Button } from "theme-ui";
import chroma from "chroma-js";

const EmotionButtons = ({ emotions, onSelect, baseColor }) => {
  const [emotionSelected, setEmotionSelected] = useState();

  const isSelected = ({ label }) => emotionSelected === label;

  const onClick = (emotion) => {
    setEmotionSelected(emotion.label);
    onSelect(emotion);
  };

  return (
    <Flex
      sx={{
        width: "100%",
        my: 2,
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {emotions.map((emotion, index) => {
        const bgColor = baseColor || emotion.color;
        return (
          <Button
            key={emotion.label}
            type="button"
            mr={index < emotions.length - 1 && 2}
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
    </Flex>
  );
};

EmotionButtons.propTypes = {
  emotions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  baseColor: PropTypes.string,
};

export default EmotionButtons;
