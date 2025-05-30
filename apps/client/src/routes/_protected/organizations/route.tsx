import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/organizations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/organizations"!</div>
}
