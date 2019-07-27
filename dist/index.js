(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "jsonp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("jsonp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.jsonp);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _jsonp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _jsonp2 = _interopRequireDefault(_jsonp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = function (_ref) {
    var fields = _ref.fields,
        className = _ref.className,
        buttonClassName = _ref.buttonClassName,
        action = _ref.action,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {
      sending: "Sending...",
      success: "Thank you for subscribing!",
      error: "An unexpected internal error has occurred.",
      empty: "You must write an e-mail.",
      duplicate: "Too many subscribe attempts for this email address",
      button: "Subscribe!"
    } : _ref$messages,
        _ref$styles = _ref.styles,
        styles = _ref$styles === undefined ? {
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
    } : _ref$styles;

    var _useState = (0, _react.useState)(""),
        _useState2 = _slicedToArray(_useState, 2),
        status = _useState2[0],
        setStatus = _useState2[1];

    var _useState3 = (0, _react.useState)(fields),
        _useState4 = _slicedToArray(_useState3, 2),
        formFields = _useState4[0],
        setFormFields = _useState4[1];

    var regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    var getValue = function getValue(key) {
      return formFields.filter(function (f) {
        return f.name === key;
      })[0].value;
    };
    var handleChange = function handleChange(field, value) {
      var updatedFields = formFields.map(function (f) {
        return f.name === field.name ? _extends({}, f, { value: value }) : f;
      });
      setFormFields(updatedFields);
    };
    var handleSubmit = function handleSubmit(evt) {
      evt.preventDefault();
      var values = formFields.map(function (field) {
        return field.name + "=" + encodeURIComponent(getValue(field.name));
      }).join("&");
      var url = (action + "&" + values).replace("/post?", "/post-json?");
      var email = getValue("EMAIL");
      !regex.test(email) ? setStatus("empty") : sendData(url);
    };

    var sendData = function sendData(url) {
      setStatus("sending");
      (0, _jsonp2.default)(url, { param: "c" }, function (err, data) {
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

    return _react2.default.createElement(
      "form",
      { onSubmit: handleSubmit, className: className },
      formFields && Array.isArray(formFields) && formFields.map(function (input) {
        return _react2.default.createElement("input", _extends({}, input, {
          key: input.name,
          onChange: function onChange(_ref2) {
            var target = _ref2.target;
            return handleChange(input, target.value);
          },
          value: formFields.filter(function (item) {
            return item.name === input.name;
          }).value
        }));
      }),
      _react2.default.createElement(
        "button",
        {
          disabled: status === "sending" || status === "success",
          type: "submit",
          className: buttonClassName
        },
        messages.button
      ),
      _react2.default.createElement(
        "div",
        { className: "msg-alert" },
        status === "sending" && _react2.default.createElement(
          "p",
          { style: styles.sendingMsg },
          messages.sending
        ),
        status === "success" && _react2.default.createElement(
          "p",
          { style: styles.successMsg },
          messages.success
        ),
        status === "duplicate" && _react2.default.createElement(
          "p",
          { style: styles.duplicateMsg },
          messages.duplicate
        ),
        status === "empty" && _react2.default.createElement(
          "p",
          { style: styles.errorMsg },
          messages.empty
        ),
        status === "error" && _react2.default.createElement(
          "p",
          { style: styles.errorMsg },
          messages.error
        )
      )
    );
  };
});