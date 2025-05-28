
import React, { useState } from 'react'
import { auth, profiles } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: loginError } = await auth.signIn(email, password)
      
      if (loginError) {
        setError('Email ou password incorretos')
        return
      }

      if (data.user) {
        // Buscar dados do perfil
        const { data: profile, error: profileError } = await profiles.getUserProfile(data.user.id)
        
        if (profileError) {
          setError('Erro ao carregar perfil do utilizador')
          return
        }

        // Guardar dados no localStorage
        localStorage.setItem('user_id', data.user.id)
        localStorage.setItem('nome', profile.full_name || '')
        localStorage.setItem('role', profile.role || '')
        localStorage.setItem('parqueSelecionado', profile.parque_id_principal || '')

        // Redirecionar para dashboard
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="auth-form">
        <div className="text-center mb-8">
          <img 
            src="/img/logo.png" 
            alt="Multipark Logo" 
            className="h-16 mx-auto mb-4"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <h1 className="text-2xl font-bold text-gray-900">Ferramentas Multipark</h1>
          <p className="text-gray-600 mt-2">Entre com as suas credenciais</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu.email@multipark.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full primary-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
