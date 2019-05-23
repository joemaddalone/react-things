import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const ConfigChecks = ({config, checks, labels, updateConfig}) => {
  return (
    <div>
      {checks.map(item => (
        <div key={item}>
          <input
            checked={config[item]}
            onChange={updateConfig}
            name={item}
            type="checkbox"
            id={item}
          />
          <label htmlFor={item}>{labels[item]}</label>
        </div>
      ))}
    </div>
  );
};

ConfigChecks.propTypes = {
  config: PropTypes.object,
	checks: PropTypes.array,
	updateConfig: PropTypes.func,
	labels: PropTypes.object
};

export default connect(state => state)(ConfigChecks);
