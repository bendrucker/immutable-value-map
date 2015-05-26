'use strict'

import {Map} from 'immutable'
import assert from 'assert'

export default class ValueMap {
  constructor (value) {
    this.__value__ = arguments.length ? value : new Map()
    this.__valueMap__ = true
  }
  static isValueMap (map) {
    return !!(map && map.__valueMap__)
  }
  isMap () {
    return Map.isMap(this.__value__)
  }
  get size () {
    return this.isMap() ? this.__value__.size : 0
  }
  __set__ (updater) {
    if (typeof updater !== 'function') {
      const value = updater
      return value === this.__value__ ? this : new this.constructor(value)
    }
    const updated = updater.call(this, this.__value__)
    return updated === this.__value__ ? this : new this.constructor(updated)
  }
  set (key, value) {
    assert(typeof key !== 'function', 'key may not be a function')
    if (arguments.length === 1) {
      value = key
      return this.__set__(value)
    }
    return this.__set__((oldValue) => {
      return (this.isMap() ? oldValue : new Map()).set(key, value)
    })
  }
  delete (key) {
    if (!this.isMap()) {
      if (key != null) return this
      if (this.__value__ === undefined) return this
      return new this.constructor(undefined)
    }
    return this.__set__(value => value.delete(key))
  }
  clear () {
    return new this.constructor()
  }
  update () {
    if (!this.isMap()) return new this.constructor().update(...arguments)
    return this.__set__(value => value.update(...arguments))
  }
  merge (...iterables) {
    if (!this.isMap()) return new this.constructor().merge(...iterables)
    return this.__set__(value => value.merge(...iterables))
  }
  mergeDeep (...iterables) {
    if (!this.isMap()) return new this.constructor().mergeDeep(...iterables)
    return this.__set__(value => value.mergeDeep(...iterables))
  }
  mergeDeepWith (merger, ...iterables) {
    if (!this.isMap()) return new this.constructor().mergeDeepWith(merger, ...iterables)
    return this.__set__(value => value.mergeDeepWith(merger, ...iterables))
  }
  get (key, notSetValue) {
    if (key == null) return this.__value__
    return this.isMap() ? this.__value__.get(key, notSetValue) : notSetValue
  }
  has (key) {
    return this.isMap() ? this.__value__.has(key) : false
  }
  includes (key) {
    return this.isMap() ? this.__value__.includes(key) : false
  }
  first () {
    return this.isMap() ? this.__value__.first() : undefined
  }
  last () {
    return this.isMap() ? this.__value__.last() : undefined
  }
  getIn (keyPath, notSetValue) {
    if (this.isMap()) return this.__value__.getIn(keyPath, notSetValue)
    return !keyPath.length ? this.__value__ : notSetValue
  }
  hasIn (keyPath) {
    if (this.isMap()) return this.__value__.hasIn(keyPath)
    return !keyPath.length
  }
}
