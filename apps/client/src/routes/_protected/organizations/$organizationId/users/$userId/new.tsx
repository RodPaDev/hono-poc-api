import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/organizations/$organizationId/users/$userId/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/users/$userId/edit"!</div>
}
