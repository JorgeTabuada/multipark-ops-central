
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'

const Index = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <img 
          src="/img/logo.png" 
          alt="Multipark Logo" 
          className="h-20 mx-auto mb-6"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ferramentas Multipark
        </h1>
        
        <p className="text-gray-600 mb-8">
          Plataforma de gestão integrada para operações de estacionamento
        </p>

        <div className="space-y-4">
          <Link to="/auth">
            <Button className="w-full bg-blue-700 hover:bg-blue-800">
              Entrar na Plataforma
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            Sistema de gestão para colaboradores Multipark
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
