import { SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react'
import vendingMachineImageUrl from '../images/vending-machine.png'
import articleStylesUrl from '../debounce-vs-throttle.css'

const GRAVITY = 1
const DENSITY = 1.22
const DRAG = 0.47
const FPS = 1 / 60
const DT = FPS * 1000
const AG = 9.81

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface Ball {
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  e: number
  area: number
  radius: number
  mass: number
  color: string
}

function createBall(
  x: number,
  y: number,
  radius: number,
  e: number,
  mass: number,
  color: string
): Ball {
  return {
    position: { x, y },
    velocity: { x: 0, y: 0 },
    e: -e,
    area: (Math.PI * radius * 2) / 10000,
    radius,
    mass,
    color,
  }
}

interface Props {
  ballRadius: number
  maxBalls: number
  onButtonClick: (throwBall: () => void) => void
  onReset: () => void
}

export function VendingMachine({
  ballRadius,
  maxBalls,
  onButtonClick,
  onReset,
}: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const ballsRef = useRef<Array<Ball>>([])

  const mouse = {
    x: 0,
    y: 0,
    isDown: false,
  }

  const shouldThrowBall = useMemo(() => {
    return ballsRef.current.length < maxBalls
  }, [maxBalls, ballsRef])

  const initCanvas = () => {
    const { current: canvas } = canvasRef
    // @ts-ignore
    contextRef.current = canvas?.getContext('2d')
  }

  const updateMousePosition = (event: MouseEvent) => {
    const { current: canvas } = canvasRef
    if (!canvas) {
      return
    }

    mouse.x = event.pageX - canvas.offsetLeft
    mouse.y = event.pageY - canvas.offsetTop
  }

  const handleMouseDown = (event: SyntheticEvent<HTMLElement, MouseEvent>) => {
    if (event.nativeEvent.which === 1) {
      updateMousePosition(event.nativeEvent)
      mouse.isDown = true

      const { current: balls } = ballsRef
      const hue = randomNumber(0, 50)
      const saturation = randomNumber(85, 95)
      const lightness = randomNumber(50, 70)

      balls.push(
        createBall(
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

  const handleMouseUp = (event: SyntheticEvent<HTMLElement, MouseEvent>) => {
    if (event.nativeEvent.which === 1) {
      mouse.isDown = false

      const { current: balls } = ballsRef
      const lastBall = balls[balls.length - 1]
      balls[balls.length - 1].velocity = {
        x: (lastBall.position.x - mouse.x) / 10,
        y: (lastBall.position.y - mouse.y) / 10,
      }
    }
  }

  const handleWallCollision = (ball: Ball) => {
    const { current: canvas } = canvasRef
    if (!canvas) {
      return
    }

    const { height, width } = canvas

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

  const handleBallCollision = (ball: Ball) => {
    const { current: balls } = ballsRef

    for (let i = 0; i < balls.length; i++) {
      const otherBall = balls[i]

      if (
        ball.position.x !== otherBall.position.x &&
        ball.position.y !== otherBall.position.y
      ) {
        if (
          ball.position.x + ball.radius + otherBall.radius >
            otherBall.position.x &&
          ball.position.x <
            otherBall.position.x + ball.radius + otherBall.radius &&
          ball.position.y + ball.radius + otherBall.radius >
            otherBall.position.y &&
          ball.position.y <
            otherBall.position.y + ball.radius + otherBall.radius
        ) {
          // pythagoras
          var distX = ball.position.x - otherBall.position.x
          var distY = ball.position.y - otherBall.position.y
          var d = Math.sqrt(distX * distX + distY * distY)

          // checking circle vs circle collision
          if (d < ball.radius + otherBall.radius) {
            var nx = (otherBall.position.x - ball.position.x) / d
            var ny = (otherBall.position.y - ball.position.y) / d
            var p =
              (2 *
                (ball.velocity.x * nx +
                  ball.velocity.y * ny -
                  otherBall.velocity.x * nx -
                  otherBall.velocity.y * ny)) /
              (ball.mass + otherBall.mass)

            // calulating the point of collision
            var colPointX =
              (ball.position.x * otherBall.radius +
                otherBall.position.x * ball.radius) /
              (ball.radius + otherBall.radius)
            var colPointY =
              (ball.position.y * otherBall.radius +
                otherBall.position.y * ball.radius) /
              (ball.radius + otherBall.radius)

            // stoping overlap
            ball.position.x =
              colPointX +
              (ball.radius * (ball.position.x - otherBall.position.x)) / d
            ball.position.y =
              colPointY +
              (ball.radius * (ball.position.y - otherBall.position.y)) / d
            otherBall.position.x =
              colPointX +
              (otherBall.radius * (otherBall.position.x - ball.position.x)) / d
            otherBall.position.y =
              colPointY +
              (otherBall.radius * (otherBall.position.y - ball.position.y)) / d

            // updating velocity to reflect collision
            ball.velocity.x -= p * ball.mass * nx
            ball.velocity.y -= p * ball.mass * ny
            otherBall.velocity.x += p * otherBall.mass * nx
            otherBall.velocity.y += p * otherBall.mass * ny
          }
        }
      }
    }
  }

  const renderFrame = useCallback(() => {
    const { current: context } = contextRef
    const { current: canvas } = canvasRef
    const { current: balls } = ballsRef

    if (!context || !canvas) {
      return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    const ballCount = balls.length

    for (let i = 0; i < ballCount; i++) {
      const ball = balls[i]

      if (!mouse.isDown || i !== ballCount - 1) {
        let fx =
          -DRAG *
          DENSITY *
          ball.area *
          ball.velocity.x *
          ball.velocity.x *
          (ball.velocity.x / Math.abs(ball.velocity.x))

        let fy =
          -DRAG *
          DENSITY *
          ball.area *
          ball.velocity.y *
          ball.velocity.y *
          (ball.velocity.y / Math.abs(ball.velocity.y))

        fx = isNaN(fx) ? 0 : fx
        fy = isNaN(fy) ? 0 : fy

        const ax = fx / ball.mass
        const ay = AG * GRAVITY + fy / ball.mass

        ball.velocity.x += ax * FPS
        ball.velocity.y += ay * FPS

        ball.position.x += ball.velocity.x * FPS * 100
        ball.position.y += ball.velocity.y * FPS * 100
      }

      context.beginPath()
      context.fillStyle = ball.color
      context.arc(
        ball.position.x,
        ball.position.y,
        ball.radius,
        0,
        2 * Math.PI,
        true
      )
      context.fill()
      context.closePath()

      handleBallCollision(ball)
      handleWallCollision(ball)
    }
  }, [canvasRef, contextRef, ballsRef, mouse.isDown])

  const throwBall = () => {
    const { current: canvas } = canvasRef
    if (!canvas) {
      return
    }

    const startMousePosition = {
      x: canvas.width / 2 + canvas.offsetLeft,
      y: canvas.offsetTop + 10,
    }

    const endMousePosition = {
      x: startMousePosition.x + randomNumber(-20, 20),
      y: startMousePosition.y + randomNumber(-20, 20),
    }

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: startMousePosition.x,
      clientY: startMousePosition.y,
      relatedTarget: canvas,
    }) as unknown as SyntheticEvent<HTMLElement, MouseEvent>

    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: endMousePosition.x,
      clientY: endMousePosition.y,
      relatedTarget: canvas,
    }) as unknown as SyntheticEvent<HTMLElement, MouseEvent>

    Object.defineProperty(mouseDownEvent, 'nativeEvent', {
      value: mouseDownEvent,
    })
    Object.defineProperty(mouseUpEvent, 'nativeEvent', {
      value: mouseUpEvent,
    })

    handleMouseDown(mouseDownEvent)
    updateMousePosition(mouseUpEvent.nativeEvent)
    handleMouseUp(mouseUpEvent)
  }

  const stopDrawing = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleResetClick = () => {
    ballsRef.current = []
    onReset()
  }

  useEffect(() => {
    initCanvas()

    return () => {
      stopDrawing()
    }
  }, [])

  useEffect(() => {
    const initDrawing = () => {
      timerRef.current = setInterval(renderFrame, DT)
    }

    /** @todo Check image intersection */
    if (true) {
      initDrawing()
    } else {
      stopDrawing()
    }
  }, [renderFrame])

  return (
    <>
      <link rel="stylesheet" href={articleStylesUrl} />
      <div className="relative mx-auto shrink-0 touch-manipulation w-full max-w-[280px] md:max-w-[350px]">
        <div className="absolute m-auto left-0 right-0 z-[1] w-[85px] bottom-[150px] md:bottom-[210px]">
          <button
            className="throw-button"
            onMouseDown={onButtonClick.bind(null, throwBall)}
          />
        </div>
        <img
          src={vendingMachineImageUrl as unknown as string}
          alt="Ball vending machine"
        />
        <canvas
          ref={canvasRef}
          className="absolute block m-auto left-0 right-0 top-[102px] h-[145px] w-[115px] md:top-[170px] md:h-[185px] md:w-[145px]"
          width={145}
          height={185}
        />
      </div>
    </>
  )
}
