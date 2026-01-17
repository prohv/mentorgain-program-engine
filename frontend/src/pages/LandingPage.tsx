import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export function LandingPage() {
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);

    // 🔒 Auth Logic (Kept intact as this is critical infrastructure)
    useEffect(() => {
        const verifyToken = async () => {
            console.log("Checking API URL:", import.meta.env.VITE_API_URL);
            const token = localStorage.getItem("mg_token");
            
            if (!token) {
                console.log("No token found, showing landing page");
                setIsVerifying(false);
                return;
            }

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                console.log("Verifying token with backend...");
                const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    navigate("/dashboard");
                } else {
                    localStorage.removeItem("mg_token");
                    setIsVerifying(false);
                }
            } catch (error) {
                console.error("Token verification failed", error);
                setIsVerifying(false);
            }
        };

        verifyToken();
    }, [navigate]);

    if (isVerifying) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-muted-foreground animate-pulse font-medium">Initializing Engine...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-white">
            {/* 🎨 Background Gradients - Adjusted to Blue Tones */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>

            <div className="z-10 container flex flex-col items-center text-center px-4 max-w-4xl">
                
                {/* 🔹 Logo Section */}
                <div className="mb-8 hover:scale-105 transition-transform duration-500 ease-out">
                    <img 
                        src="/mentorgain-engine.svg" 
                        alt="MentorGain Engine Logo" 
                        className="h-24 w-auto"
                    />
                </div>

                {/* 🔹 Main Heading: Dark Blue to Light Blue Gradient */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-700 to-blue-400">
                    MentorGain Program Engine
                </h1>

                {/* 🔹 Tagline (Black as requested) */}
                <p className="text-2xl md:text-3xl font-bold text-black mb-8">
                    Build. Configure. Scale.
                </p>

                {/* 🔹 Description (The "Engineering" Content) */}
                <div className="prose prose-lg text-slate-600 max-w-3xl mb-10 leading-relaxed">
                    <p>
                        A production-ready platform to run multiple structured mentorship programs for different organizations.
                        Configure <span className="font-semibold text-blue-700">custom rules</span>, build <span className="font-semibold text-blue-700">dynamic application forms</span>, 
                        and orchestrate tailored <span className="font-semibold text-blue-700">enrollment workflows</span>.
                    </p>
                </div>

                {/* 🔹 Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                    <Button 
                        size="lg" 
                        className="rounded-full px-10 py-6 text-xl bg-blue-900 hover:bg-blue-800 shadow-xl shadow-blue-900/20 transition-all" 
                        onClick={() => navigate("/dashboard")}
                    >
                        Get Started
                    </Button>
                    <Button 
                        size="lg" 
                        className="rounded-full px-10 py-6 text-xl border-2 border-blue-100 text-white transition-all"
                        onClick={() => navigate("https://github.com/prohv/mentorgain-program-engine/blob/main/README.md")}
                    >
                        Documentation
                    </Button>
                </div>
            </div>
        </div>
    );
}
