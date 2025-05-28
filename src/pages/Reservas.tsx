
import React from 'react'
import Header from '../components/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Calendar, Upload, BarChart3 } from 'lucide-react'

const Reservas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestão de Reservas" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Importar Reservas Iniciais */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Importar Reservas Iniciais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Não foi escolhido nenhum ficheiro</span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Processar Ficheiro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard de Análise de Reservas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dashboard de Análise de Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="dataInicio">Data Início:</Label>
                <Input type="date" id="dataInicio" defaultValue="2025-04-30" />
              </div>
              <div>
                <Label htmlFor="dataFim">Data Fim:</Label>
                <Input type="date" id="dataFim" defaultValue="2025-05-30" />
              </div>
              <div>
                <Label htmlFor="periodoRapido">Período Rápido:</Label>
                <Select defaultValue="este-mes">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="este-mes">Este Mês</SelectItem>
                    <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
                    <SelectItem value="trimestre">Este Trimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analisar
            </Button>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">330</div>
                  <div className="text-sm text-gray-600">Total de Reservas</div>
                  <div className="text-xs text-gray-500">30/04/2025, a 31/05/2025</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">21 846,00 €</div>
                  <div className="text-sm text-gray-600">Valor Total Estimado</div>
                  <div className="text-xs text-gray-500">30/04/2025, a 31/05/2025</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600 mb-2">Reservas por Campanha</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Sem Campanha</span>
                      <span>256</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parkos</span>
                      <span>16</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Viagens Baratas</span>
                      <span>12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600 mb-2">Reservas por Dia da Semana</div>
                  <div className="text-xs">
                    <div>Dia com mais reservas (55)</div>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                      <span>48</span>
                      <span>55</span>
                      <span>49</span>
                      <span>49</span>
                      <span>52</span>
                      <span>47</span>
                      <span>30</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Reservas
