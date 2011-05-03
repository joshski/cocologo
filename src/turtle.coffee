class Turtle
  constructor: (@drawing) ->
    this.reset()
  reset: ->
    @x = 0
    @y = 0
    @rotation = 0
    this.pendown()
    @drawing.clear()
  forward: (distance) ->
    @x += Math.cos(@rotation) * distance
    @y += Math.sin(@rotation) * distance
    if @isPenDown
      @drawing.drawTo(Math.round(@x), Math.round(@y))
    else
      @drawing.moveTo(Math.round(@x), Math.round(@y))
  left: (degrees) ->
    this.right(degrees * -1)
  right: (degrees) ->
    @rotation += degrees * (Math.PI/180)
    @drawing.rotateTo(Math.round(@rotation * Math.pow(10,2)) / Math.pow(10,2))
  penup: ->
    @isPenDown = false
  pendown: ->
    @isPenDown = true
  pencolour: (colour) ->
    @drawing.setPenColour.apply(@drawing, COLOURS[colour] || COLOURS.black)

COLOURS =
  'red'    : [255, 0, 0],
  'green'  : [34, 139, 34],
  'blue'   : [25, 25, 112],
  'yellow' : [255, 215, 0],
  'grey'   : [139, 134, 130],
  'black'  : [0, 0, 0],
  'brown'  : [139, 69, 19],
  'pink'   : [255, 20, 147],
  'orange' : [255, 140, 0],
  'purple' : [160, 32, 240],
  'white'  : [255,255,255]

(exports ? this).Turtle = Turtle