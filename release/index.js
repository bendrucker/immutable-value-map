'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _immutable = require('immutable');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

'use strict';

var ValueMap = (function () {
  function ValueMap(value) {
    _classCallCheck(this, ValueMap);

    this.__value__ = arguments.length ? value : new _immutable.Map();
    this.__valueMap__ = true;
  }

  _createClass(ValueMap, [{
    key: 'isMap',
    value: function isMap() {
      return _immutable.Map.isMap(this.__value__);
    }
  }, {
    key: 'size',
    get: function () {
      return this.isMap() ? this.__value__.size : 0;
    }
  }, {
    key: '__setValue__',
    value: function __setValue__(value) {
      return value === this.__value__ ? this : new this.constructor(value);
    }
  }, {
    key: '__set__',
    value: function __set__(updater) {
      var updated = updater.call(this, this.__value__);
      return updated === this.__value__ ? this : new this.constructor(updated);
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      var _this = this;

      _assert2['default'](typeof key !== 'function', 'key may not be a function');
      if (arguments.length === 1) {
        value = key;
        return this.__setValue__(value, true);
      }
      return this.__set__(function (oldValue) {
        return (_this.isMap() ? oldValue : new _immutable.Map()).set(key, value);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      if (!this.isMap()) {
        if (key != null) return this;
        return this.__setValue__(undefined);
      }
      return this.__set__(function (value) {
        return value['delete'](key);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (!this.isMap()) return this.__setValue__(new _immutable.Map());
      return this.__set__(function (value) {
        return value.clear();
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _arguments = arguments;

      var _ref;

      if (!this.isMap()) return (_ref = new this.constructor()).update.apply(_ref, arguments);
      return this.__set__(function (value) {
        return value.update.apply(value, _arguments);
      });
    }
  }, {
    key: 'merge',
    value: function merge() {
      var _ref2;

      for (var _len = arguments.length, iterables = Array(_len), _key = 0; _key < _len; _key++) {
        iterables[_key] = arguments[_key];
      }

      if (!this.isMap()) return (_ref2 = new this.constructor()).merge.apply(_ref2, iterables);
      return this.__set__(function (value) {
        return value.merge.apply(value, iterables);
      });
    }
  }, {
    key: 'mergeDeep',
    value: function mergeDeep() {
      var _ref3;

      for (var _len2 = arguments.length, iterables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        iterables[_key2] = arguments[_key2];
      }

      if (!this.isMap()) return (_ref3 = new this.constructor()).mergeDeep.apply(_ref3, iterables);
      return this.__set__(function (value) {
        return value.mergeDeep.apply(value, iterables);
      });
    }
  }, {
    key: 'mergeDeepWith',
    value: function mergeDeepWith(merger) {
      var _ref4;

      for (var _len3 = arguments.length, iterables = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        iterables[_key3 - 1] = arguments[_key3];
      }

      if (!this.isMap()) return (_ref4 = new this.constructor()).mergeDeepWith.apply(_ref4, [merger].concat(iterables));
      return this.__set__(function (value) {
        return value.mergeDeepWith.apply(value, [merger].concat(iterables));
      });
    }
  }, {
    key: 'setIn',
    value: function setIn(keyPath, value) {
      if (this.isMap()) return this.__set__(function (oldValue) {
        return oldValue.setIn(keyPath, value);
      });
      if (keyPath.length) return new this.constructor().setIn(keyPath, value);
      return this.__setValue__(value);
    }
  }, {
    key: 'deleteIn',
    value: function deleteIn(keyPath) {
      if (!this.isMap()) {
        return keyPath.length ? this : this.__setValue__(undefined);
      }
      return this.__set__(function (value) {
        return value.deleteIn(keyPath);
      });
    }
  }, {
    key: 'updateIn',
    value: function updateIn(keyPath, notSetValue, updater) {
      if (arguments.length < 3) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      if (this.isMap()) {
        return this.__set__(function (value) {
          return value.updateIn(keyPath, notSetValue, updater);
        });
      }
      if (keyPath.length) {
        return new this.constructor().updateIn(keyPath, notSetValue, updater);
      }
      if (this.__value__ === undefined) {
        return this.__setValue__(notSetValue);
      }
      return this.__set__(updater);
    }
  }, {
    key: 'mergeIn',
    value: function mergeIn(keyPath) {
      var _ref5;

      for (var _len4 = arguments.length, iterables = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        iterables[_key4 - 1] = arguments[_key4];
      }

      if (this.isMap()) return this.__set__(function (value) {
        return value.mergeIn.apply(value, [keyPath].concat(iterables));
      });
      return (_ref5 = new this.constructor()).mergeIn.apply(_ref5, [keyPath].concat(iterables));
    }
  }, {
    key: 'get',
    value: function get(key, notSetValue) {
      if (key == null) {
        var value = this.__value__;
        return typeof value === 'undefined' ? notSetValue : value;
      }
      return this.isMap() ? this.__value__.get(key, notSetValue) : notSetValue;
    }
  }, {
    key: 'has',
    value: function has(key) {
      return this.isMap() ? this.get().has(key) : false;
    }
  }, {
    key: 'includes',
    value: function includes(value) {
      return this.isMap() ? this.get().includes(value) : this.get() === value;
    }
  }, {
    key: 'first',
    value: function first() {
      return this.isMap() ? this.get().first() : undefined;
    }
  }, {
    key: 'last',
    value: function last() {
      return this.isMap() ? this.get().last() : undefined;
    }
  }, {
    key: 'getIn',
    value: function getIn(keyPath, notSetValue) {
      if (this.isMap()) return this.get().getIn(keyPath, notSetValue);
      return !keyPath.length ? this.get(undefined, notSetValue) : notSetValue;
    }
  }, {
    key: 'hasIn',
    value: function hasIn(keyPath) {
      if (this.isMap()) return this.get().hasIn(keyPath);
      return !keyPath.length;
    }
  }, {
    key: 'toJS',
    value: function toJS() {
      return this.isMap() ? this.get().toJS() : this.get();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.toJS();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'ValueMap<' + this.get().toString() + '>';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }], [{
    key: 'isValueMap',
    value: function isValueMap(map) {
      return !!(map && map.__valueMap__);
    }
  }]);

  return ValueMap;
})();

exports['default'] = ValueMap;
module.exports = exports['default'];