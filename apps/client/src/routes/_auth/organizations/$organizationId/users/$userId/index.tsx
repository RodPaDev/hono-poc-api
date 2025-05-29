import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/organizations/$organizationId/users/$userId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/users/$userid/"!</div>
}
