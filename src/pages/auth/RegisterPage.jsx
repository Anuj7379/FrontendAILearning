import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import authService from '../../services/authService.js'
import Logo from '../../assets/Logo.png'
import loginBg from '../../assets/loginBg.jpg'
import Spinner from '../../components/common/Spinner.jsx'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      if(password.length < 6) {
        toast.error("Password must be at least 6 characters long.")
        return
      }
      if (!username || !email || !password) {
        toast.error("All fields are required.")
        return
      }
      e.preventDefault()
      setLoading(true)
      try {
        await authService.register(username , email, password)
        toast.success("Registration successful! Please login.")
        navigate('/login')
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Registration failed. Please try again."
        )
      }
        finally {
          setLoading(false)
        }
    }

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
  style={{ backgroundImage: `url(${loginBg})` }}
>
      <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md">
      <Spinner />
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-18 " />
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600">Please register to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <div
              className={`flex items-center border ${
                focusedField === 'username'
                  ? 'border-green-500'
                  : 'border-gray-300'
              } rounded-md`}
            >
              <User size={20} className="text-gray-400 ml-2" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div
              className={`flex items-center border ${
                focusedField === 'email' ? 'border-green-500' : 'border-gray-300'
              } rounded-md`}
            >
              <Mail size={20} className="text-gray-400 ml-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center border ${
                focusedField === 'password'
                  ? 'border-green-500'
                  : 'border-gray-300'
              } rounded-md`}
            >
              <Lock size={20} className="text-gray-400 ml-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className={`
    w-full py-2 rounded-md flex items-center justify-center gap-2
    font-semibold transition-all duration-300 ease-out
    transform
    ${loading 
      ? 'bg-blue-400 cursor-not-allowed animate-pulse' 
      : 'bg-green-600 hover:bg-green-500 hover:-translate-y-1 hover:shadow-lg active:scale-95 text-white'}
  `}
>
  {loading ? (
    <>
      <svg
        className="w-5 h-5 animate-spin text-white"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>Registering...</span>
    </>
  ) : (
    <>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        Register
      </span>
      <ArrowRight
        size={20}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  )}
</button>

        </form>

        {/* Footer */}
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
