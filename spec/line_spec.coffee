sinon = require('sinon')
vows = require('vows')
assert = require('assert')
plotLine = require('../src/line.coffee').plotLine

yields = (x0, y0, x1, y1, points...) ->
  spy = sinon.spy()
  plotLine(x0, y0, x1, y1, spy)
  assert.deepEqual(spy.args, points)

vows.describe('plotLine').addBatch(
  'yields a straight line of points' :
    'for N' : ->
      yields(0, 0, 0, 2, [0,0], [0,1], [0,2])
    'for NNE' : ->
      yields(0, 0, 2, 6, [0,0], [0,1], [1,2], [1,3], [1,4], [2,5], [2,6])
    'for NE' : ->
      yields(0, 0, 2, 2, [0,0], [1,1], [2,2])
    'for ENE' : ->
      yields(0, 0, 6, 2, [0,0], [1,0], [2,1], [3,1], [4,1], [5,2], [6,2])
    'for E' : ->
      yields(0, 0, 2, 0, [0,0], [1,0], [2,0])
    'for ESE' : ->
      yields(0, 0, 6, -2, [0,0], [1,0], [2,-1], [3,-1], [4,-1], [5,-2], [6,-2])
    'for SE' : ->
      yields(0, 0, 2, -2, [0,0], [1,-1], [2,-2])
    'for SSE' : ->
      yields(0, 0, 2, -6, [0,0], [0,-1], [1,-2], [1,-3], [1,-4], [2,-5], [2,-6])
    'for S' : ->
      yields(0, 0, 0, -2, [0,0], [0,-1], [0,-2])
    'for SSW' : ->
      yields(0, 0, -2, -6, [0,0], [0,-1], [-1,-2], [-1,-3], [-1,-4], [-2,-5], [-2,-6])
    'for SW' : ->
      yields(0, 0, -2, -2, [0,0], [-1,-1], [-2,-2])
    'for WSW' : ->
      yields(0, 0, -6, -2, [0,0], [-1,0], [-2,-1], [-3,-1], [-4,-1], [-5,-2], [-6,-2])
    'for W' : ->
      yields(0, 0, -2, 0, [0,0], [-1,0], [-2,0])
    'for WNW' : ->
      yields(0, 0, -6, 2, [0,0], [-1,0], [-2,1], [-3,1], [-4,1], [-5,2], [-6,2])
    'for NW' : ->
      yields(0, 0, -2, 2, [0,0], [-1,1], [-2,2])
    'for NNW' : ->
      yields(0, 0, 2, -6, [0,0], [0,-1], [1,-2], [1,-3], [1,-4], [2,-5], [2,-6])
).export module