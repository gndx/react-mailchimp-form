(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "jsonp", "prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("jsonp"), require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.jsonp, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _jsonp, _propTypes) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _jsonp2 = _interopRequireDefault(_jsonp);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Mailchimp = function (_React$Component) {
    _inherits(Mailchimp, _React$Component);

    function Mailchimp(props) {
      _classCallCheck(this, Mailchimp);

      var _this = _possibleConstructorReturn(this, (Mailchimp.__proto__ || Object.getPrototypeOf(Mailchimp)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(Mailchimp, [{
      key: "handleSubmit",
      value: function handleSubmit(evt) {
        var _this2 = this;

        evt.preventDefault();
        var _props = this.props,
            fields = _props.fields,
            action = _props.action;

        var values = fields.map(function (field) {
          return field.name + "=" + encodeURIComponent(_this2.state[field.name]);
        }).join("&");
        var path = action + "&" + values;
        var url = path.replace('/post?', '/post-json?');
        var regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
        var email = this.state['EMAIL'];
        !regex.test(email) ? this.setState({ status: "empty" }) : this.sendData(url);
      }
    }, {
      key: "sendData",
      value: function sendData(url) {
        var _this3 = this;

        this.setState({ status: "sending" });
        (0, _jsonp2.default)(url, { param: "c" }, function (err, data) {
          if (data.msg.includes("already subscribed")) {
            _this3.setState({ status: 'duplicate' });
          } else if (err) {
            _this3.setState({ status: 'error' });
          } else if (data.result !== 'success') {
            _this3.setState({ status: 'error' });
          } else {
            _this3.setState({ status: 'success' });
          };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _props2 = this.props,
            messages = _props2.messages,
            fields = _props2.fields,
            styles = _props2.styles,
            className = _props2.className;
        var status = this.state.status;

        return _react2.default.createElement(
          "form",
          { onSubmit: this.handleSubmit.bind(this), className: className },
          fields.map(function (input) {
            return _react2.default.createElement("input", { key: Math.random(),
              onBlur: function onBlur(_ref) {
                var target = _ref.target;
                return _this4.setState(_defineProperty({}, input.name, target.value));
              },
              placeholder: input.placeholder,
              name: input.name,
              type: input.type,
              defaultValue: _this4.state[input.name] });
          }),
          _react2.default.createElement(
            "button",
            {
              disabled: status === "sending" || status === "success",
              type: "submit"
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
      }
    }]);

    return Mailchimp;
  }(_react2.default.Component);

  Mailchimp.defaultProps = {
    messages: {
      sending: "Sending...",
      success: "Thank you for subscribing!",
      error: "An unexpected internal error has occurred.",
      empty: "You must write an e-mail.",
      duplicate: "Too many subscribe attempts for this email address",
      button: 'Subscribe!'
    },
    styles: {
      sendingMsg: {
        color: '#0652DD'
      },
      successMsg: {
        color: '#009432'
      },
      duplicateMsg: {
        color: '#EE5A24'
      },
      errorMsg: {
        color: '#ED4C67'
      }
    }
  };

  Mailchimp.propTypes = {
    action: _propTypes2.default.string,
    messages: _propTypes2.default.object,
    fields: _propTypes2.default.array,
    styles: _propTypes2.default.object,
    className: _propTypes2.default.string
  };

  exports.default = Mailchimp;
});