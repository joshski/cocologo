# Bresenham's line algorithm

(exports ? this).plotLine = (x0, y0, x1, y1, plot) ->
  dx = x1 - x0
  sx = 1
  dy = y1 - y0
  sy = 1
  if dx < 0
    sx = -1
    dx = -dx
  if dy < 0
    sy = -1
    dy = -dy    
  dx = dx << 1
  dy = dy << 1
  plot(x0, y0)
  if (dy < dx)
    fraction = dy - (dx >> 1)
    while (x0 != x1)
      if (fraction >= 0)
        y0 += sy
        fraction -= dx
      fraction += dy
      x0 += sx
      plot(x0, y0)  
  else
    fraction = dx - (dy >> 1)        
    while (y0 != y1)
      if (fraction >= 0)
        x0 += sx
        fraction -= dy
      fraction += dx
      y0 += sy
      plot(x0, y0)
  return