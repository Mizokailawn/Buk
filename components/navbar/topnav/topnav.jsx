import DesktopTopNav from './desktopTopNav'
import MobileTopNav from './mobileTopNav'

const Topnav = () => {
  return (
    <>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
            <DesktopTopNav />
        </div>

        {/* Mobile TopNav */}
        <div className="md:hidden block">
            <MobileTopNav />
        </div>    
    </>    
  )
}

export default Topnav