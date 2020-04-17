import React from "react";
import PropTypes from "prop-types";

import EmotionListItem from "@components/emotionList/emotionListItem";

const EmotionList = ({ emotions }) => {
  console.log(emotions);
  return (
    <ul>
      {emotions.map((emotion) => {
        console.log("in map", emotion);
        return <EmotionListItem key={emotion.date} emotionData={emotion} />;
      })}
    </ul>
  );
};

EmotionList.propTypes = {
  emotions: PropTypes.array.isRequired,
};

export default EmotionList;
