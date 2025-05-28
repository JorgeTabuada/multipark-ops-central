
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react'

const Relatorios = () => {
  const [tipoRelatorio, setTipoRelatorio] = useState('')
  const [periodo, setPeriodo] = useState('')

  const relatoriosDisponiveis = [
    { id: 'receitas', nome: 'Relatório de Receitas', icone: <BarChart3 className="h-5 w-5" /> },
    { id: 'ocupacao', nome: 'Relatório de Ocupação', icone: <Calendar className="h-5 w-5" /> },
    { id: 'condutores', nome: 'Relatório de Condutores', icone: <FileText className="h-5 w-5" /> },
    { id: 'manutencao', nome: 'Relatório de Manutenção', icone: <FileText className="h-5 w-5" /> },
    { id: 'clientes', nome: 'Relatório de Clientes', icone: <FileText className="h-5 w-5" /> },
    { id: 'financeiro', nome: 'Relatório Financeiro', icone: <BarChart3 className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Relatórios" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gerador de Relatórios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Gerar Novo Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Relatório:</label>
                <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receitas">Receitas</SelectItem>
                    <SelectItem value="ocupacao">Ocupação</SelectItem>
                    <SelectItem value="condutores">Condutores</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="clientes">Clientes</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Período:</label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                    <SelectItem value="trimestre">Trimestre</SelectItem>
                    <SelectItem value="ano">Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {relatoriosDisponiveis.map((relatorio) => (
            <Card key={relatorio.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-blue-600">
                  {relatorio.icone}
                </div>
                <h3 className="text-lg font-semibold mb-2">{relatorio.nome}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Relatório detalhado com análise completa
                </p>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Gerar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Histórico de Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Relatórios Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Relatório de Receitas - Maio 2025</h4>
                  <p className="text-sm text-gray-600">Gerado em 28/05/2025 às 10:30</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Relatório de Ocupação - Semana 21</h4>
                  <p className="text-sm text-gray-600">Gerado em 27/05/2025 às 16:45</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Relatório de Condutores - Maio 2025</h4>
                  <p className="text-sm text-gray-600">Gerado em 26/05/2025 às 09:15</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Relatorios
