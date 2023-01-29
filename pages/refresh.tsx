import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container } from '../components/grid'

async function pruneServiceWorker() {
  const worker = await navigator.serviceWorker.getRegistration()

  if (worker) {
    await worker.unregister()
    location.reload()
  }
}

export default function WorkerRefreshPage() {
  const router = useRouter()

  useEffect(() => {
    /**
     * Prune any residual worker registrations because I used to
     * use Gatsby's PWA plugin and it left a worker behind,
     * loading the stale version of the website.
     */
    pruneServiceWorker().then(() => {
      router.push('/')
    })
  }, [router])

  return (
    <Container>
      <p className="py-16 text-gray-600 text-center">
        Preparing a new experience...
      </p>
    </Container>
  )
}
