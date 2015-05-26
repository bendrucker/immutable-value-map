'use strict'

import test from 'tape'
import {fromJS} from 'immutable'
import ValueMap from '../'

test((t) => {
  t.test('set', (t) => {
    t.test('value', (t) => {
      const val = new ValueMap(1)
      t.equal(val.set(1), val)
      t.notEqual(val.set(2), val)
      t.end()
    })
    t.test('map', (t) => {
      const map = new ValueMap()
      const updated = map.set('foo', 'bar')
      t.equal(updated.set('foo', 'bar'), updated)
      t.notEqual(map, updated)
      t.end()
    })
    t.end()
  })
  t.test('delete', (t) => {
    t.test('value', (t) => {
      const val = new ValueMap(1)
      t.equal(val, val.delete('foo'))
      t.equal(val.delete('foo').get(), 1)
      const deleted = val.delete()
      t.notEqual(val, deleted)
      t.equal(deleted.get(), undefined)
      t.end()
    })
    t.test('map', (t) => {
      const map = new ValueMap().set('foo', 'bar')
      t.equal(map, map.delete('bar'))
      t.notEqual(map, map.delete('foo'))
      t.notOk(map.delete('foo').has('foo'))
      t.end()
    })
    t.end()
  })
  t.test('clear', (t) => {
    const val = new ValueMap()
    t.equal(val.set('foo', 'bar').clear().size, 0)
    t.end()
  })
  t.test('get', (t) => {
    t.test('value', (t) => {
      const val = new ValueMap(1)
      t.equal(val.get(), 1)
      t.equal(val.get('foo', null), null)
      t.end()
    })
    t.test('map', (t) => {
      let map = new ValueMap().set('foo', 'bar')
      t.equal(map.get('foo'), 'bar')
      t.equal(map.get('bar', null), null)
      map = map.set('foo', fromJS({bar: 'baz'}))
      t.notOk(ValueMap.isValueMap(map.get('foo')))
      t.equal(map.get('foo').get('bar'), 'baz')
      t.end()
    })
  })
  t.test('has', (t) => {
    t.notOk(new ValueMap('foo').has('toString'))
    t.ok(new ValueMap().set('foo', 'bar').has('foo'))
    t.notOk(new ValueMap().set('bar', 'baz').has('foo'))
    t.end()
  })
  t.test('includes', (t) => {
    t.notOk(new ValueMap('foo').includes('foo'))
    t.ok(new ValueMap().set('foo', 'bar').includes('bar'))
    t.notOk(new ValueMap().set('bar', 'baz').includes('foo'))
    t.end()
  })
  t.end()
})
