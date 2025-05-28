
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CreditCard, TrendingDown, Receipt, DollarSign } from 'lucide-react'

const Despesas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Controlo de Despesas" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4 text-center">
              <DollarSign className="mx-auto h-8 w-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-600">2.847€</div>
              <div className="text-sm text-gray-600">Despesas do Mês</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Receipt className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Recibos Processados</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 text-center">
              <CreditCard className="mx-auto h-8 w-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-600">Cartões Empresa</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <TrendingDown className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">-12%</div>
              <div className="text-sm text-gray-600">vs Mês Anterior</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Controlo de Despesas Operacionais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Sistema de controlo de despesas em desenvolvimento.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Despesas
