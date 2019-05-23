import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import translate from "../../util/translate";
import {
  ConfigChecks,
  ConfigRanges,
  ConfigSelects,
  Loader,
  Result
} from "./Config";
import getResult from "../store/getResult";
import updateConfig from "../store/updateConfig";

const t = translate(["config"]);

const App = ({ result, loading, dispatch }) => {
  const update = e => updateConfig(e, dispatch);
  return (
    <div className="app-container" data-testid="app-component">
      <fieldset className="pa0 ma0 center mw6">
        <legend>{t("legend")}</legend>
        <div className="pa2 mv0 center flex items-center justify-between">
          <ConfigChecks updateConfig={update} />
          <ConfigRanges updateConfig={update} />
        </div>
        <ConfigSelects updateConfig={update} />
      </fieldset>
      <div className="ma2 flex items-center justify-center">
        {!loading ? (
          <button
            data-testid="config-button"
            onClick={() => getResult(dispatch)}
          >
            {t("confirm")}
          </button>
        ) : (
          <Loader />
        )}
      </div>
      <div className="ma2 tc flex flex-column items-center justify-center">
        <Result result={result} />
      </div>
    </div>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
  result: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(state => state)(hot(module)(App));
