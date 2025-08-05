// Modern Dashboard Home with categorized modules
// Based on the fusion plan for a cleaner, more organized interface

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useMultiDatabase } from '../hooks/useMultiDatabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from './Header'
import ParkSelector from './ParkSelector'
import { 
  CreditCard, XCircle, CheckCircle, Truck, Package, Calendar,
  Users, FolderOpen, FileText, BarChart3, Target, Activity,
  MessageSquare, Search, GraduationCap, MapPin, ExternalLink,
  Settings, Shield, TrendingUp, Brain, AlertTriangle, Database
} from 'lucide-react'

const DashboardHome = () => {
  const navigate = useNavigate()
  const { user, profile, loading } = useAuth()
  const { health, isHealthy, refreshHealth } = useMultiDatabase()
  const [selectedPark, setSelectedPark] = useState('')
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth')
    }
  }, [user, loading, navigate])

  // Module categories with modern organization
  const categories = [
    {
      title: "Operacional",
      description: "Gestão diária das operações",
      color: "bg-blue-50 border-blue-200",
      modules: [
        {
          name: "Caixa Multipark",
          description: "Reconciliação operacional diária",
          route: "/caixa",
          icon: CreditCard,
          roles: ["super_admin", "admin", "tesoureiro", "back_office"],
          status: "active"
        },
        {
          name: "Cancelamentos", 
          description: "Gestão de cancelamentos",
          route: "/cancelamentos",
          icon: XCircle,
          roles: ["super_admin", "admin", "back_office"],
          status: "active"
        },
        {
          name: "Confirmação de Caixa",
          description: "Validação final de transações",
          route: "/confirmacao-caixa", 
          icon: CheckCircle,
          roles: ["super_admin", "admin", "tesoureiro"],
          status: "active"
        },
        {
          name: "Entregas",
          description: "Sistema de entregas",
          route: "/entregas",
          icon: Truck,
          roles: ["super_admin", "admin", "supervisor", "team_leader"],
          status: "active"
        },
        {
          name: "Recolhas",
          description: "Gestão de recolhas",
          route: "/recolhas",
          icon: Package,
          roles: ["super_admin", "admin", "supervisor", "team_leader"],
          status: "active"
        },
        {
          name: "Reservas",
          description: "Dashboard de análise de reservas",
          route: "/reservas",
          icon: Calendar,
          roles: ["super_admin", "admin", "supervisor", "back_office"],
          status: "active"
        }
      ]
    },
    {
      title: "Gestão",
      description: "Ferramentas administrativas",
      color: "bg-green-50 border-green-200",
      modules: [
        {
          name: "Despesas",
          description: "CRUD completo de despesas",
          route: "/despesas",
          icon: FileText,
          roles: ["super_admin", "admin", "tesoureiro"],
          status: "active"
        },
        {
          name: "Faturação",
          description: "Sistema de faturação",
          route: "/faturacao",
          icon: FileText,
          roles: ["super_admin", "admin", "back_office"],
          status: "active"
        },
        {
          name: "Recursos Humanos",
          description: "Gestão de pessoal",
          route: "/recursos-humanos",
          icon: Users,
          roles: ["super_admin", "admin"],
          status: "enhanced"
        },
        {
          name: "Projetos",
          description: "Gestão de projetos",
          route: "/projetos",
          icon: FolderOpen,
          roles: ["super_admin", "admin", "supervisor"],
          status: "active"
        },
        {
          name: "Tarefas",
          description: "Sistema de tarefas",
          route: "/tarefas",
          icon: Target,
          roles: ["super_admin", "admin", "supervisor", "team_leader"],
          status: "active"
        }
      ]
    },
    {
      title: "Análises",
      description: "Business Intelligence e relatórios",
      color: "bg-purple-50 border-purple-200",
      modules: [
        {
          name: "BI Interno",
          description: "Dashboard analytics",
          route: "/bi-interno",
          icon: BarChart3,
          roles: ["super_admin", "admin", "supervisor"],
          status: "enhanced"
        },
        {
          name: "Comportamentos",
          description: "Análise comportamental",
          route: "/comportamentos",
          icon: Brain,
          roles: ["super_admin", "admin", "supervisor"],
          status: "enhanced"
        },
        {
          name: "Mapa de Ocupação",
          description: "Ocupação tempo real",
          route: "/mapa-ocupacao",
          icon: MapPin,
          roles: ["super_admin", "admin", "supervisor"],
          status: "active"
        },
        {
          name: "Marketing",
          description: "Gestão de campanhas",
          route: "/marketing",
          icon: TrendingUp,
          roles: ["super_admin", "admin", "supervisor"],
          status: "active"
        },
        {
          name: "Produtividade Condutores",
          description: "Métricas de performance",
          route: "/produtividade-condutores",
          icon: Activity,
          roles: ["super_admin", "admin", "supervisor"],
          status: "enhanced"
        },
        {
          name: "Relatórios",
          description: "Sistema de reports",
          route: "/relatorios",
          icon: FileText,
          roles: ["super_admin", "admin", "supervisor"],
          status: "active"
        },
        {
          name: "Reservas Externas",
          description: "Integração externa",
          route: "/reservas-externas",
          icon: ExternalLink,
          roles: ["super_admin", "admin", "back_office"],
          status: "active"
        }
      ]
    },
    {
      title: "Administração e Suporte",
      description: "Gestão do sistema e suporte",
      color: "bg-orange-50 border-orange-200",
      modules: [
        {
          name: "Acessos e Alterações",
          description: "Logs do sistema",
          route: "/acessos-alteracoes",
          icon: Shield,
          roles: ["super_admin", "admin"],
          status: "active"
        },
        {
          name: "Auditorias Internas",
          description: "Sistema de auditoria",
          route: "/auditorias-internas",
          icon: Search,
          roles: ["super_admin", "admin", "supervisor"],
          status: "enhanced"
        },
        {
          name: "Comentários & Reclamações",
          description: "CRM de suporte",
          route: "/comentarios-reclamacoes",
          icon: MessageSquare,
          roles: ["super_admin", "admin", "supervisor", "back_office"],
          status: "active"
        },
        {
          name: "Formação & Apoio",
          description: "Gestão de formação",
          route: "/formacao-apoio",
          icon: GraduationCap,
          roles: ["super_admin", "admin", "supervisor"],
          status: "enhanced"
        },
        {
          name: "Perdidos & Achados",
          description: "Sistema P&A",
          route: "/perdidos-achados",
          icon: Search,
          roles: ["super_admin", "admin", "supervisor", "back_office"],
          status: "active"
        }
      ]
    }
  ]

  // Filter modules by user role
  const getAvailableModules = (modules: any[]) => {
    if (!profile?.role) return []
    return modules.filter(module => 
      module.roles.includes(profile.role) || profile.role === 'super_admin'
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enhanced':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Melhorado</Badge>
      case 'new':
        return <Badge variant="default" className="bg-green-100 text-green-800">Novo</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="MultiPark Ops Central" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bem-vindo, {profile.full_name || user.email}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Sistema de Gestão MultiPark - {profile.role?.replace('_', ' ').toUpperCase()}
          </p>
          
          {/* Database Health Status */}
          {health && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Estado das Bases:</span>
                <Badge variant={health.dashboard ? "default" : "destructive"}>
                  Operacional: {health.dashboard ? "✓" : "✗"}
                </Badge>
                <Badge variant={health.ferramentas ? "default" : "secondary"}>
                  Ferramentas: {health.ferramentas ? "✓" : "N/A"}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshHealth}
                className="text-xs"
              >
                Atualizar
              </Button>
            </div>
          )}

          {!isHealthy && (
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Algumas funcionalidades poderão estar limitadas devido a problemas de conectividade com a base de dados.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Park Selector */}
        <div className="mb-8">
          <ParkSelector onParkChange={setSelectedPark} />
        </div>

        {/* Module Categories */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const availableModules = getAvailableModules(category.modules)
            
            if (availableModules.length === 0) return null

            return (
              <div key={categoryIndex} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {availableModules.length} módulo{availableModules.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {availableModules.map((module, moduleIndex) => {
                    const IconComponent = module.icon
                    return (
                      <Card 
                        key={moduleIndex}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${category.color}`}
                        onClick={() => navigate(module.route)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <IconComponent className="h-8 w-8 text-blue-600" />
                            {getStatusBadge(module.status)}
                          </div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {module.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600">
                            {module.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* No modules available */}
        {categories.every(cat => getAvailableModules(cat.modules).length === 0) && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sem Módulos Disponíveis
              </h3>
              <p className="text-gray-500">
                Não há aplicações disponíveis para o seu perfil ({profile.role}).
                Contacte o administrador para obter acesso.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardHome