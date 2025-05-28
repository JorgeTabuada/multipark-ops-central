
import React from 'react'
import Header from './Header'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const Marketing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Marketing" showBackButton={true} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader><CardTitle>Campanhas e Estratégias</CardTitle></CardHeader>
          <CardContent><p className="text-gray-600">Sistema de marketing em desenvolvimento.</p></CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Marketing
