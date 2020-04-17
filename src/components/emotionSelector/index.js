import React, { useState } from "react";
import { Flex, Box, Button, Input, Text } from "theme-ui";
import { EMOTIONS } from "@static/emotions";

import EmotionButtons from "@components/emotionSelector/emotionButtons";

const getSecondaryEmotions = (coreEmotionSelected) =>
  EMOTIONS.filter(({ label }) => label === coreEmotionSelected.label).shift()
    .secondaryEmotions;

const EmotionSelector = () => {
  const [note, setNote] = useState("");
  const [coreEmotionSelected, setCoreEmotionSelected] = useState(false);
  const [secondaryEmotionSelected, setSecondaryEmotionSelected] = useState(
    false
  );
  const [tertiaryEmotionSelected, setTertiaryEmotionSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false });

  const onSelectCoreEmotion = (emotion) => {
    setCoreEmotionSelected(emotion);
    setSecondaryEmotionSelected(false);
  };

  const onSelectSecondaryEmotion = (emotion) => {
    setSecondaryEmotionSelected(emotion);
  };

  const onSelectTertiaryEmotion = (emotion) => {
    setTertiaryEmotionSelected(emotion);
  };

  const onSubmitOk = () => {
    setCoreEmotionSelected(false);
    setSecondaryEmotionSelected(false);
    setTertiaryEmotionSelected(false);
    setNote("");
  };

  const submitEmotions = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const body = { emotion: tertiaryEmotionSelected, note };

    const res = await fetch("/api/emotions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseJson = await res.json();

    setFormStatus({ submitted: true, ...responseJson });

    if (responseJson.ok) {
      onSubmitOk();
    }

    setIsSubmitting(false);
  };

  return (
    <Box mx={[2, 0]}>
      {formStatus.submitted ? (
        <>
          <Flex sx={{ justifyContent: "center", width: "100%" }}>
            {formStatus.ok ? (
              <Text>Thanks for sharing.</Text>
            ) : (
              <Text color="warning">Something went wrong.</Text>
            )}
          </Flex>
          <Flex sx={{ justifyContent: "center", width: "100%" }}>
            <Button
              type="button"
              onClick={() => setFormStatus({ submitted: false })}
            >
              {formStatus.ok ? "Add another?" : "Try again?"}
            </Button>
          </Flex>
        </>
      ) : (
        <form onSubmit={submitEmotions}>
          <Text>I'm feeling...</Text>
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
          {tertiaryEmotionSelected && (
            <>
              <Input
                sx={{ marginTop: 3 }}
                id="note"
                type="text"
                placeholder="Want to talk about it?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Flex sx={{ justifyContent: "center" }}>
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Flex>
            </>
          )}
        </form>
      )}
    </Box>
  );
};

export default EmotionSelector;
