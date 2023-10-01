import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Container } from '../components/grid'
import { Seo } from '../components/seo'

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
      <Seo
        title="kettanaitl.com"
        description={`Artem Zakharchenko's personal blog.`}
        robots={['noindex', 'nofollow']}
      />
      <div className="py-16 max-w-md mx-auto">
        <p className="text-center">Preparing a new experience...</p>
        <noscript>
          <p className="mt-5 text-red-600">
            <strong>
              Please enable JavaScript in your browser so kettanaito.com could
              correctly clear previously installed Service Worker. Thank you.
            </strong>
          </p>
        </noscript>
      </div>
    </Container>
  )
}
