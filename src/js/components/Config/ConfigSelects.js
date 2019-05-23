import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ConfigSelects = ({ config, selects, labels, updateConfig }) => {
  return (
    <div className="pa2 ma0 center mw6 bt b--moon-gray flex items-center justify-around">
      {Object.keys(selects).map(key => (
        <div className="flex flex-column justify-between" key={key}>
          <label className="f7" htmlFor={key}>
            {labels[key]}
          </label>
          <select defaultValue={config[key]} name={key} onInput={updateConfig}>
            {selects[key].map((item, index) => (
              <option key={index}>{labels[item]}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

ConfigSelects.propTypes = {
  config: PropTypes.object,
  selects: PropTypes.object,
  updateConfig: PropTypes.func,
  labels: PropTypes.object
};

export default connect(state => state)(ConfigSelects);
