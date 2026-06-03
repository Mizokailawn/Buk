import NavTitle from "./nav-title";
import NavDropDown from "./nav-drop";
import Logo from "./Logo";

export default function MobileTopNav() {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between h-12 px-3 border backdrop-blur-xs rounded-full mt-2 mx-2">
      {/* LOGO */}
      <div className="flex items-center justify-center w-8 h-8 shrink-0">
        <Logo />
       </div>

      {/* Center: Logo or Title */}
      <div>
        <NavTitle />
      </div>

      {/* Right: Dropdown */}
      <div>
        <NavDropDown />
      </div>
    </div>
  );
}
