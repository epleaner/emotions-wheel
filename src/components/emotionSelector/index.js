import React, { useState } from "react";
import { EMOTIONS } from "@static/emotions";

import EmotionButtons from "@components/emotionSelector/emotionButtons";

const getSecondaryEmotions = (coreEmotionSelected) =>
  EMOTIONS.filter(({ label }) => label === coreEmotionSelected.label).shift()
    .secondaryEmotions;

const EmotionSelector = () => {
  const [coreEmotionSelected, setCoreEmotionSelected] = useState();
  const [secondaryEmotionSelected, setSecondaryEmotionSelected] = useState();

  const onSelectCoreEmotion = (emotion) => {
    setCoreEmotionSelected(emotion);
    setSecondaryEmotionSelected();
  };

  const onSelectSecondaryEmotion = (emotion) => {
    setSecondaryEmotionSelected(emotion);
  };

  const onSelectTertiaryEmotion = (emotion) => {
    console.log(emotion);
  };

  return (
    <>
      <EmotionButtons emotions={EMOTIONS} onSelect={onSelectCoreEmotion} />
      {coreEmotionSelected && (
        <EmotionButtons
          emotions={getSecondaryEmotions(coreEmotionSelected)}
          onSelect={onSelectSecondaryEmotion}
          baseColor={coreEmotionSelected.color}
        />
      )}
      {secondaryEmotionSelected && (
        <EmotionButtons
          emotions={secondaryEmotionSelected.tertiaryEmotions}
          onSelect={onSelectTertiaryEmotion}
          baseColor={coreEmotionSelected.color}
        />
      )}
    </>
  );
};

export default EmotionSelector;
