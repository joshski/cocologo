class Pen
  constructor: (@context) ->
    @image = new Image()
    @image.src = "turtle.png"
    @image.width = 24
    @image.height = 40
  redraw: (x, y, rotation) ->
    @context.clearRect(0, 0, @context.canvas.width, @context.canvas.height)
    @context.save()
    @context.translate(x + (@context.canvas.width / 2), y + (@context.canvas.height / 2))
    @context.rotate(rotation)
    @context.drawImage(@image, -1 * (@image.width / 2), -1 * (@image.height / 2))
    @context.restore()

(exports ? this).Pen = Pen