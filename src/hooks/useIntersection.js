import { useState, useRef, useEffect } from 'react'

export const useIntersection = ({
  rootMargin,
  threshold = 0,
  once = false,
}) => {
  const [intersection, updateIntersection] = useState({})
  const [node, setIntersectionRef] = useState(null)
  const [root, setRoot] = useState(null)
  const observer = useRef(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        updateIntersection(entry)

        if (entry.isIntersecting && once) {
          observer.current.disconnect()
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )

    const { current: currentObserver } = observer

    if (node) {
      currentObserver.observe(node)
    }

    return () => currentObserver.disconnect()
  }, [node, root, rootMargin, threshold, once])

  return { setIntersectionRef, setRoot, intersection }
}
