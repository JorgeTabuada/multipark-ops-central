
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from './Header'
import ParkSelector from './ParkSelector'
import AppCard from './AppCard'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, profile, loading } = useAuth()
  const [selectedPark, setSelectedPark] = useState('')
  const [availableApps, setAvailableApps] = useState([])
  
  // Verificar autenticação
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth')
      return
    }
  }, [user, loading, navigate])

  // Definir aplicações disponíveis por role
  const allApps = [
    {
      id: 'caixa',
      name: 'Caixa Multipark',
      description: 'Reconciliação operacional diária',
      route: '/caixa',
      icon: 'caixa',
      roles: ['super_admin', 'admin', 'tesoureiro', 'back_office']
    },
    {
      id: 'reservas',
      name: 'Reservas',
      description: 'Gestão de reservas e clientes',
      route: '/reservas',
      icon: 'reservas',
      roles: ['super_admin', 'admin', 'supervisor', 'back_office']
    },
    {
      id: 'tarefas',
      name: 'Tarefas',
      description: 'Gestão de tarefas e workflow',
      route: '/tarefas',
      icon: 'tarefas',
      roles: ['super_admin', 'admin', 'supervisor', 'team_leader']
    },
    {
      id: 'produtividade-condutores',
      name: 'Produtividade Condutores',
      description: 'Análise de performance dos condutores',
      route: '/produtividade-condutores',
      icon: 'produtividade',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'projetos',
      name: 'Projetos',
      description: 'Gestão de projetos e iniciativas',
      route: '/projetos',
      icon: 'projetos',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'recolhas',
      name: 'Recolhas',
      description: 'Gestão de recolhas de viaturas',
      route: '/recolhas',
      icon: 'recolhas',
      roles: ['super_admin', 'admin', 'supervisor', 'team_leader']
    },
    {
      id: 'bi-interno',
      name: 'BI Interno',
      description: 'Indicadores e relatórios',
      route: '/bi-interno',
      icon: 'bi-interno',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'perdidos-achados',
      name: 'Perdidos e Achados',
      description: 'Gestão de objetos perdidos',
      route: '/perdidos-achados',
      icon: 'perdidos',
      roles: ['super_admin', 'admin', 'supervisor', 'back_office']
    },
    {
      id: 'relatorios',
      name: 'Relatórios',
      description: 'Geração de relatórios personalizados',
      route: '/relatorios',
      icon: 'relatorios',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'recursos-humanos',
      name: 'Recursos Humanos',
      description: 'Gestão de colaboradores',
      route: '/recursos-humanos',
      icon: 'rh',
      roles: ['super_admin', 'admin']
    },
    {
      id: 'cancelamentos',
      name: 'Cancelamentos',
      description: 'Gestão de cancelamentos e reembolsos',
      route: '/cancelamentos',
      icon: 'cancelamentos',
      roles: ['super_admin', 'admin', 'back_office']
    },
    {
      id: 'despesas',
      name: 'Despesas',
      description: 'Controlo de despesas operacionais',
      route: '/despesas',
      icon: 'despesas',
      roles: ['super_admin', 'admin', 'tesoureiro']
    },
    {
      id: 'faturacao',
      name: 'Faturação',
      description: 'Gestão de faturas e cobrança',
      route: '/faturacao',
      icon: 'faturacao',
      roles: ['super_admin', 'admin', 'back_office']
    },
    {
      id: 'comentarios-reclamacoes',
      name: 'Comentários e Reclamações',
      description: 'Gestão de feedback dos clientes',
      route: '/comentarios-reclamacoes',
      icon: 'comentarios',
      roles: ['super_admin', 'admin', 'supervisor', 'back_office']
    },
    {
      id: 'auditorias-internas',
      name: 'Auditorias Internas',
      description: 'Auditorias de condutores',
      route: '/auditorias-internas',
      icon: 'auditorias',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'comportamentos',
      name: 'Comportamentos',
      description: 'Análise comportamental dos colaboradores',
      route: '/comportamentos',
      icon: 'comportamentos',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'confirmacao-caixa',
      name: 'Confirmação de Caixa',
      description: 'Validação final de caixa',
      route: '/confirmacao-caixa',
      icon: 'confirmacao',
      roles: ['super_admin', 'admin', 'tesoureiro']
    },
    {
      id: 'entregas',
      name: 'Entregas',
      description: 'Gestão de entregas e logística',
      route: '/entregas',
      icon: 'entregas',
      roles: ['super_admin', 'admin', 'supervisor', 'team_leader']
    },
    {
      id: 'acessos-alteracoes',
      name: 'Acessos & Alterações',
      description: 'Log de acessos e alterações do sistema',
      route: '/acessos-alteracoes',
      icon: 'acessos',
      roles: ['super_admin', 'admin']
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Campanhas e estratégias de marketing',
      route: '/marketing',
      icon: 'marketing',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'formacao-apoio',
      name: 'Formação & Apoio',
      description: 'Recursos de formação e suporte',
      route: '/formacao-apoio',
      icon: 'formacao',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'mapa-ocupacao',
      name: 'Mapa de Ocupação Inteligente',
      description: 'Visualização da ocupação em tempo real',
      route: '/mapa-ocupacao',
      icon: 'mapa',
      roles: ['super_admin', 'admin', 'supervisor']
    },
    {
      id: 'reservas-externas',
      name: 'Reservas Externas / Agregadores',
      description: 'Integração com plataformas externas',
      route: '/reservas-externas',
      icon: 'agregadores',
      roles: ['super_admin', 'admin', 'back_office']
    }
  ]

  // Filtrar apps por role
  useEffect(() => {
    if (profile?.role) {
      const filtered = allApps.filter(app => 
        app.roles.includes(profile.role) || profile.role === 'super_admin'
      )
      setAvailableApps(filtered)
    }
  }, [profile])

  const handleParkChange = (parkId) => {
    setSelectedPark(parkId)
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
      <Header title="Dashboard Principal" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {profile.full_name || user.email}
          </h2>
          <p className="text-gray-600">
            Selecione uma aplicação para começar
          </p>
        </div>

        <ParkSelector onParkChange={handleParkChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {availableApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Não há aplicações disponíveis para o seu perfil.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
