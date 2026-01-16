import { GoogleLogin } from "@react-oauth/google"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

export function LoginPage() {
    const handleGoogleSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential
        if(!idToken) return
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({idToken})
        })
        if (!res.ok) {
            console.error("Backend auth failed")
            return
        }
        const data = await res.json()
        localStorage.setItem("mg_token", data.accessToken)
    }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center gap-3">
        <img
          src="/mentorgain-engine.svg"
          alt="MentorGain logo"
          className="h-8 w-8 rounded-md"
        />
        <div>
          <CardTitle>MentorGain Program Engine</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-col gap-2">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Google login failed")}
        />
      </CardContent>
    </Card>
  )
}

