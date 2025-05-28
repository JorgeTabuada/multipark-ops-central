
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const CaixaMultipark = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('importacao')

  // Verificar autenticação e permissões
  React.useEffect(() => {
    const userId = localStorage.getItem('user_id')
    const role = localStorage.getItem('role')
    
    if (!userId) {
      navigate('/')
      return
    }
    
    // Verificar se tem permissão para caixa
    const allowedRoles = ['super_admin', 'admin', 'tesoureiro', 'back_office']
    if (!allowedRoles.includes(role)) {
      navigate('/dashboard')
      return
    }
  }, [navigate])

  const tabs = [
    { id: 'importacao', name: 'Importação', description: 'Upload de ficheiros' },
    { id: 'comparacao', name: 'Comparação', description: 'Análise de dados' },
    { id: 'validacao', name: 'Validação', description: 'Revisão por condutor' },
    { id: 'dashboard', name: 'Dashboard', description: 'Relatórios finais' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'importacao':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Importação de Ficheiros</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-md font-medium mb-2">Ficheiro Odoo</h4>
                <p className="text-sm text-gray-500 mb-4">odoo_YYYY-MM-DD.xlsx</p>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  id="odoo-file"
                />
                <label
                  htmlFor="odoo-file"
                  className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition-colors"
                >
                  Selecionar Ficheiro
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-md font-medium mb-2">Ficheiro BackOffice</h4>
                <p className="text-sm text-gray-500 mb-4">backoffice_YYYY-MM-DD.xlsx</p>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  id="backoffice-file"
                />
                <label
                  htmlFor="backoffice-file"
                  className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition-colors"
                >
                  Selecionar Ficheiro
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-md font-medium mb-2">Ficheiro Caixa</h4>
                <p className="text-sm text-gray-500 mb-4">caixa_YYYY-MM-DD_HHMMSS.xlsx</p>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  id="caixa-file"
                  multiple
                />
                <label
                  htmlFor="caixa-file"
                  className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition-colors"
                >
                  Selecionar Ficheiro(s)
                </label>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Instruções:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Carregue primeiro os ficheiros Odoo e BackOffice do dia anterior</li>
                <li>• Os ficheiros Caixa podem ser carregados durante o dia operacional</li>
                <li>• Formatos aceites: .xlsx, .csv</li>
                <li>• A comparação é executada automaticamente após cada carregamento</li>
              </ul>
            </div>
          </div>
        )

      case 'comparacao':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Comparação de Dados</h3>
            <p className="text-gray-600">
              Esta secção mostrará a tabela de comparação entre os ficheiros carregados.
              A comparação é executada automaticamente quando todos os tipos de ficheiros estão presentes.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">Aguardando carregamento de ficheiros...</p>
            </div>
          </div>
        )

      case 'validacao':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Validação por Condutor</h3>
            <p className="text-gray-600">
              Revise e valide as entregas por condutor após o carregamento dos ficheiros Caixa.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">Nenhum condutor disponível para validação...</p>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Dashboard Final</h3>
            <p className="text-gray-600">
              KPIs e relatórios finais após o fecho de caixa diário.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">Dashboard disponível após fecho de caixa...</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Caixa Multipark" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação por abas */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                <span className="block text-xs text-gray-400">{tab.description}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo da aba ativa */}
        {renderTabContent()}
      </main>
    </div>
  )
}

export default CaixaMultipark
