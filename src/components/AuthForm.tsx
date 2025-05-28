
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { signIn, signUp, user } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As passwords não coincidem",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        
        if (error) {
          toast({
            title: "Erro de Login",
            description: error.message === 'Invalid login credentials' 
              ? "Email ou password incorretos" 
              : error.message,
            variant: "destructive"
          })
        } else {
          toast({
            title: "Sucesso",
            description: "Login realizado com sucesso",
          })
          navigate('/dashboard')
        }
      } else {
        const { error } = await signUp(email, password, { full_name: fullName })
        
        if (error) {
          toast({
            title: "Erro de Registo",
            description: error.message,
            variant: "destructive"
          })
        } else {
          toast({
            title: "Sucesso",
            description: "Conta criada com sucesso! Verifique o seu email para confirmar a conta.",
          })
          setIsLogin(true)
        }
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: "Erro de conexão. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/img/logo.png" 
            alt="Multipark Logo" 
            className="h-16 mx-auto mb-4"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </CardTitle>
          <CardDescription>
            Ferramentas Multipark - {isLogin ? 'Entre com as suas credenciais' : 'Crie a sua conta'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <input
                  id="fullName"
                  type="text"
                  required={!isLogin}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="O seu nome completo"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
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

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirmar Password</Label>
                <input
                  id="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800"
            >
              {loading ? (isLogin ? 'Entrando...' : 'Criando conta...') : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isLogin ? 'Não tem conta? Crie uma aqui' : 'Já tem conta? Entre aqui'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Voltar à página inicial
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthForm
