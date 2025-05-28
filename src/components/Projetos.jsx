
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { FolderPlus, Calendar, Users, BarChart3 } from 'lucide-react'

const Projetos = () => {
  const [novoProjeto, setNovoProjeto] = useState('')
  const [novaDescricao, setNovaDescricao] = useState('')
  const [novoGestor, setNovoGestor] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestão de Projetos" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <FolderPlus className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Projetos Ativos</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Concluídos</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <Calendar className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-600">Atrasados</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">45</div>
              <div className="text-sm text-gray-600">Colaboradores</div>
            </CardContent>
          </Card>
        </div>

        {/* Novo Projeto */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Criar Novo Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="projeto">Nome do Projeto:</Label>
                <Input
                  id="projeto"
                  value={novoProjeto}
                  onChange={(e) => setNovoProjeto(e.target.value)}
                  placeholder="Nome do projeto"
                />
              </div>

              <div>
                <Label htmlFor="gestor">Gestor do Projeto:</Label>
                <Select value={novoGestor} onValueChange={setNovoGestor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar gestor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Criar Projeto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Projetos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Projetos em Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Gestor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Data Fim</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Modernização Sistema Pagamentos</TableCell>
                  <TableCell>João Silva</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Em Progresso
                    </span>
                  </TableCell>
                  <TableCell>65%</TableCell>
                  <TableCell>15/06/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expansão Parque Norte</TableCell>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Planeamento
                    </span>
                  </TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>30/07/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Implementação APP Mobile</TableCell>
                  <TableCell>Pedro Costa</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Atrasado
                    </span>
                  </TableCell>
                  <TableCell>80%</TableCell>
                  <TableCell>01/05/2025</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Detalhes
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

export default Projetos
