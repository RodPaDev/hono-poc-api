import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/organizations/$organizationId/actions/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/actions/new"!</div>
}
