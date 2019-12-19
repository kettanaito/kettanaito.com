import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #f6f8fa;
  margin: 2rem 0;
  padding: 2rem;
`

const Canvas = styled.canvas`
  display: block;
  margin: auto;
`

function Ball(x, y, radius, e, mass, colour) {
  this.position = { x: x, y: y } // m
  this.velocity = { x: 0, y: 0 } // m/s
  this.e = -e // has no units
  this.mass = mass // kg
  this.radius = radius // m
  this.colour = colour
  this.area = (Math.PI * radius * radius) / 10000 // m^2
}

export default class DefaultEvents extends React.Component {
  static propTypes = {
    gravity: PropTypes.number.isRequired,
    density: PropTypes.number.isRequired,
    drag: PropTypes.number.isRequired,
    ballRadius: PropTypes.number.isRequired,
    maxBalls: PropTypes.number.isRequired,
  }

  static defaultProps = {
    gravity: 1,
    density: 1.22,
    drag: 0.47,
    ballRadius: 10,
    maxBalls: 100,
  }

  constructor() {
    super()

    this.canvasRef = React.createRef()
    this.ctx = null
    this.fps = 1 / 60 // 60 FPS
    this.dt = this.fps * 1000 // ms
    this.timer = false
    this.Cd = 0.47
    this.rho = 1.22 // kg/m^3
    this.mouse = {
      x: 0,
      y: 0,
      isDown: false,
    }
    this.ag = 9.81 // m/s^2 acceleration due to gravity on earth = 9.81 m/s^2.
    this.width = 0
    this.height = 0
    this.balls = []

    this.state = {
      clicksCount: 0,
      eventsCount: 0,
    }
  }

  setupCanvas = () => {
    const { current: canvas } = this.canvasRef

    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.timer = setInterval(this.loop, this.dt)
  }

  getMousePosition = (event) => {
    const { current: canvas } = this.canvasRef
    this.mouse.x = event.pageX - canvas.offsetLeft
    this.mouse.y = event.pageY - canvas.offsetTop
  }

  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  handleMouseDown = (event) => {
    if (event.nativeEvent.which === 1) {
      this.getMousePosition(event)
      this.mouse.isDown = true

      var max = 255
      var min = 20
      var r = 75 + this.getRandomNumber(min, max)
      var g = 75 + this.getRandomNumber(min, max)
      var b = 75 + this.getRandomNumber(min, max)

      const hue = this.getRandomNumber(0, 50)
      const saturation = this.getRandomNumber(85, 95)
      const lightness = this.getRandomNumber(50, 70)

      console.log({ hue, saturation, lightness })

      this.balls.push(
        new Ball(
          this.mouse.x,
          this.mouse.y,
          this.props.ballRadius,
          0.7,
          10,
          `hsl(${hue}, ${saturation}%, ${lightness}%)`
        )
      )
    }
  }

  handleMouseUp = (event) => {
    const { mouse, balls } = this

    if (event.nativeEvent.which === 1) {
      mouse.isDown = false

      balls[balls.length - 1].velocity.x =
        (balls[balls.length - 1].position.x - mouse.x) / 10
      balls[balls.length - 1].velocity.y =
        (balls[balls.length - 1].position.y - mouse.y) / 10
    }
  }

  handleWallCollision = (ball) => {
    const { height, width } = this

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

  loop = () => {
    const { width, height, balls, ctx, fps, mouse, ag } = this
    const { gravity, density, drag } = this.props

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
      ctx.fillStyle = balls[i].colour
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
      this.handleBallCollision(balls[i])
      this.handleWallCollision(balls[i])
    }

    // Rendering Text
    // this.ctx.fillStyle = 'black'
    // this.ctx.font = '11pt Ariel'
    // this.ctx.fillText('Number of Balls: ' + balls.length, 0, 16)
    // this.ctx.fillText('Drag Coefficient: ' + drag, 0, 32)
    // this.ctx.fillText('Fluid Density: ' + density + ' kg/m^3', 0, 48)
    // this.ctx.fillText('Acceleration due to gravity: ' + gravity + ' g', 0, 64)
    // this.ctx.fillText('Room Width: ' + width / 1000 + ' m', 0, 80)
    // this.ctx.fillText('Room Height: ' + height / 1000 + ' m', 0, 96)
  }

  handleBallCollision = (b1) => {
    const { balls } = this

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

  componentDidMount() {
    this.setupCanvas()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleButtonClick = () => {
    this.setState(
      (prevState) => ({
        clicksCount: prevState.clicksCount + 1,
        eventsCount: prevState.eventsCount + 1,
      }),
      () => {
        const { current: canvas } = this.canvasRef

        const mousePos = {
          x: this.getRandomNumber(0, canvas.width) + canvas.offsetLeft,
          y: 0 + canvas.offsetTop,
        }

        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          clientX: mousePos.x,
          clientY: mousePos.y,
          relatedTarget: canvas,
        })

        const mouseUpEvent = new MouseEvent('mouseup', {
          bubbles: true,
          clientX: mousePos.x + this.getRandomNumber(-20, 20),
          clientY: mousePos.y + this.getRandomNumber(-20, 20),
          relatedTarget: canvas,
        })

        mouseDownEvent.nativeEvent = mouseDownEvent
        mouseUpEvent.nativeEvent = mouseUpEvent

        this.handleMouseDown(mouseDownEvent)
        this.getMousePosition(mouseUpEvent)
        this.handleMouseUp(mouseUpEvent)
      }
    )
  }

  render() {
    const { clicksCount, eventsCount } = this.state
    const { maxBalls } = this.props

    const hasBalls = clicksCount < maxBalls
    const buttonLabel = hasBalls ? 'Throw a ball' : 'Sorry, out of balls'

    return (
      <Container>
        <Canvas ref={this.canvasRef} width={500} height={250} />
        <p>
          Button pressed: <strong>{clicksCount} time(s)</strong>
        </p>
        <p>
          Event handler fired: <strong>{eventsCount} time(s)</strong>
        </p>
        <button onClick={this.handleButtonClick} disabled={!hasBalls}>
          {buttonLabel}
        </button>
      </Container>
    )
  }
}
