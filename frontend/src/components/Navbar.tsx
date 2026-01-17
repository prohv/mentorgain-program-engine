import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("mg_token");

    const handleLogout = () => {
        localStorage.removeItem("mg_token");
        navigate("/login");
    };

    if (!token) return null;

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <img
                            src="/mentorgain-engine.svg"
                            alt="MentorGain logo"
                            className="h-6 w-6 rounded-md"
                        />
                        <span className="inline-block font-bold">MentorGain</span>
                    </Link>
                    <div className="hidden md:flex gap-6">
                        <Link
                            to="/dashboard"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/dashboard/forms"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Forms
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}
