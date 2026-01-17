import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function AdminPage() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>Administrative functions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Admin panel content goes here</p>
      </CardContent>
    </Card>
  )
}