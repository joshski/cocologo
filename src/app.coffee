exampleScript = ["forward 50",
                 "right 90",
                 "forward 50",
                 "right 90",
                 "penup",
                 "forward 25",
                 "pendown",
                 "forward 25"
                 "right 90",
                 "forward 50"].join("\n")

class App
  constructor: (document) -> 
    @codeArea = document.getElementById("code")
    @codeArea.value = exampleScript
    
    pen = new Pen(document.getElementById("turtleCanvas").getContext("2d"))
    ink = new Ink(document.getElementById("lineCanvas").getContext("2d"))
    drawing =  new Drawing(pen, ink, plotLine)
    @turtle = new Turtle(drawing)
    
    parser.yy = Logo
    
    @command = parser.parse("left 1\nright 1")
    
    document.getElementById("go").onclick = =>
      this.go()
      false
      
    document.getElementById("reset").onclick = =>
      this.reset()
      false
    
    setInterval =>
      this.tick()
    , 20
    
  go: ->
    try
      @command = parser.parse(@codeArea.value)
    catch error
      alert(error)
      
  tick: ->
    for i in [1..20]
      @command = @command(@turtle) if typeof @command == 'function'
      
  reset: ->
    @command = false
    @turtle.reset()    

(exports ? this).App = App