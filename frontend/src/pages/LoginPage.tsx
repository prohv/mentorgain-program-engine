import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

export function LoginPage() {
  console.log("Rendering LoginPage");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("mg_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError(null);
    const idToken = credentialResponse.credential
    if (!idToken) {
      setError("Google authentication failed. Please try again.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Backend authentication failed. Please contact support.");
        return
      }
      const data = await res.json()
      localStorage.setItem("mg_token", data.accessToken)
      navigate("/dashboard");
    } catch (error) {
      console.error("Login request failed", error);
      setError("Unable to connect to the server. Please check your internet connection.");
    }
  }


  return (
    <div className="flex-1 flex items-center justify-center p-4">
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
        <CardContent className="flex flex-col gap-4 items-center py-8">
          {error && (
            <div className="w-full p-3 mb-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google login failed. Please try again.")}
          />
        </CardContent>
      </Card>
    </div>
  )
}