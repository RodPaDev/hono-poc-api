import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organizations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/"!</div>
}
