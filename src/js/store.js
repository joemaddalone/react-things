import { createStore } from "redux";

const labels = {
  A: "Analog",
  B: "Binary",
  C: "Cogent",
  D: "Divisor",
  E: "Element",
  F: "Fractional",
  G: "Geometric",
  H: "Hemisphere",
  I: "Intergenic",
  J: "Juxtapose",
  K: "Kaleidoscopy",
  L: "Lithium",
  M: "Magnitude",
  N: "Non-deterministic",
  O: "Orthogonal",
  P: "Propensity",
  Q: "Quaternary",
  R: "Relative",
  S: "Splice",
  T: "Twice",
  U: "Unce",
  V: "Vertex"
};

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
    K: labels.L,
    O: labels.P,
    S: labels.T
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
