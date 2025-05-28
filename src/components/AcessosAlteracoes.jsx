
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const AcessosAlteracoes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Acessos & Alterações" showBackButton={true} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader><CardTitle>Log de Acessos e Alterações</CardTitle></CardHeader>
          <CardContent><p className="text-gray-600">Sistema de auditoria de acessos em desenvolvimento.</p></CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AcessosAlteracoes
