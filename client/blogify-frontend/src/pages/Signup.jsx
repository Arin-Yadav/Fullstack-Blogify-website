import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                fullName,
                email,
                password,
            })
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    }

  return (
         <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            {
                error && (
                <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
                    {error}
                </div>
                )
            }

        <form onSubmit={handleSignup} className="space-y-4">
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Account
            </button>
        </form>
        </div>
  )
}

export default Signup