
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import ParkSelector from './ParkSelector'
import AppCard from './AppCard'

const Dashboard = () => {
  const navigate = useNavigate()
  const [selectedPark, setSelectedPark] = useState('')
  const [availableApps, setAvailableApps] = useState([])
  
  const nome = localStorage.getItem('nome')
  const role = localStorage.getItem('role')

  // Verificar autenticação
  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    if (!userId) {
      navigate('/')
      return
    }
  }, [navigate])

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
    }
  ]

  // Filtrar apps por role
  useEffect(() => {
    const filtered = allApps.filter(app => 
      app.roles.includes(role) || role === 'super_admin'
    )
    setAvailableApps(filtered)
  }, [role])

  const handleParkChange = (parkId) => {
    setSelectedPark(parkId)
  }

  if (!nome) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Dashboard Principal" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {nome}
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
