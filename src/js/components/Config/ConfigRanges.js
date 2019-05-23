import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import "./ConfigRanges.css";

const ConfigRanges = ({ranges, config, labels, updateConfig}) => {
  return (
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
		  value={config[item]}
		  min={0}
		  max={99}
		  id={item}
		/>
	  </div>
	))}
  </div>
  );
};

ConfigRanges.propTypes = {
	config: PropTypes.object,
	ranges: PropTypes.array,
	updateConfig: PropTypes.func,
	labels: PropTypes.object
};

export default connect(state => state)(ConfigRanges);
