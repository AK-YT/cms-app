import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (


<header className="bg-black text-white py-1 shadow-md">
  <div className="max-w-[1400px] mx-auto px-5 py-2.5 flex items-center justify-between">
    <Link to="/" className="text-2xl text-white font-bold hover:text-red-600">
      CollContactss
    </Link>
    <nav className="space-x-6">
      {user && (
       <div className="flex items-center space-x-6">
       <span className="text-lg text-gray-200">{user.email}</span>
       <button
         onClick={handleClick}
         className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
       >
         Log out
       </button>
     </div>
     
      )}
      {!user && (
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-lg font-semibold text-gray-300 hover:text-white transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg font-semibold text-gray-300 hover:text-white transition-colors duration-300"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  </div>
</header>
  )
}

export default Navbar