import SearchBox from "@/components/search/search-box"
import Link from "next/link"

const NavTitle = () => {
    
  return (
    <Link href="/" className="text-lg font-bold">
      <SearchBox />
    </Link>
  )
}

export default NavTitle