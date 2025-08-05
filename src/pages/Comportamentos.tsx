// Enhanced Comportamentos page with Excel upload functionality
// Demonstrates advanced data processing and behavioral analysis features

import React, { useState } from 'react'
import { useDatabase } from '../hooks/useMultiDatabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import ExcelUpload from '../components/ExcelUpload'
import Header from '../components/Header'
import { 
  Brain, TrendingUp, Users, AlertTriangle, BarChart3, 
  FileText, Clock, Target, Activity, Database
} from 'lucide-react'

const Comportamentos = () => {
  const { client: operationalClient, isAvailable } = useDatabase('operational')
  const { client: analyticsClient } = useDatabase('analytics')
  const [uploadedData, setUploadedData] = useState<any[]>([])
  const [behaviorMetrics, setBehaviorMetrics] = useState<any>(null)

  // Validation rules for behavior data uploads
  const behaviorValidationRules = [
    { field: 'profile_id', required: true, type: 'string' as const },
    { field: 'data_registo', required: true, type: 'date' as const },
    { field: 'minutos_trabalhados', required: false, type: 'number' as const },
    { field: 'num_entregas_efetuadas', required: false, type: 'number' as const },
    { field: 'num_recolhas_efetuadas', required: false, type: 'number' as const },
    { field: 'alertas_velocidade', required: false, type: 'number' as const },
    { field: 'num_disparidades_picagem', required: false, type: 'number' as const }
  ]

  const handleDataProcessed = async (data: any[], metadata: any) => {
    console.log('Dados processados:', { data, metadata })
    setUploadedData(data)

    // Process behavioral metrics
    if (data.length > 0) {
      const metrics = calculateBehaviorMetrics(data)
      setBehaviorMetrics(metrics)

      // If analytics database is available, save processed data
      if (analyticsClient && isAvailable) {
        try {
          // This would save to the behavior analytics tables
          console.log('Saving to analytics database...', metrics)
        } catch (error) {
          console.error('Error saving to analytics database:', error)
        }
      }
    }
  }

  const calculateBehaviorMetrics = (data: any[]) => {
    const totalRecords = data.length
    const validRecords = data.filter(record => record.profile_id && record.data_registo)
    
    // Calculate averages and aggregations
    const avgMinutosTrabalho = validRecords.reduce((sum, record) => 
      sum + (Number(record.minutos_trabalhados) || 0), 0) / validRecords.length
    
    const totalEntregas = validRecords.reduce((sum, record) => 
      sum + (Number(record.num_entregas_efetuadas) || 0), 0)
    
    const totalRecolhas = validRecords.reduce((sum, record) => 
      sum + (Number(record.num_recolhas_efetuadas) || 0), 0)
    
    const totalAlertas = validRecords.reduce((sum, record) => 
      sum + (Number(record.alertas_velocidade) || 0), 0)
    
    const totalDisparidades = validRecords.reduce((sum, record) => 
      sum + (Number(record.num_disparidades_picagem) || 0), 0)

    // Performance indicators
    const highPerformers = validRecords.filter(record => 
      (Number(record.num_entregas_efetuadas) + Number(record.num_recolhas_efetuadas)) > 
      (totalEntregas + totalRecolhas) / validRecords.length
    ).length

    const lowPerformers = validRecords.filter(record => 
      Number(record.alertas_velocidade) > 5 || Number(record.num_disparidades_picagem) > 3
    ).length

    return {
      totalRecords,
      validRecords: validRecords.length,
      avgMinutosTrabalho: Math.round(avgMinutosTrabalho),
      totalEntregas,
      totalRecolhas,
      totalAlertas,
      totalDisparidades,
      highPerformers,
      lowPerformers,
      performanceRate: Math.round((highPerformers / validRecords.length) * 100),
      alertRate: Math.round((totalAlertas / validRecords.length) * 100),
      uniqueProfiles: new Set(validRecords.map(r => r.profile_id)).size
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Análise Comportamental" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Análise Comportamental</h1>
              <p className="text-lg text-gray-600">
                Análise avançada de comportamentos e performance dos colaboradores
              </p>
            </div>
          </div>

          {/* Database Status */}
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-4 w-4" />
            <Badge variant={isAvailable ? "default" : "secondary"}>
              Base Operacional: {isAvailable ? "Conectada" : "Offline"}
            </Badge>
            <Badge variant={analyticsClient ? "default" : "secondary"}>
              Base Analytics: {analyticsClient ? "Disponível" : "N/A"}
            </Badge>
          </div>

          {!isAvailable && (
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Funcionalidades limitadas devido a problemas de conectividade. 
                Os dados serão processados localmente.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload de Dados
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Análise
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <ExcelUpload
              title="Upload de Dados Comportamentais"
              description="Importe dados de comportamento e performance dos colaboradores através de ficheiros Excel ou CSV"
              validationRules={behaviorValidationRules}
              onDataProcessed={handleDataProcessed}
              maxFileSize={20 * 1024 * 1024} // 20MB
            />

            {uploadedData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Dados Carregados
                  </CardTitle>
                  <CardDescription>
                    {uploadedData.length} registos processados com sucesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {behaviorMetrics?.uniqueProfiles || 0}
                      </p>
                      <p className="text-sm text-gray-600">Colaboradores</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {behaviorMetrics?.totalEntregas || 0}
                      </p>
                      <p className="text-sm text-gray-600">Entregas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {behaviorMetrics?.totalRecolhas || 0}
                      </p>
                      <p className="text-sm text-gray-600">Recolhas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {behaviorMetrics?.avgMinutosTrabalho || 0}
                      </p>
                      <p className="text-sm text-gray-600">Min/Dia Médio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {behaviorMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Performance Geral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Taxa de Performance:</span>
                        <Badge variant={behaviorMetrics.performanceRate > 70 ? "default" : "secondary"}>
                          {behaviorMetrics.performanceRate}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">High Performers:</span>
                        <span className="font-semibold">{behaviorMetrics.highPerformers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Necessitam Atenção:</span>
                        <span className="font-semibold text-red-600">{behaviorMetrics.lowPerformers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Indicadores de Risco
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Alertas de Velocidade:</span>
                        <Badge variant={behaviorMetrics.totalAlertas > 50 ? "destructive" : "secondary"}>
                          {behaviorMetrics.totalAlertas}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Disparidades:</span>
                        <Badge variant={behaviorMetrics.totalDisparidades > 20 ? "destructive" : "secondary"}>
                          {behaviorMetrics.totalDisparidades}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Taxa de Alertas:</span>
                        <span className="font-semibold">{behaviorMetrics.alertRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Produtividade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Registos Válidos:</span>
                        <Badge variant="outline">
                          {behaviorMetrics.validRecords}/{behaviorMetrics.totalRecords}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Operações:</span>
                        <span className="font-semibold">
                          {behaviorMetrics.totalEntregas + behaviorMetrics.totalRecolhas}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Média por Colaborador:</span>
                        <span className="font-semibold">
                          {Math.round((behaviorMetrics.totalEntregas + behaviorMetrics.totalRecolhas) / behaviorMetrics.uniqueProfiles)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Sem Dados para Análise
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Importe dados comportamentais na aba "Upload de Dados" para começar a análise.
                    </p>
                    <Button variant="outline">
                      Ir para Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Relatórios Comportamentais
                </CardTitle>
                <CardDescription>
                  Gere relatórios detalhados sobre comportamentos e performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Relatório por Colaborador
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Análise de Tendências
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    Relatório de Riscos
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Activity className="h-6 w-6 mb-2" />
                    Performance Comparativa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Comportamentos