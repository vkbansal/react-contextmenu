"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _component = require("flummox/component");

var _component2 = _interopRequireDefault(_component);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

var _menuContainer = require("./menu-container");

var _menuContainer2 = _interopRequireDefault(_menuContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = (_temp = _class = (function (_Component) {
    _inherits(ContextMenu, _Component);

    function ContextMenu() {
        _classCallCheck(this, ContextMenu);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ContextMenu).apply(this, arguments));
    }

    _createClass(ContextMenu, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _component2.default,
                { flux: _flux2.default, connectToStores: ["menu"] },
                _react2.default.createElement(_menuContainer2.default, this.props)
            );
        }
    }]);

    return ContextMenu;
})(_react.Component), _class.propTypes = {
    identifier: _react.PropTypes.string.isRequired
}, _class.displayName = "ContextMenu", _temp);
;

exports.default = ContextMenu;