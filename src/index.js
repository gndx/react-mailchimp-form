import React,{useState} from "react"
import jsonp from "jsonp"

export default ({fields, styles, className, buttonClassName, action,
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
  const [status,setStatus] =useState('');
  const [fields,setFields] =useState(fields.map(item => item.name));

  const handleChange = (field,value) => {}
  const handleSubmit = evt => {
    evt.preventDefault();
    const values = fields.map(field => {
      return `${field.name}=${encodeURIComponent(this.state[field.name])}`;
    }).join("&");
    const path = `${action}&${values}`;
    const url = path.replace('/post?', '/post-json?');
    const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    const email = this.state['EMAIL'];
    (!regex.test(email)) ? setStatus("empty") : sendData(url);
  };

  const sendData = url =>  {
    setStatus("sending")
    jsonp(url, { param: "c" }, (err, data) => {
      if (data.msg.includes("already subscribed")) {
        setStatus("duplicate")
      } else if (err) {
        setStatus("error")
      } else if (data.result !== 'success') {
        setStatus("error")
      } else {
        setStatus("success")
      };
    });
  }

    return (
      <form onSubmit={handleSubmit} className={className}>
        {fields.map(input =>
          <input
            {...input}
            key={input.name}
            onChange={({ target }) => handleChange(input.name,target.value)}
            value={fields[input.name].value}
          />
        )}
        <button
          disabled={status === "sending" || status === "success"}
          type="submit"
          className={buttonClassName}
        >
          {messages.button}
        </button>
        <div className='msg-alert'>
          {status === "sending" && <p style={styles.sendingMsg}>{messages.sending}</p>}
          {status === "success" && <p style={styles.successMsg}>{messages.success}</p>}
          {status === "duplicate" && <p style={styles.duplicateMsg}>{messages.duplicate}</p>}
          {status === "empty" && <p style={styles.errorMsg}>{messages.empty}</p>}
          {status === "error" && <p style={styles.errorMsg}>{messages.error}</p>}
        </div>
      </form>
    );
}
