import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organizations/$organizationId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/"!</div>
}
