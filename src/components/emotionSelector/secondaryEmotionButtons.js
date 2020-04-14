import React, { useState } from "react";
import { Flex, Button } from "theme-ui";
import chroma from "chroma-js";

const SecondaryEmotionButtons = () => {
  const [coreEmotionSelected, setCoreEmotionSelected] = useState();
  const coreEmotions = [
    { label: "Suprise", color: "#F5C480" },
    { label: "Joy", color: "#5FD34D" },
    { label: "Love", color: "#F0E650" },
    { label: "Fear", color: "#7062A9" },
    { label: "Anger", color: "#FF625E" },
    { label: "Sadness", color: "#427DA3" },
  ];

  const isSelected = ({ label }) => coreEmotionSelected === label;

  return (
    <Flex>
      {coreEmotions.map((emotion) => (
        <Button
          key={emotion.label}
          sx={{
            bg:
              !coreEmotionSelected || isSelected(emotion)
                ? emotion.color
                : chroma(emotion.color).desaturate(3).hex(),

            boxShadow: isSelected(emotion) && "0px 0px 10px grey",
            ":hover": {
              bg: emotion.color,
            },
          }}
          onClick={() => setCoreEmotionSelected(emotion.label)}
        >
          {emotion.label}
        </Button>
      ))}
    </Flex>
  );
};

export default SecondaryEmotionButtons;
