
import React from 'react'
import Header from '../components/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Upload, Calendar, Truck, FileText } from 'lucide-react'

const AuditoriasInternas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Auditorias Internas de Condutores" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Iniciar Nova Auditoria */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Iniciar Nova Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="funcionario">Funcionário a Auditar:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="condutor1">João Silva</SelectItem>
                    <SelectItem value="condutor2">Maria Santos</SelectItem>
                    <SelectItem value="condutor3">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="periodoInicio">Período de Análise - Início:</Label>
                <Input type="date" id="periodoInicio" placeholder="dd/mm/aaaa" />
              </div>

              <div>
                <Label htmlFor="periodoFim">Período de Análise - Fim:</Label>
                <Input type="date" id="periodoFim" placeholder="dd/mm/aaaa" />
              </div>

              <div>
                <Label htmlFor="ficheiroVelocidade">Ficheiro Velocidade/Localização (JSON):</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Não foi escolhido nenhum ficheiro</span>
                </div>
              </div>

              <div>
                <Label htmlFor="ficheiroMovimentacoes">Ficheiro Movimentações (Excel - baseado em Reservas):</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Não foi escolhido nenhum ficheiro</span>
                </div>
              </div>

              <div>
                <Label htmlFor="ficheirosAudio">Ficheiros de Áudio (Opcional, múltiplos):</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Não foi escolhido nenhum ficheiro</span>
                </div>
              </div>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600">
              <Truck className="mr-2 h-4 w-4" />
              Iniciar Análise e Apresentar Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Auditorias Anteriores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Auditorias Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Período Analisado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>15/05/2025</TableCell>
                  <TableCell>João Silva</TableCell>
                  <TableCell>01/05/2025 - 15/05/2025</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Concluída
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Ver Relatório
                      </Button>
                      <Button size="sm" variant="outline">
                        Dashboard
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>10/05/2025</TableCell>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell>25/04/2025 - 10/05/2025</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Em Análise
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Continuar
                      </Button>
                      <Button size="sm" variant="outline">
                        Dashboard
                      </Button>
                    </div>
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

export default AuditoriasInternas
