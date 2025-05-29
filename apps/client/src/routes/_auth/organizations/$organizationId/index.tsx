import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/organizations/$organizationId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organizations/$organizationId/"!</div>
}
