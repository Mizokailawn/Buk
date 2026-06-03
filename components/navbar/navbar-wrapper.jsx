import BottomNav from "./botnav/bottomnav";
import Topnav from "./topnav/topnav";

const NavbarWrapper = () => { 
  return (
    <nav>
      <Topnav />
      <BottomNav/>
    </nav>
  );
};

export default NavbarWrapper;