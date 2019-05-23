import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import key from "../key";
import translate from "../../util/translate";
const t = translate(["labels", "config", "loading"]);
import "./App.css";

const rand = (n, min = 0) => Math.floor(Math.random() * (n - min + 1)) + min;

const Loader = () => {
  const [message, setMessage] = useState([t("computing")]);
  const messages = [t("computing"), t("beep"), t("boop"), t("beep")];
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (message.length === messages.length) {
        setMessage(messages.slice(0, 1));
      } else {
        setMessage(messages.slice(0, message.length + 1));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [messages, message]);
  return <p>{message.join("... ")}</p>;
};

const App = ({
  config,
  selects,
  ranges,
  checks,
  labels,
  result,
  loading,
  dispatch
}) => {
  const updateConfig = e => {
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

  const getResult = () => {
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

  return (
    <div className="app-container" data-testid="app-component">
      <fieldset className="pa0 ma0 center mw6">
        <legend>{t("legend")}</legend>
        <div className="pa2 mv0 center flex items-center justify-between">
          <div>
            {checks.map(item => (
              <div key={item}>
                <input
                  onChange={updateConfig}
                  name={item}
                  type="checkbox"
                  id={item}
                />
                <label htmlFor={item}>{labels[item]}</label>
              </div>
            ))}
          </div>
          <div>
            {ranges.map(item => (
              <div className="range-box w-100 bb b--moon-gray  flex items-center justify-center" key={item}>
                <label htmlFor={item} className="dib w4">
                  {labels[item]} ({config[item]})
                </label>
                <input
                  id={item}
                  onChange={updateConfig}
                  name={item}
                  type="range"
                  defaultValue={0}
                  min={0}
                  max={99}
                  id={item}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pa2 ma0 center mw6 bt b--moon-gray flex items-center justify-around">
          {Object.keys(selects).map(key => (
            <div className="flex flex-column justify-between" key={key}>
              <label className="f7" htmlFor={key}>{labels[key]}</label>
              <select name={key} onInput={updateConfig}>
                {selects[key].map((item, index) => (
                  <option key={index}>{labels[item]}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="ma2 flex items-center justify-center">
        {!loading ? (
          <button data-testid="config-button" onClick={getResult}>
            {t("confirm")}
          </button>
        ) : (
          <Loader />
        )}
      </div>
      <div className="ma2 tc flex flex-column items-center justify-center">
        {result && (
          <>
            <div>
              <img
                data-testid="result-image"
                alt="result"
                src={result.url}
                width={result.width}
                height={result.height}
              />
            </div>
            <div style={{ width: "100%" }}>
              <p>{t("results")}</p>
              <div>
                {Object.keys(config).map(key => (
                  <span key={key} className="ma1">
                    {key}: <span className="green">{config[key].toString()}</span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

App.propTypes = {
  config: PropTypes.object,
  ranges: PropTypes.array,
  checks: PropTypes.array,
  selects: PropTypes.object,
  labels: PropTypes.object,
  dispatch: PropTypes.func,
  result: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(state => state)(hot(module)(App));
