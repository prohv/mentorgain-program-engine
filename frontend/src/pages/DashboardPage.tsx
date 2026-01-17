import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

export function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("mg_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          console.warn("Dashboard: Token invalid, redirecting to login");
          localStorage.removeItem("mg_token");
          navigate("/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Dashboard: Token check failed", error);
        // If network error, maybe redirect to login or show error? 
        // For safety, redirect to login to force re-auth flow which handles errors better
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);


  // Mock data for demonstration

  const programs = [
    { id: 1, name: "Summer Internship 2026", status: "Active", applicants: 45 },
    { id: 2, name: "Graduate Program", status: "Closed", applicants: 120 },
    { id: 3, name: "Tech Mentorship", status: "Active", applicants: 32 },
  ];
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your programs and track applicants.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{program.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${program.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                  {program.status}
                </span>
              </div>
              <CardDescription>ID: MG-PRG-{program.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-2xl font-bold">{program.applicants}</div>
              <p className="text-xs text-muted-foreground">Total Applicants</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">Showing 3 of 3 programs</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  )
}