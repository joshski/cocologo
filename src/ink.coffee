class Ink
  constructor: (@context) ->
  draw: (x, y, rgb) ->
    @context.fillStyle = "rgb(#{rgb[0]},#{rgb[1]},#{rgb[2]})"
    @context.fillRect(x + (@context.canvas.width / 2), y + (@context.canvas.height / 2), 1, 1)
  clear: ->
    @context.clearRect(0, 0, @context.canvas.width, @context.canvas.height)

(exports ? this).Ink = Ink