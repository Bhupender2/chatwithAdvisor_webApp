"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AppHeader() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 w-full p-2">
      <div className="flex items-center justify-between px-4 rounded-lg border border-gray-700/30  backdrop-blur  w-full py-2">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-indigo-950">
            <Image src="/logo.png" alt="logo" width={80} height={70} />
          </div>
        </div>
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden text-indigo-950" />

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => {
              clearAuth();
              router.push("/login");
              toast.success("Logged out successfully", {
                icon: <CheckCircle2 className="text-indigo-900" />,
              });
            }}
          >
            <LogOut className="w-4 h-4 text-indigo-900" />
            <span className="font-semibold">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
