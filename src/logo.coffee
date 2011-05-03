immediate = (name) ->
  ->
    a = arguments
    (turtle) ->
      turtle[name].apply(turtle, a)
      false

animate = (name) ->
  f = (frames) ->
    (turtle) ->
      return false if frames == 0
      turtle[name].call(turtle, 1)
      f(frames - 1)

both = (a, b) ->
  (turtle) ->
    return both(a(turtle), b) if a
    b(turtle)

repeat = (times, command) ->
  (turtle) ->
    n = command(turtle)
    return n if times == 1
    both(n, repeat(times - 1, command))
    
(exports ? this).Logo =
  both      : both
  repeat    : repeat  
  pencolour : immediate('pencolour')
  penup     : immediate('penup')
  pendown   : immediate('pendown')
  forward   : animate('forward')
  left      : animate('left')
  right     : animate('right')