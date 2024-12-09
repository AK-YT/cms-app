import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (

    <form className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
  <h3 className="text-3xl font-semibold text-blue-700">Sign Up</h3>

  <div>
    <label className="block text-lg font-medium text-gray-700">Email address:</label>
    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className="w-full p-3 mt-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label className="block text-lg font-medium text-gray-700">Password:</label>
    <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      className="w-full p-3 mt-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <button
    disabled={isLoading}
    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Sign up
  </button>

  {error && <div className="text-red-600 text-center mt-4">{error}</div>}

  <div className="text-center">
    <p className="text-base text-gray-600">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
        Login
      </Link>
    </p>
  </div>

</form>
  )
}

export default Signup