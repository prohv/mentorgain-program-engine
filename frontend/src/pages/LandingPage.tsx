import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export function LandingPage() {
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);

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
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

                console.log("Verifying token with backend...");
                const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    console.log("Token verified, redirecting to dashboard");
                    navigate("/dashboard");
                } else {
                    console.warn("Token verify failed (401/403), clearing token");
                    localStorage.removeItem("mg_token");
                    setIsVerifying(false);
                }
            } catch (error) {
                console.error("Token verification failed or timed out", error);
                // On error (network/timeout), we traditionally might want to retry? 
                // But for now, let's show the landing page so the user isn't stuck.
                setIsVerifying(false);
            }
        };

        verifyToken();
    }, [navigate]);


    if (isVerifying) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-muted-foreground animate-pulse">Initializing MentorGain Engine...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <div className="z-10 container flex flex-col items-center text-center gap-8 px-4">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-4">
                        v0.1-alpha
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        Automate Your <br /> Mentorship Programs
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The all-in-one engine for tracking, matching, and scaling your high-impact mentorship initiatives.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="rounded-full px-8 text-lg font-medium shadow-lg shadow-primary/20" onClick={() => navigate("/dashboard")}>
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-medium backdrop-blur-sm bg-background/50">
                        Documentation
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:scale-[1.02] hover:bg-card/80">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <span className="text-primary font-bold">01</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Google Auth</h3>
                        <p className="text-sm text-muted-foreground">Seamless integration with your organization's workspace.</p>
                    </div>
                    <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:scale-[1.02] hover:bg-card/80">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <span className="text-primary font-bold">02</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Smart Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Monitor applicants and program health at a glance.</p>
                    </div>
                    <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm border-border/50 transition-all hover:scale-[1.02] hover:bg-card/80">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <span className="text-primary font-bold">03</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Program Scalability</h3>
                        <p className="text-sm text-muted-foreground">Easily manage hundreds of mentorship pairs with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
