import { createClient } from "@/lib/supabase/server";
import BottomNav from "./botnav/bottomnav";
import { HomeIcon } from "lucide-react";
import Topnav from "./topnav/topnav";

const Navbar = async () => {  

  const supabase = await createClient();

  const { data: {user} } = await supabase.auth.getUser();



  return (
    <nav>
      <Topnav user={user}/>
      <BottomNav/>
    </nav>
  );
};

export default Navbar;