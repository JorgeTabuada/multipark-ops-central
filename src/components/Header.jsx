
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/supabaseClient'

const Header = ({ title, showBackButton = false }) => {
  const navigate = useNavigate()
  const nome = localStorage.getItem('nome') || 'Utilizador'
  const parque = localStorage.getItem('parqueSelecionado') || 'N/A'

  const handleLogout = async () => {
    await auth.signOut()
    localStorage.clear()
    navigate('/')
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  return (
    <header className="header-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Voltar
              </button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">Parque: {parque}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Olá, {nome}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
