import { Container } from './grid'

export function AnnouncementBanner({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <aside className="bg-gray-900 text-gray-100 text-sm font-medium py-1 md:text-center">
      <Container>{children}</Container>
    </aside>
  )
}
