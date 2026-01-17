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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-10">
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <img
                                src="/mentorgain-engine.svg"
                                alt="MentorGain logo"
                                className="h-6 w-6 rounded-md"
                            />
                            <span className="inline-block text-lg font-bold text-blue-700">MentorGain</span>
                        </Link>
                        <div className="hidden md:flex gap-6">
                            <Link
                                to="/dashboard"
                                className="text-md transition-colors hover:text-primary font-bold text-blue-700"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="text-md transition-colors hover:text-primary font-bold text-blue-700"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/dashboard/forms"
                                className="text-md transition-colors hover:text-primary font-bold text-blue-700"
                            >
                                Forms
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="default" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
