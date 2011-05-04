exampleScript = [
  "repeat 16",
  "  left 89",
  "  penup",
  "  forward 25",
  "  pendown",
  "  repeat 20",
  "    pencolour blue",
  "    forward 20",
  "    right 88",
  "    pencolour green",
  "    forward 25",
  "    left 19",
  "    pencolour red",
  "    forward 12",
  "    pencolour yellow",
  "    forward 4",
  "    left 23",
  "  end",
  "end",
  "left 110",
  "pencolour green",
  "forward 1000"
].join("\n")

class App
  constructor: (document) -> 
    @codeArea = document.getElementById("code")
    @codeArea.value = exampleScript
    
    pen = new Pen(document.getElementById("turtleCanvas").getContext("2d"))
    ink = new Ink(document.getElementById("lineCanvas").getContext("2d"))
    drawing =  new Drawing(pen, ink, plotLine)
    @turtle = new Turtle(drawing)
    
    parser.yy = Logo
    
    document.getElementById("go").onclick = =>
      this.go()
      false
      
    document.getElementById("reset").onclick = =>
      this.reset()
      false
    
    setInterval =>
      this.tick()
    , 20
    
    setTimeout =>
      @command = parser.parse("left 1\nright 1")
    , 400
    
  go: ->
    try
      @command = parser.parse(@codeArea.value)
    catch error
      alert(error)
    clearInterval(@interval)
      
  tick: ->
    for i in [1..20]
      @command = @command(@turtle) if typeof @command == 'function'
      
  reset: ->
    @command = false
    @turtle.reset()    

(exports ? this).App = App