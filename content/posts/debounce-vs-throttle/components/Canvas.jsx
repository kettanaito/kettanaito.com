import React from 'react'
import styled from 'styled-components'

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const StyledCanvas = styled.canvas`
  display: block;
  margin: 0 auto 2rem;
`

class Ball {
  constructor(x, y, radius, e, mass, color) {
    this.position = { x: x, y: y } // m
    this.velocity = { x: 0, y: 0 } // m/s
    this.e = -e // has no units
    this.mass = mass // kg
    this.radius = radius // m
    this.color = color
    this.area = (Math.PI * radius * radius) / 10000 // m^2
  }
}

const defaultProps = {
  ballRadius: 10,
  gravity: 1,
  density: 1.22,
  drag: 0.47,
}

export const Canvas = ({ children, ballRadius, gravity, density, drag }) => {
  const canvasRef = React.useRef()

  let ctx = null
  const fps = 1 / 60
  const dt = fps * 1000 // ms
  let timer = false
  // const Cd = 0.47
  // const rho = 1.22 // kg/m^3
  const mouse = {
    x: 0,
    y: 0,
    isDown: false,
  }
  const ag = 9.81 // m/s^2 acceleration due to gravity on earth = 9.81 m/s^2.
  let width = 0
  let height = 0
  const balls = []

  const setupCanvas = () => {
    const canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    height = canvas.height
    width = canvas.width
    timer = setInterval(loop, dt)
  }

  const getMousePosition = (event) => {
    const canvas = canvasRef.current
    mouse.x = event.pageX - canvas.offsetLeft
    mouse.y = event.pageY - canvas.offsetTop
  }

  const handleMouseDown = (event) => {
    if (event.nativeEvent.which === 1) {
      getMousePosition(event)
      mouse.isDown = true

      const hue = getRandomNumber(0, 50)
      const saturation = getRandomNumber(85, 95)
      const lightness = getRandomNumber(50, 70)

      balls.push(
        new Ball(
          mouse.x,
          mouse.y,
          ballRadius,
          0.7,
          10,
          `hsl(${hue}, ${saturation}%, ${lightness}%)`
        )
      )
    }
  }

  const handleMouseUp = (event) => {
    if (event.nativeEvent.which === 1) {
      mouse.isDown = false

      balls[balls.length - 1].velocity.x =
        (balls[balls.length - 1].position.x - mouse.x) / 10
      balls[balls.length - 1].velocity.y =
        (balls[balls.length - 1].position.y - mouse.y) / 10
    }
  }

  const handleWallCollision = (ball) => {
    if (ball.position.x > width - ball.radius) {
      ball.velocity.x *= ball.e
      ball.position.x = width - ball.radius
    }
    if (ball.position.y > height - ball.radius) {
      ball.velocity.y *= ball.e
      ball.position.y = height - ball.radius
    }
    if (ball.position.x < ball.radius) {
      ball.velocity.x *= ball.e
      ball.position.x = ball.radius
    }
    if (ball.position.y < ball.radius) {
      ball.velocity.y *= ball.e
      ball.position.y = ball.radius
    }
  }

  const handleBallCollision = (b1) => {
    for (var i = 0; i < balls.length; i++) {
      var b2 = balls[i]
      if (b1.position.x !== b2.position.x && b1.position.y !== b2.position.y) {
        // quick check for potential collisions using AABBs
        if (
          b1.position.x + b1.radius + b2.radius > b2.position.x &&
          b1.position.x < b2.position.x + b1.radius + b2.radius &&
          b1.position.y + b1.radius + b2.radius > b2.position.y &&
          b1.position.y < b2.position.y + b1.radius + b2.radius
        ) {
          // pythagoras
          var distX = b1.position.x - b2.position.x
          var distY = b1.position.y - b2.position.y
          var d = Math.sqrt(distX * distX + distY * distY)

          // checking circle vs circle collision
          if (d < b1.radius + b2.radius) {
            var nx = (b2.position.x - b1.position.x) / d
            var ny = (b2.position.y - b1.position.y) / d
            var p =
              (2 *
                (b1.velocity.x * nx +
                  b1.velocity.y * ny -
                  b2.velocity.x * nx -
                  b2.velocity.y * ny)) /
              (b1.mass + b2.mass)

            // calulating the point of collision
            var colPointX =
              (b1.position.x * b2.radius + b2.position.x * b1.radius) /
              (b1.radius + b2.radius)
            var colPointY =
              (b1.position.y * b2.radius + b2.position.y * b1.radius) /
              (b1.radius + b2.radius)

            // stoping overlap
            b1.position.x =
              colPointX + (b1.radius * (b1.position.x - b2.position.x)) / d
            b1.position.y =
              colPointY + (b1.radius * (b1.position.y - b2.position.y)) / d
            b2.position.x =
              colPointX + (b2.radius * (b2.position.x - b1.position.x)) / d
            b2.position.y =
              colPointY + (b2.radius * (b2.position.y - b1.position.y)) / d

            // updating velocity to reflect collision
            b1.velocity.x -= p * b1.mass * nx
            b1.velocity.y -= p * b1.mass * ny
            b2.velocity.x += p * b2.mass * nx
            b2.velocity.y += p * b2.mass * ny
          }
        }
      }
    }
  }

  const loop = () => {
    // Clear window at the begining of every frame
    ctx.clearRect(0, 0, width, height)

    for (var i = 0; i < balls.length; i++) {
      if (!mouse.isDown || i !== balls.length - 1) {
        // physics - calculating the aerodynamic forces to drag
        // -0.5 * Cd * A * v^2 * rho
        var fx =
          -drag.value *
          density *
          balls[i].area *
          balls[i].velocity.x *
          balls[i].velocity.x *
          (balls[i].velocity.x / Math.abs(balls[i].velocity.x))
        var fy =
          -drag.value *
          density *
          balls[i].area *
          balls[i].velocity.y *
          balls[i].velocity.y *
          (balls[i].velocity.y / Math.abs(balls[i].velocity.y))

        fx = isNaN(fx) ? 0 : fx
        fy = isNaN(fy) ? 0 : fy

        // Calculating the accleration of the ball
        // F = ma or a = F/m
        var ax = fx / balls[i].mass
        var ay = ag * gravity + fy / balls[i].mass

        // Calculating the ball velocity
        balls[i].velocity.x += ax * fps
        balls[i].velocity.y += ay * fps

        // Calculating the position of the ball
        balls[i].position.x += balls[i].velocity.x * fps * 100
        balls[i].position.y += balls[i].velocity.y * fps * 100
      }

      // Rendering the ball
      ctx.beginPath()
      ctx.fillStyle = balls[i].color
      ctx.arc(
        balls[i].position.x,
        balls[i].position.y,
        balls[i].radius,
        0,
        2 * Math.PI,
        true
      )
      ctx.fill()
      ctx.closePath()

      // if (mouse.isDown) {
      //   ctx.beginPath()
      //   ctx.strokeStyle = 'rgb(0,255,0)'
      //   ctx.moveTo(
      //     balls[balls.length - 1].position.x,
      //     balls[balls.length - 1].position.y
      //   )
      //   ctx.lineTo(mouse.x, mouse.y)
      //   ctx.stroke()
      //   ctx.closePath()
      // }

      // Handling the ball collisions
      handleBallCollision(balls[i])
      handleWallCollision(balls[i])
    }
  }

  // Public methods
  const trigger = React.useCallback(
    (getter) => {
      const canvas = canvasRef.current
      const [startMousePos, endMousePos] = getter(canvas)

      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: startMousePos.x,
        clientY: startMousePos.y,
        relatedTarget: canvas,
      })

      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true,
        clientX: endMousePos.x + getRandomNumber(-20, 20),
        clientY: endMousePos.y + getRandomNumber(-20, 20),
        relatedTarget: canvas,
      })

      mouseDownEvent.nativeEvent = mouseDownEvent
      mouseUpEvent.nativeEvent = mouseUpEvent

      handleMouseDown(mouseDownEvent)
      getMousePosition(mouseUpEvent)
      handleMouseUp(mouseUpEvent)
    },
    [canvasRef]
  )

  React.useEffect(() => {
    setupCanvas()
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <StyledCanvas
        ref={canvasRef}
        width={500}
        height={250}
        onMouseMove={getMousePosition}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      {children({ trigger })}
    </div>
  )
}

Canvas.defaultProps = defaultProps
