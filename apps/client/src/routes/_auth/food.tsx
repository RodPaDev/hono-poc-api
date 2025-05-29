import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/food')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/food"!</div>
}
