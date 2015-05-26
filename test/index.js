'use strict'

import test from 'tape'
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
    t.end()
  })
  t.test('clear', (t) => {
    const val = new ValueMap()
    t.equal(val.set('foo', 'bar').clear().size, 0)
    t.end()
  })
  t.end()
})
