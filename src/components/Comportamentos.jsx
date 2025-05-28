
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const Comportamentos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Análise de Comportamentos" showBackButton={true} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader><CardTitle>Análise Comportamental</CardTitle></CardHeader>
          <CardContent><p className="text-gray-600">Sistema de análise comportamental em desenvolvimento.</p></CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Comportamentos
