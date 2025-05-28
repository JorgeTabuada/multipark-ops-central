
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Users, UserPlus, Clock, Award } from 'lucide-react'

const RecursosHumanos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Recursos Humanos" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-600">Colaboradores</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <UserPlus className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Novas Contratações</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Em Férias</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 text-center">
              <Award className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Avaliações Pendentes</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestão de Colaboradores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Funcionalidade de gestão de recursos humanos em desenvolvimento.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default RecursosHumanos
