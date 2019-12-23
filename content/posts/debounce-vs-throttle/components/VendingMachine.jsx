import React from 'react'
import styled from 'styled-components'
import { useResponsiveValue, Box } from 'atomic-layout'
import vendingMachineImage from '../vendingMachine.png'
import { useIntersection } from '../../../../src/hooks/useIntersection'

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const StyledCanvas = styled.canvas`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 0;
  right: 0;
  margin: auto;
  display: block;
`

const VendingMachineContainer = styled(Box)`
  position: relative;
  margin: auto;
  /* Disable double tap zoom on mobile devices */
  touch-action: manipulation;
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ bottom }) => bottom}px;
  margin: auto;
  width: 85px;
  z-index: 1;
`

const StyledImage = styled.img`
  margin: 0;
`

const RedButton = styled.button`
  --button-shadow-color: #a33131;
  --button-active-delta: 10px;
  --button-height: 25px;

  position: absolute;

  background-color: #ff4d4d;
  border-radius: 50%;
  height: 30px;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    background-color: var(--button-shadow-color);
    left: 0;
    height: var(--button-height);
    width: 100%;
    z-index: -1;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    border-radius: 50%;
    background-color: var(--button-shadow-color);
    bottom: -25px;
    left: 0;
    z-index: -1;
  }

  &:active {
    margin-top: var(--button-active-delta);

    &:before {
      height: calc(var(--button-height) - var(--button-active-delta));
    }

    &:after {
      margin-bottom: var(--button-active-delta);
    }
  }
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

export const VendingMachine = ({
  ballRadius,
  gravity,
  density,
  drag,
  onButtonClick,
}) => {
  const canvasRef = React.useRef()
  const ctxRef = React.useRef()
  const timerRef = React.useRef()
  const ballsRef = React.useRef()

  const canvasResponsive = useResponsiveValue(
    {
      xs: {
        top: 102,
        height: 145,
        width: 122,
      },
    },
    {
      top: 130,
      height: 185,
      width: 154,
    }
  )
  const buttonResponsize = useResponsiveValue(
    {
      xs: {
        bottom: 150,
      },
    },
    {
      bottom: 175,
    }
  )

  const { intersection, setIntersectionRef } = useIntersection({
    threshold: 0.5,
  })

  const fps = 1 / 60
  const dt = fps * 1000 // ms
  const mouse = {
    x: 0,
    y: 0,
    isDown: false,
  }
  const ag = 9.81 // m/s^2 acceleration due to gravity on earth = 9.81 m/s^2.

  const setupCanvas = () => {
    const canvas = canvasRef.current
    ctxRef.current = canvas.getContext('2d')
    ballsRef.current = []
  }

  const initDraw = () => {
    timerRef.current = setInterval(drawFrame, dt)
  }

  const stopDraw = () => {
    clearInterval(timerRef.current)
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

      const balls = ballsRef.current
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
      const balls = ballsRef.current

      mouse.isDown = false

      balls[balls.length - 1].velocity.x =
        (balls[balls.length - 1].position.x - mouse.x) / 10
      balls[balls.length - 1].velocity.y =
        (balls[balls.length - 1].position.y - mouse.y) / 10
    }
  }

  const handleWallCollision = (ball) => {
    const { height, width } = canvasResponsive

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
    const balls = ballsRef.current

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

  const drawFrame = React.useCallback(() => {
    const ctx = ctxRef.current
    const balls = ballsRef.current
    const { height, width } = canvasResponsive

    // Clear window at the begining of every frame
    ctx.clearRect(0, 0, width, height)
    const ballsCount = balls.length

    for (var i = 0; i < ballsCount; i++) {
      if (!mouse.isDown || i !== ballsCount - 1) {
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

      // Handling the ball collisions
      handleBallCollision(balls[i])
      handleWallCollision(balls[i])
    }
  }, [canvasResponsive, ctxRef, ballsRef])

  // Public methods
  const throwBall = React.useCallback(() => {
    const canvas = canvasRef.current

    const startMousePos = {
      // x: getRandomNumber(0, canvas.width) + canvas.offsetLeft,
      x: canvas.width / 2 + canvas.offsetLeft,
      y: 10 + canvas.offsetTop,
    }

    const endMousePos = {
      x: startMousePos.x + getRandomNumber(-20, 20),
      y: startMousePos.y + getRandomNumber(-20, 20),
    }

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: startMousePos.x,
      clientY: startMousePos.y,
      relatedTarget: canvas,
    })

    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: endMousePos.x,
      clientY: endMousePos.y,
      relatedTarget: canvas,
    })

    mouseDownEvent.nativeEvent = mouseDownEvent
    mouseUpEvent.nativeEvent = mouseUpEvent

    handleMouseDown(mouseDownEvent)
    getMousePosition(mouseUpEvent)
    handleMouseUp(mouseUpEvent)
  }, [canvasRef])

  // componentDidMount
  React.useEffect(() => {
    setupCanvas()
    return () => stopDraw()
  }, [])

  React.useEffect(() => {
    const { isIntersecting } = intersection

    // Stop canvas drawing loop when component goes out of the viewport
    if (isIntersecting) {
      initDraw()
    } else {
      stopDraw()
    }
  }, [intersection.isIntersecting])

  return (
    <VendingMachineContainer width="100%" maxWidth={280} maxWidthMd={350}>
      <ButtonContainer bottom={buttonResponsize.bottom}>
        <RedButton onClick={() => onButtonClick(throwBall)} />
      </ButtonContainer>
      <StyledImage
        ref={setIntersectionRef}
        src={vendingMachineImage}
        alt="Ball vending machine"
      />
      <StyledCanvas
        ref={canvasRef}
        top={canvasResponsive.top}
        height={canvasResponsive.height}
        width={canvasResponsive.width}
      />
    </VendingMachineContainer>
  )
}

VendingMachine.defaultProps = {
  ballRadius: 10,
  gravity: 1,
  density: 1.22,
  drag: 0.47,
}
