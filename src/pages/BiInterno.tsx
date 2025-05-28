
import React from 'react'
import Header from '../components/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { BarChart3, TrendingUp, Euro, Users, Percent } from 'lucide-react'

const BiInterno = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="BI Interno - Análise de Desempenho" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros Globais */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Filtros Globais da Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="periodo">Período:</Label>
                <Input type="text" id="periodo" placeholder="Selecione o intervalo de datas" />
              </div>

              <div>
                <Label htmlFor="parques">Parque(s):</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os parques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lisboa">Lisboa</SelectItem>
                    <SelectItem value="porto">Porto</SelectItem>
                    <SelectItem value="faro">Faro</SelectItem>
                    <SelectItem value="todos">Todos os Parques</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-gray-500 mt-1">
                  Ctrl/Cmd + Clique para múltiplos. Deixe vazio para todos.
                </div>
              </div>

              <div>
                <Label htmlFor="condutor">Condutor (Opcional):</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os Condutores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Condutores</SelectItem>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-6">
                  Aplicar Filtros e Atualizar BI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Indicadores Chave de Desempenho (KPIs) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Indicadores Chave de Desempenho (KPIs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Euro className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <div className="text-xs text-gray-600 mb-1">RECEITA BRUTA TOTAL</div>
                  <div className="text-2xl font-bold">0,00 €</div>
                  <div className="text-xs text-gray-500">-- vs período anterior</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="mx-auto h-8 w-8 text-red-600 mb-2" />
                  <div className="text-xs text-gray-600 mb-1">DESPESAS TOTAIS</div>
                  <div className="text-2xl font-bold">0,00 €</div>
                  <div className="text-xs text-gray-500">-- vs período anterior</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                  <div className="text-xs text-gray-600 mb-1">LUCRO (RECEITA - DESPESA)</div>
                  <div className="text-2xl font-bold">0,00 €</div>
                  <div className="text-xs text-gray-500">-- vs período anterior</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                  <div className="text-xs text-gray-600 mb-1">TOTAL DE RESERVAS</div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-gray-500">-- vs período anterior</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Percent className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                  <div className="text-xs text-gray-600 mb-1">TAXA DE OCUPAÇÃO MÉDIA</div>
                  <div className="text-2xl font-bold">0%</div>
                  <div className="text-xs text-gray-500">(Requer dados de capacidade e cálculo específico)</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder para Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Evolução da Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Gráfico será exibido após aplicar filtros</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Distribuição de Reservas por Parque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Gráfico será exibido após aplicar filtros</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default BiInterno
