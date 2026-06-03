import DesktopTopNav from './desktopnav/desktopTopNav'
import MobileTopNav from './mobiletopnav/mobileTopNav'

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