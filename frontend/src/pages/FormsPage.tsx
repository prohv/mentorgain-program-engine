import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function FormsPage() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Forms</CardTitle>
        <CardDescription>Manage your forms</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Forms content goes here</p>
      </CardContent>
    </Card>
  )
}