
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { XCircle, RefreshCw, Euro, AlertTriangle } from 'lucide-react'

const Cancelamentos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Cancelamentos" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4 text-center">
              <XCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-gray-600">Cancelamentos Hoje</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <RefreshCw className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Reembolsos Processados</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <Euro className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">345€</div>
              <div className="text-sm text-gray-600">Valor Reembolsado</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestão de Cancelamentos e Reembolsos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Sistema de gestão de cancelamentos em desenvolvimento.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Cancelamentos
