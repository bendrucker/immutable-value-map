'use strict'

import test from 'tape'
import ValueMap from '../'

test((t) => {
  t.test('set', (t) => {
    t.test('value', (t) => {
      const val = new ValueMap(1)
      t.equal(val.set(1), val, '=== when unchanged')
      t.notEqual(val.set(2), val, '!== when changed')
      t.end()
    })
    t.test('map', (t) => {
      const map = new ValueMap()
      const updated = map.set('foo', 'bar')
      t.equal(updated.set('foo', 'bar'), updated, '=== when unchanged')
      t.notEqual(map, updated, '!== when changed')
      t.end()
    })
    t.end()
  })
  t.end()
})
