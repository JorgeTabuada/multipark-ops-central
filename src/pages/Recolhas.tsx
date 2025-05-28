
import React, { useState } from 'react'
import Header from '../components/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Search, Plus, Car, MapPin, Clock, User } from 'lucide-react'

const Recolhas = () => {
  const [filtroMatricula, setFiltroMatricula] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestão de Recolhas" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Nova Recolha */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Registar Nova Recolha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="matricula">Matrícula do Veículo:</Label>
                <Input id="matricula" placeholder="AA-00-AA" />
              </div>

              <div>
                <Label htmlFor="localizacao">Localização Atual:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aeroporto">Aeroporto</SelectItem>
                    <SelectItem value="centro">Centro da Cidade</SelectItem>
                    <SelectItem value="hotel-a">Hotel A</SelectItem>
                    <SelectItem value="hotel-b">Hotel B</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="prioridade">Prioridade:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Registar Recolha
            </Button>
          </CardContent>
        </Card>

        {/* Filtros de Pesquisa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pesquisar Recolhas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="filtro-matricula">Matrícula:</Label>
                <Input
                  id="filtro-matricula"
                  value={filtroMatricula}
                  onChange={(e) => setFiltroMatricula(e.target.value)}
                  placeholder="Filtrar por matrícula"
                />
              </div>

              <div>
                <Label htmlFor="filtro-estado">Estado:</Label>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os estados</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em-progresso">Em Progresso</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2 h-4 w-4" />
                  Pesquisar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Recolhas Pendentes</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <Car className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <div className="text-sm text-gray-600">Em Progresso</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <MapPin className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">43</div>
              <div className="text-sm text-gray-600">Concluídas Hoje</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 text-center">
              <User className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Condutores Ativos</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Recolhas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recolhas Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Condutor</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>15:30</TableCell>
                  <TableCell>AA-12-34</TableCell>
                  <TableCell>Aeroporto - Terminal 1</TableCell>
                  <TableCell>João Silva</TableCell>
                  <TableCell>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      Alta
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Em Progresso
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Concluir</Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>16:00</TableCell>
                  <TableCell>BB-56-78</TableCell>
                  <TableCell>Hotel Central</TableCell>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Normal
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Iniciar</Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>16:30</TableCell>
                  <TableCell>CC-90-12</TableCell>
                  <TableCell>Centro Comercial</TableCell>
                  <TableCell>Pedro Costa</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Baixa
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Iniciar</Button>
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
