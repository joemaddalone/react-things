import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import translate from "../../../util/translate";

const t = translate(["config"]);

const Result = ({ result, config }) => {
  return (
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
				{key}:{" "}
				<span className="green">{config[key].toString()}</span>
			  </span>
			))}
		  </div>
		</div>
	  </>
	)}
  </div>
  );
};

Result.propTypes = {
  result: PropTypes.object,
  config: PropTypes.object
};

export default connect(state => state)(Result);
