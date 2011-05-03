vows = require('vows')
assert = require('assert')
sinon = require('sinon')
Turtle = require('../public/app.js').Turtle

vows.describe('Turtle').addBatch(
  'with a drawing' :
    
    'draws while the pen is down' : ->
      calls = []
      drawing = {
        setPenColour: (r,g,b) -> calls.push ['setPenColour', r, g, b]
        drawTo: (x, y)        -> calls.push ['drawTo', x, y]
        moveTo: (x, y)        -> calls.push ['moveTo', x, y]
        rotateTo: (radians)   -> calls.push ['rotateTo', radians]
        clear: ->
      }
      turtle = new Turtle(drawing)
      turtle.pencolour('red')
      turtle.forward(50)
      turtle.right(90)
      turtle.forward(50)
      turtle.right(90)
      turtle.penup()
      turtle.forward(25)
      turtle.pendown()
      turtle.forward(25)
      assert.deepEqual(calls, [
        ['setPenColour', 255,0,0],
        ['drawTo',    50, 0],
        ['rotateTo',  1.57],
        ['drawTo',    50, 50],
        ['rotateTo',  3.14],
        ['moveTo',    25, 50],
        ['drawTo',    0, 50]
      ])
      
).export module