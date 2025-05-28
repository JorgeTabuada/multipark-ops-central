
// Este componente foi substituído por AuthForm.tsx
// Manter para compatibilidade se necessário, mas o novo sistema usa AuthForm
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  
  React.useEffect(() => {
    navigate('/auth')
  }, [navigate])

  return null
}

export default LoginForm
