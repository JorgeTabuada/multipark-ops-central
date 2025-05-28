
import React, { useState } from 'react'
import Header from '../components/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Upload, Car, Search, Plus, MapPin, Clock, User } from 'lucide-react'

const Recolhas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestão de Recolhas de Viaturas" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Nova Recolha */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Registrar Nova Recolha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="cliente">Cliente:</Label>
                <Input 
                  id="cliente" 
                  placeholder="Nome do cliente" 
                />
              </div>

              <div>
                <Label htmlFor="matricula">Matrícula:</Label>
                <Input 
                  id="matricula" 
                  placeholder="AB-12-CD" 
                  className="uppercase"
                />
              </div>

              <div>
                <Label htmlFor="condutor">Condutor Responsável:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o condutor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="destino">Local de Destino:</Label>
                <Input 
                  id="destino" 
                  placeholder="Endereço ou local" 
                />
              </div>

              <div>
                <Label htmlFor="horaRecolha">Hora da Recolha:</Label>
                <Input 
                  type="time" 
                  id="horaRecolha" 
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações:</Label>
                <Input 
                  id="observacoes" 
                  placeholder="Observações adicionais" 
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="fotos">Fotos da Viatura (Opcional):</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Clique para adicionar fotos</span>
                </div>
              </div>
            </div>

            <Button className="bg-green-600 hover:bg-green-700">
              <Car className="mr-2 h-4 w-4" />
              Registrar Recolha
            </Button>
          </CardContent>
        </Card>

        {/* Filtros e Pesquisa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Pesquisar Recolhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="dataFiltro">Data:</Label>
                <Input 
                  type="date" 
                  id="dataFiltro" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="condutorFiltro">Condutor:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os condutores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="statusFiltro">Status:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="em-curso">Em Curso</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-6">
                  Filtrar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Recolhas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recolhas do Dia - {new Date(selectedDate).toLocaleDateString('pt-PT')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Condutor</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">09:30</TableCell>
                  <TableCell>João Manuel</TableCell>
                  <TableCell className="font-mono">AB-12-CD</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      João Silva
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Terminal 1
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Agendada
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Iniciar
                      </Button>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-mono">11:15</TableCell>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell className="font-mono">XY-34-ZW</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Maria Santos
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Terminal 2
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Em Curso
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Concluir
                      </Button>
                      <Button size="sm" variant="outline">
                        Localizar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-mono">14:45</TableCell>
                  <TableCell>Pedro Costa</TableCell>
                  <TableCell className="font-mono">QW-56-ER</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Pedro Costa
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Terminal 1
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Concluída
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        Relatório
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

export default Recolhas
