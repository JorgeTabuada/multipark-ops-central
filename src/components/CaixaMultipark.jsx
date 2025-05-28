
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Calculator, Euro, TrendingUp, AlertCircle } from 'lucide-react'

const CaixaMultipark = () => {
  const [sessaoAtual, setSessaoAtual] = useState(null)
  const [valorNumerario, setValorNumerario] = useState('')
  const [valorMultibanco, setValorMultibanco] = useState('')
  const [valorOutros, setValorOutros] = useState('')

  const handleAbrirSessao = () => {
    setSessaoAtual({
      data: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      responsavel: 'João Silva'
    })
  }

  const handleFecharSessao = () => {
    // Lógica para fechar sessão
    setSessaoAtual(null)
    setValorNumerario('')
    setValorMultibanco('')
    setValorOutros('')
  }

  const calcularTotal = () => {
    const numerario = parseFloat(valorNumerario) || 0
    const multibanco = parseFloat(valorMultibanco) || 0
    const outros = parseFloat(valorOutros) || 0
    return numerario + multibanco + outros
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Caixa Multipark" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status da Sessão */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Estado da Sessão Atual</CardTitle>
          </CardHeader>
          <CardContent>
            {!sessaoAtual ? (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma sessão ativa</h3>
                <p className="text-gray-600 mb-4">Abra uma nova sessão para começar o controlo de caixa</p>
                <Button onClick={handleAbrirSessao} className="bg-green-600 hover:bg-green-700">
                  <Calculator className="mr-2 h-4 w-4" />
                  Abrir Nova Sessão
                </Button>
              </div>
            ) : (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Sessão Ativa</h3>
                      <p className="text-sm text-green-700">
                        Iniciada em {sessaoAtual.data} às {sessaoAtual.hora} por {sessaoAtual.responsavel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reconciliação de Valores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <Label htmlFor="numerario">Numerário Apurado (€):</Label>
                    <Input
                      id="numerario"
                      type="number"
                      step="0.01"
                      value={valorNumerario}
                      onChange={(e) => setValorNumerario(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="multibanco">Multibanco Apurado (€):</Label>
                    <Input
                      id="multibanco"
                      type="number"
                      step="0.01"
                      value={valorMultibanco}
                      onChange={(e) => setValorMultibanco(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="outros">Outros Pagamentos (€):</Label>
                    <Input
                      id="outros"
                      type="number"
                      step="0.01"
                      value={valorOutros}
                      onChange={(e) => setValorOutros(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Total Calculado */}
                <Card className="mb-6 border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Total Geral Apurado</h3>
                        <p className="text-sm text-gray-600">Soma de todos os métodos de pagamento</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          {calcularTotal().toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Euro className="mr-2 h-4 w-4" />
                    Validar Transações
                  </Button>
                  <Button 
                    onClick={handleFecharSessao}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Fechar Sessão
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumo de Transações do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Resumo de Transações - Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">127</div>
                  <div className="text-sm text-gray-600">Reservas Processadas</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4 text-center">
                  <Euro className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-600">2.847,50 €</div>
                  <div className="text-sm text-gray-600">Receita Total</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4 text-center">
                  <Calculator className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Multibanco</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Discrepâncias</div>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Reserva ID</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>14:30</TableCell>
                  <TableCell>Multibanco</TableCell>
                  <TableCell>45,00 €</TableCell>
                  <TableCell>R-2025-001234</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Validado
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>14:15</TableCell>
                  <TableCell>Numerário</TableCell>
                  <TableCell>25,00 €</TableCell>
                  <TableCell>R-2025-001233</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>13:45</TableCell>
                  <TableCell>Multibanco</TableCell>
                  <TableCell>67,50 €</TableCell>
                  <TableCell>R-2025-001232</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Validado
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default CaixaMultipark
