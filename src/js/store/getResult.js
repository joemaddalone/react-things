import key from "../constants/key";
import rand from "../../util/rand";

const getResult = dispatch => {
  dispatch({ type: "result", payload: null });
  dispatch({ type: "loading", payload: true });
  fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=50`)
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        dispatch({
          type: "result",
          payload: data.data[rand(49)].images.fixed_height_downsampled
        });
        dispatch({ type: "loading", payload: false });
      }, 2500);
    });
};

export default getResult;
