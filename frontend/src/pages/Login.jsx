import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (

    <form className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
  <h3 className="text-3xl font-semibold text-blue-700">Log In</h3>
  
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
    Log in
  </button>

  <div className="text-center mt-4">
    <p className="text-sm text-gray-600 text-bold text-lg">
      Don't have an account?{' '}
      <Link to="/signup" className="text-blue-600 hover:underline text-lg">
        Register Here
      </Link>
    </p>
  </div>

  {error && <div className="text-red-600 text-center mt-4">{error}</div>}
</form>
  )
}

export default Login