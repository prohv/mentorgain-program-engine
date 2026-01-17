import { programService } from '../services/api';
import type { Program } from '../types/program';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

export function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination states
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 6;

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
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  // Fetch programs with pagination
  useEffect(() => {
    if (!isLoading) {
      programService.getAll(currentPage, itemsPerPage)
        .then((response) => {
          setPrograms(response.data);
          setTotalPages(response.meta.totalPages);
          setTotal(response.meta.total);
        })
        .catch((error) => {
          console.error("Failed to fetch programs:", error);
        });
    }
  }, [isLoading, currentPage]);

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
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  program.isActive 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {program.isActive ? "Active" : "Closed"}
                </span>
              </div>
              <CardDescription className="text-blue-600 font-semibold text-lg">
                ₹{program.price.toLocaleString('en-IN')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {program.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Enrolled:</span>
                  <span className="font-semibold">
                    {program._count?.enrollments || 0} / {program.maxParticipants}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-xs">
                    {new Date(program.startDate).toLocaleDateString('en-IN')} - {' '}
                    {new Date(program.endDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button variant="default" size="sm" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, total)} of {total} programs
        </p>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {currentPage}
            </span>
            <span className="text-sm text-muted-foreground">
              of {totalPages}
            </span>
          </div>
          <Button 
            size="sm" 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
