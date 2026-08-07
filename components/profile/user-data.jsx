
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Phone, Mail, Edit3 } from "lucide-react";
import Link from "next/link";

export default function UserData({user}) {
    // Basic formatting helper for initials
  const getInitials = (email = "") => {
    return email ? email.substring(0, 1).toUpperCase() : "U";
  };
  
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-purple-900/90 via-blue-900/90 to-purple-900/90 border border-indigo-950 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent)] pointer-events-none" />
        
        <Avatar className="h-24 w-24 border-2 border-purple-500 shadow-lg text-xl">
          <AvatarFallback className="bg-purple-950 text-purple-300 font-semibold text-2xl">
            {getInitials(user.email)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-300">
            {user.user_metadata?.full_name || user.email?.split("@")[0] || "User Profile"}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-gray-300" />
              {user.email}
            </span>
            {user.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-purple-400" />
                {user.phone}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-purple-400" />
              Joined {new Date(user.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:w-auto mt-4 md:mt-0">
          <Button asChild variant="outline" className=" justify-center rounded-xl gap-2 hover:bg-muted">
            <Link href="/sell">
              <Edit3 className="h-4 w-4 text-purple-400" />
              Sell Another Ride
            </Link>
          </Button>          
        </div>
      </div>

  )
}