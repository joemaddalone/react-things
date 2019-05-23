import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import key from "../key";

const rand = (n, min = 0) => Math.floor(Math.random() * (n - min + 1)) + min;

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
};

const checks = ["A", "B", "C", "D", "E"];
const ranges = ["F", "G", "H", "I", "J"];
const selects = {
  K: ["L", "M", "N"],
  O: ["P", "Q", "R"],
  S: ["T", "U", "V"]
};

const styles = {
  fieldset: { padding: 0, margin: "0 auto", maxWidth: 500 },
  configuration: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  select: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    borderTop: "1px solid #ccc"
  },
  command: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  result: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "10px"
  },
  rangeBox: {
    borderBottom: "1px solid #f8f8f8",
    width: "100%",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  rangeBoxLabel: { display: "inline-block", width: "120px" },
  selectHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  resultConfig: { margin: 3 },
  resultConfigValue: { color: "green" }
};

const Loader = () => {
  const [message, setMessage] = useState(["Computing"]);
  const messages = ["Computing", "beep", "boop", "beep"];
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
  return <p>{message.join("... ")}</p>
};

const App = () => {
  const [config, setConfig] = useState(defaultConfiguration);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateConfig = e => {
    let val = e.target.value;
    if (e.target.type === "checkbox") {
      val = e.target.checked;
    }
    if (e.target.type === "range") {
      val = +val;
    }
    setConfig({
      ...config,
      [e.target.name]: val
    });
  };

  const getResult = () => {
    setResult(null);
    setLoading(true);
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=50`)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setResult(data.data[rand(49)].images.fixed_height_downsampled);
          setLoading(false);
        }, 2500);
      });
  };

  return (
    <div>
       <fieldset style={styles.fieldset}>
         <legend>Science?</legend>
         <div style={styles.configuration}>
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
               <div style={styles.rangeBox} key={item}>
                 <label style={styles.rangeBoxLabel} htmlFor={item}>
                   {labels[item]} ({config[item]})
                 </label>
                 <input
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
         <div style={styles.configuration}>
           {Object.keys(selects).map(key => (
             <div style={styles.selectHolder} key={key}>
               <label htmlFor={key}>{labels[key]}</label>
               <select name={key} onInput={updateConfig}>
                 {selects[key].map((item, index) => (
                   <option key={index}>{labels[item]}</option>
                 ))}
               </select>
             </div>
           ))}
         </div>
       </fieldset>
     
     <div style={styles.command}>
       {!loading ? (
         <button onClick={getResult}>Confirm Configuration</button>
       ) : (
         <Loader />
       )}
     </div>
     <div style={styles.result}>
       {result && (
         <>
           <div>
             <img
               alt="result"
               src={result.url}
               width={result.width}
               height={result.height}
             />
           </div>
           <div style={{ width: "100%" }}>
             <p>Optimal results based on your configuration</p>
             <div>
               {Object.keys(config).map(key => (
                 <span key={key} style={styles.resultConfig}>
                   {key}: <span style={styles.resultConfigValue}>{config[key].toString()}</span>
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

export default hot(module)(App);