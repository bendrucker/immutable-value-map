# immutable-value-map [![Build Status](https://travis-ci.org/bendrucker/immutable-value-map.svg?branch=master)](https://travis-ci.org/bendrucker/immutable-value-map)

> Immutable data structure that can store a primitive value or an Immutable.js Map

ValueMaps are data structures that provide API compatibility with the majority of the [`immutable.Map`](http://facebook.github.io/immutable-js/docs/#/Map) API with special semantics for handling plain values.

## Install

```
$ npm install --save immutable-value-map
```


## Usage

```js
var ValueMap = require('immutable-value-map');
var valueMap = new ValueMap()

valueMap.set(1).get() // 1
valueMap.set('foo', 'bar').get() // Map {foo: 'bar'}
```

## API

##### `new ValueMap([value])` -> `valueMap`

The initial value of the ValueMap. If no `value` is provided, the ValueMap will start with an empty `immutable.Map`.

##### `ValueMap.isValueMap(map)` -> `Boolean`

Checks whether the provided argument is a ValueMap.

##### `isMap()` -> `Boolean`

Checks whether the ValueMap instance contains a map. Returns false if a plain value is stored.

##### `size` -> `Number`

The number of values in the map. If a plain value is stored, this is `0`.

##### `set(key, [value])` -> `valueMap`

If no `value` is provided, `key` is treated as the `value` and a new value map with the `value` is returned. If the `value` is identical to the existing value, the existing ValueMap is returned:

```js
const map = valueMap.set(1)
assert(map === map.set(1))
assert(map !== map.set(2))
```

If two arguments are provided, this proxies to [`map.set`](http://facebook.github.io/immutable-js/docs/#/Map/set).

##### `delete(key)` -> `valueMap`

If no `key` is provided, this sets the internal value to `undefined`. If the internal value is not map and a key is provided, this is a noop. Otherwise, it proxies to [`map.delete`](http://facebook.github.io/immutable-js/docs/#/Map/delete).

##### `clear()` -> `valueMap`

Returns a new empty ValueMap.

##### `update(..arguments)` -> `valueMap`

Proxies to [`map.update`](http://facebook.github.io/immutable-js/docs/#/Map/update).

##### `merge` -> `valueMap`

Proxies to [`map.merge`](http://facebook.github.io/immutable-js/docs/#/Map/merge).

##### `mergeDeep` -> `valueMap`

Proxies to [`map.mergeDeep`](http://facebook.github.io/immutable-js/docs/#/Map/mergeDeep).

##### `mergeDeepWith` -> `valueMap`

Proxies to [`map.mergeDeepWith`](http://facebook.github.io/immutable-js/docs/#/Map/mergeDeepWith).

##### `setIn(keyPath, value)` -> `valueMap`

If the internal value is a plain value and `keyPath` is empty, this is equivalent to calling `valueMap.set(value)`. Otherwise, it proxies to [`map.set`](http://facebook.github.io/immutable-js/docs/#/Map/set).

##### `deleteIn(keyPath)` -> `valueMap`

If the internal value is a plain value and `keyPath` is empty, this is equivalent to calling `valueMap.delete()`. Otherwise, it proxies to [`map.delete`](http://facebook.github.io/immutable-js/docs/#/Map/delete).

##### `updateIn(keyPath, [notSetValue], updater)` -> `valueMap`

If the internal value is a map or `keyPath` has entries, this proxies to [`map.updateIn`](http://facebook.github.io/immutable-js/docs/#/Map/updateIn). If the internal value is a plain value that is `undefined`, the a new ValueMap with `notSetValue` is returned. If the plain value is not `undefined`, `updater` is called on the internal value and a new ValueMap with `updater`'s return value is returned.

##### `mergeIn` -> `valueMap`

Proxies to [`map.mergeIn`](http://facebook.github.io/immutable-js/docs/#/Map/mergeIn).

##### `get([key], notSetValue)` -> `Any`

If no key is provided, the internal value is returned, or `notSetValue` if the internal value is `undefined`. If a `key` is provided but the internal value is a plain value, `notSetValue` is returned. Otherwise, this proxies to [`map.get`](http://facebook.github.io/immutable-js/docs/#/Map/get).

##### `has(key)` -> `Boolean`

Always `false` if the internal value is a plain value. Otherwise, this proxies to [`map.has`](http://facebook.github.io/immutable-js/docs/#/Map/has).

##### `includes(value)` -> `Boolean`

Performs a strict equality check against the internal value if the internal value is a plain value. Otherwise, this proxies to [`map.includes`](http://facebook.github.io/immutable-js/docs/#/Map/includes).

##### `first()` -> `Any`

Always `undefined` if the internal value is a plain value. Otherwise, this proxies to [`map.first`](http://facebook.github.io/immutable-js/docs/#/Map/first).

##### `last()` -> `Any`

Always `undefined` if the internal value is a plain value. Otherwise, this proxies to [`map.last`](http://facebook.github.io/immutable-js/docs/#/Map/last).

##### `getIn(keyPath, notSetValue)` -> `Any`

If the `keyPath` is empty, returns the internal value or `notSetValue` if the internal value is undefined. If `keyPath` is not empty but the internal value is a plain value, this returns `notSetValue`. Otherwise, this proxies to [`map.getIn`](http://facebook.github.io/immutable-js/docs/#/Map/getIn).

##### `hasIn(keyPath, notSetValue)` -> `Boolean`

If the `keyPath` is empty and the internal value is a plain value, this returns `true`. If `keyPath` is not empty but the internal value is a plain value, this returns `false`. Otherwise, this proxies to [`map.hasIn`](http://facebook.github.io/immutable-js/docs/#/Map/hasIn).

##### `toJS() / toJSON()` -> `Any`

Returns the internal value for plain values. Otherwise, this proxies to [`map.toJS`](http://facebook.github.io/immutable-js/docs/#/Map/toJS).

##### `toString()` -> `String`

Returns a pretty printed version of the internal value.

## License

MIT © [Ben Drucker](http://bendrucker.me)
