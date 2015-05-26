'use strict'

import {Map} from 'immutable'

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
  set (key, value) {
    if (arguments.length === 1) {
      value = key
      if (this.__value__ === value) return this
      return new this.constructor(value)
    }
    const map = this.isMap() ? this.__value__ : new Map()
    const updated = map.set(key, value)
    return updated === map ? this : new this.constructor(updated)
  }
  delete (key) {
    if (!this.isMap()) {
      if (key != null) return this
      if (this.__value__ === undefined) return this
      return new this.constructor(undefined)
    }
    const updated = this.__value__.delete(key)
    return updated === this.__value__ ? this : new this.constructor(updated)
  }
  clear () {
    return new this.constructor()
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
    if (this.isMap()) return new this.constructor(this.__value__.getIn(keyPath, notSetValue))
    return keyPath.length ? this.__value__ : notSetValue
  }
  hasIn (keyPath) {
    if (this.isMap()) return new this.constructor(this.__value__.hasIn(keyPath))
    return !!keyPath.length
  }
}
