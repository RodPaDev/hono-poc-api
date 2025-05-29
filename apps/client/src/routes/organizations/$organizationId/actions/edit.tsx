import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/organizations/$organizationId/actions/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/actions/edit"!</div>
}
