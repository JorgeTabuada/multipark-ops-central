
import React, { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Search, Package, Clock, CheckCircle } from 'lucide-react'

const PerdidosAchados = () => {
  const [novoObjeto, setNovoObjeto] = useState('')
  const [novaLocalizacao, setNovaLocalizacao] = useState('')
  const [novoContato, setNovoContato] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Perdidos e Achados" showBackButton={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 text-center">
              <Package className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Objetos Registados</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4 text-center">
              <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">Devolvidos</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 text-center">
              <Search className="mx-auto h-8 w-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Em Procura</div>
            </CardContent>
          </Card>
        </div>

        {/* Registar Novo Objeto */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Registar Objeto Encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="objeto">Descrição do Objeto:</Label>
                <Input
                  id="objeto"
                  value={novoObjeto}
                  onChange={(e) => setNovoObjeto(e.target.value)}
                  placeholder="Ex: Carteira de couro preta"
                />
              </div>

              <div>
                <Label htmlFor="localizacao">Local Encontrado:</Label>
                <Input
                  id="localizacao"
                  value={novaLocalizacao}
                  onChange={(e) => setNovaLocalizacao(e.target.value)}
                  placeholder="Ex: Piso 2, Zona A"
                />
              </div>

              <div>
                <Label htmlFor="contato">Contacto (se disponível):</Label>
                <Input
                  id="contato"
                  value={novoContato}
                  onChange={(e) => setNovoContato(e.target.value)}
                  placeholder="Telefone ou email"
                />
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Registar Objeto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Objetos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Objetos Perdidos e Achados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Local Encontrado</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>25/05/2025</TableCell>
                  <TableCell>Carteira de couro preta</TableCell>
                  <TableCell>Piso 2, Zona A</TableCell>
                  <TableCell>911 123 456</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Devolvido
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>26/05/2025</TableCell>
                  <TableCell>Chaves BMW</TableCell>
                  <TableCell>Entrada Principal</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>27/05/2025</TableCell>
                  <TableCell>Telemóvel iPhone</TableCell>
                  <TableCell>Piso 3, Zona C</TableCell>
                  <TableCell>contacto@email.com</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Em Contacto
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
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

export default PerdidosAchados
