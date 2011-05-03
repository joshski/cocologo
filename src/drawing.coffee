class Drawing
  constructor: (@pen, @ink, @plotLine) ->
    @penColour = [0,0,0]
    @rotation = 0
    this.moveTo(0,0)
  drawTo: (x, y) ->
    @plotLine(@y, -@x, y, -x, (px, py) =>
      @ink.draw(px, py, @penColour)
    )
    this.moveTo(x, y)
  moveTo: (x, y) ->
    @x = x
    @y = y
    this.redraw()
  rotateTo: (radians) ->
    @rotation = radians
    this.redraw()
  redraw: ->
    @pen.redraw(@y, -@x, @rotation)
  clear: ->
    @ink.clear()
    @penColour = [0,0,0]
    this.moveTo(0,0)
    this.rotateTo(0)
  setPenColour: (r,g,b) ->
    @penColour = [r,g,b]

(exports ? this).Drawing = Drawing