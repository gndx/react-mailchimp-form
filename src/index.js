import React, { useState } from "react";
import jsonp from "jsonp";

export default ({
  fields,
  className,
  buttonClassName,
  action,
  messages = {
    sending: "Sending...",
    success: "Thank you for subscribing!",
    error: "An unexpected internal error has occurred.",
    empty: "You must write an e-mail.",
    duplicate: "Too many subscribe attempts for this email address",
    button: "Subscribe!"
  },
  styles = {
    sendingMsg: {
      color: "#0652DD"
    },
    successMsg: {
      color: "#009432"
    },
    duplicateMsg: {
      color: "#EE5A24"
    },
    errorMsg: {
      color: "#ED4C67"
    }
  }
}) => {
  const [status, setStatus] = useState("");
  const [formFields, setFormFields] = useState(fields);
  const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
  const getValue = key => formFields.filter(f => f.name === key)[0].value;
  const handleChange = (field, value) => {
    const updatedFields = formFields.map(f => {
      return f.name === field.name ? { ...f, value } : f;
    });
    setFormFields(updatedFields);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const values = formFields
      .map(field => {
        return `${field.name}=${encodeURIComponent(getValue(field.name))}`;
      })
      .join("&");
    const url = `${action}&${values}`.replace("/post?", "/post-json?");
    const email = getValue("EMAIL");
    !regex.test(email) ? setStatus("empty") : sendData(url);
  };

  const sendData = url => {
    setStatus("sending");
    jsonp(url, { param: "c" }, (err, data) => {
      if (data.msg.includes("already subscribed")) {
        setStatus("duplicate");
      } else if (err) {
        setStatus("error");
      } else if (data.result !== "success") {
        setStatus("error");
      } else {
        setStatus("success");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {formFields &&
        Array.isArray(formFields) &&
        formFields.map(input => (
          <input
            {...input}
            key={input.name}
            onChange={({ target }) => handleChange(input, target.value)}
            value={formFields.filter(item => item.name === input.name).value}
          />
        ))}
      <button
        disabled={status === "sending" || status === "success"}
        type="submit"
        className={buttonClassName}
      >
        {messages.button}
      </button>
      <div className="msg-alert">
        {status === "sending" && (
          <p style={styles.sendingMsg}>{messages.sending}</p>
        )}
        {status === "success" && (
          <p style={styles.successMsg}>{messages.success}</p>
        )}
        {status === "duplicate" && (
          <p style={styles.duplicateMsg}>{messages.duplicate}</p>
        )}
        {status === "empty" && <p style={styles.errorMsg}>{messages.empty}</p>}
        {status === "error" && <p style={styles.errorMsg}>{messages.error}</p>}
      </div>
    </form>
  );
};
