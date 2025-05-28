
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Index = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se já está logado
    const userId = localStorage.getItem('user_id')
    if (userId) {
      navigate('/dashboard')
    }
  }, [navigate])

  return <LoginForm />
}

export default Index
