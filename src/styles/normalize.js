import { normalize } from "react-style-reset";
import { injectGlobal } from "emotion";

export default () => {
  injectGlobal(normalize);
  return null;
};
