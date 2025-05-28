
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { CheckSquare, Clock, AlertTriangle, Plus, Filter } from 'lucide-react'

const Tarefas = () => {
  const [novaDescricao, setNovaDescricao] = useState('')
  const [novaPrioridade, setNovaPrioridade] = useState('')
  const [novoResponsavel, setNovoResponsavel] = useState('')

  const handleCriarTarefa = () => {
    // Lógica para criar nova tarefa
    console.log('Nova tarefa:', { novaDescricao, novaPrioridade, novoResponsavel })
    setNovaDescricao('')
    setNovaPrioridade('')
    setNovoResponsavel('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestão de Tarefas" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <CheckSquare className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">Concluídas</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Em Progresso</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="mx-auto h-8 w-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-gray-600">Atrasadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Nova Tarefa */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Criar Nova Tarefa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="descricao">Descrição:</Label>
                <Input
                  id="descricao"
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  placeholder="Descrição da tarefa"
                />
              </div>

              <div>
                <Label htmlFor="prioridade">Prioridade:</Label>
                <Select value={novaPrioridade} onValueChange={setNovaPrioridade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável:</Label>
                <Select value={novoResponsavel} onValueChange={setNovoResponsavel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Atribuir a" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleCriarTarefa} className="w-full">
                  Criar Tarefa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tarefas */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Lista de Tarefas</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarefa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Data Limite</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Verificar sistema de câmaras</TableCell>
                  <TableCell>João Silva</TableCell>
                  <TableCell>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      Alta
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Em Progresso
                    </span>
                  </TableCell>
                  <TableCell>28/05/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Limpeza do parque</TableCell>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Média
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Concluída
                    </span>
                  </TableCell>
                  <TableCell>27/05/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Manutenção de equipamentos</TableCell>
                  <TableCell>Pedro Costa</TableCell>
                  <TableCell>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      Urgente
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </TableCell>
                  <TableCell>29/05/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
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

export default Tarefas
