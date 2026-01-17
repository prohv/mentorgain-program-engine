import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function ProfilePage() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Profile content goes here</p>
      </CardContent>
    </Card>
  )
}