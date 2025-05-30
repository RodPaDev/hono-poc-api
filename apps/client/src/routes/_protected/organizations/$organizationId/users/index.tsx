import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/organizations/$organizationId/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/users/"!</div>
}
