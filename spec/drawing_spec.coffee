vows = require('vows')
assert = require('assert')
sinon = require('sinon')
{plotLine, Drawing} = require('../public/app.js')

vows.describe('Drawing').addBatch(
  'with a pen and ink' :
    
    'draws lines with the ink' : ->
      pen =
        redraw: ->
      ink = sinon.mock(
        draw: ->
      )
      plotLine(0,0,4,3, (x,y) ->
        ink.expects('draw').withArgs(y,-x)
      )
      new Drawing(pen, ink.object, plotLine).drawTo(4,3)
      ink.verify()
    
    'draws with coloured ink' : ->
      pen =
        redraw: ->
      ink = sinon.mock(
        draw: ->
      )
      drawing = new Drawing(pen, ink.object, plotLine)
      drawing.setPenColour(1,2,3)
      ink.expects('draw').withExactArgs(0, 0, [1,2,3])
      drawing.drawTo(0,0)
      drawing.setPenColour(4,5,6)
      ink.expects('draw').withExactArgs(0, 0, [4,5,6])
      drawing.drawTo(0,0)
      ink.verify()

    'moves and rotates the pen' : ->
      pen = sinon.mock(
        redraw: ->
      )
      ink = sinon.stub(
        draw: ->
      )
      pen.expects("redraw").withArgs(0,0,0)
      drawing = new Drawing(pen.object, ink, plotLine)
      pen.expects("redraw").withArgs(0,0,90)
      drawing.rotateTo(90)
      pen.expects("redraw").withArgs(0,0,1)
      drawing.rotateTo(1)
      pen.verify()

).export module