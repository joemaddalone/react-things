import React, { useState, useEffect } from "react";
import translate from "../../../util/translate";
const t = translate(["loading"]);

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

export default Loader;
