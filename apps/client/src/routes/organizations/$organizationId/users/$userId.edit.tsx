import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/organizations/$organizationId/users/$userId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/users/$userId/edit"!</div>
}
