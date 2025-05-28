
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { TrendingUp, Users, Clock, Car } from 'lucide-react'

const ProdutividadeCondutores = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('hoje')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Produtividade dos Condutores" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Filtros de Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Período:</label>
                <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                    <SelectItem value="trimestre">Trimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Condutores Ativos</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Produtividade Média</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">7.2h</div>
              <div className="text-sm text-gray-600">Horas Médias/Dia</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 text-center">
              <Car className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Carros Processados</div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking de Condutores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Ranking de Produtividade</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Posição</TableHead>
                  <TableHead>Condutor</TableHead>
                  <TableHead>Horas Trabalhadas</TableHead>
                  <TableHead>Carros Processados</TableHead>
                  <TableHead>Produtividade</TableHead>
                  <TableHead>Classificação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1º</TableCell>
                  <TableCell>António Silva</TableCell>
                  <TableCell>8.5h</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      95%
                    </span>
                  </TableCell>
                  <TableCell>⭐⭐⭐⭐⭐</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2º</TableCell>
                  <TableCell>Maria Costa</TableCell>
                  <TableCell>8.0h</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      92%
                    </span>
                  </TableCell>
                  <TableCell>⭐⭐⭐⭐⭐</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3º</TableCell>
                  <TableCell>João Santos</TableCell>
                  <TableCell>7.5h</TableCell>
                  <TableCell>22</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      89%
                    </span>
                  </TableCell>
                  <TableCell>⭐⭐⭐⭐</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">4º</TableCell>
                  <TableCell>Pedro Oliveira</TableCell>
                  <TableCell>7.0h</TableCell>
                  <TableCell>19</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      82%
                    </span>
                  </TableCell>
                  <TableCell>⭐⭐⭐</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5º</TableCell>
                  <TableCell>Ana Ferreira</TableCell>
                  <TableCell>6.5h</TableCell>
                  <TableCell>16</TableCell>
                  <TableCell>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      75%
                    </span>
                  </TableCell>
                  <TableCell>⭐⭐</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ProdutividadeCondutores
