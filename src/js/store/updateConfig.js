const updateConfig = (e, dispatch) => {
  let val = e.target.value;
  if (e.target.type === "checkbox") {
    val = e.target.checked;
  }
  if (e.target.type === "range") {
    val = +val;
  }

  dispatch({
    type: "config",
    payload: {
      [e.target.name]: val
    }
  });
};

export default updateConfig;
