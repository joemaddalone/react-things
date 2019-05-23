import { createStore } from "redux";
import translate from "../util/translate";

const t = translate(["labels"]);

const labels = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V"
].reduce((accum, cur) => {
  accum[cur] = t(cur);
  return accum;
}, {});


const defaultConfiguration = {
  config: {
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: null,
    O: null,
	S: null,
	K: t('L'),
    O: t('P'),
    S: t('T')

  },
  checks: ["A", "B", "C", "D", "E"],
  ranges: ["F", "G", "H", "I", "J"],
  selects: {
    K: ["L", "M", "N"],
    O: ["P", "Q", "R"],
    S: ["T", "U", "V"]
  },
  labels,
  loading: false,
  result: null
};

const reducer = (state = defaultConfiguration, action) => {
  switch (action.type) {
    case "config":
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      };

    case "loading":
      return {
        ...state,
        loading: action.payload
      };
    case "result":
      return {
        ...state,
        result: action.payload
      };

    default:
      return state;
  }
};

export default createStore(reducer);
