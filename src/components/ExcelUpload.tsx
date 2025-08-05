// Advanced Excel Upload Component with validation and processing
// Based on the fusion plan for robust Excel processing capabilities

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Upload, FileText, CheckCircle, XCircle, AlertTriangle, 
  Download, Eye, Trash2, RefreshCw
} from 'lucide-react'
import * as XLSX from 'xlsx'

interface ExcelUploadProps {
  onDataProcessed?: (data: any[], metadata: any) => void
  acceptedFileTypes?: string[]
  maxFileSize?: number
  validationRules?: ValidationRule[]
  title?: string
  description?: string
}

interface ValidationRule {
  field: string
  required?: boolean
  type?: 'string' | 'number' | 'date' | 'email'
  pattern?: RegExp
  message?: string
}

interface ProcessedData {
  data: any[]
  metadata: {
    fileName: string
    fileSize: number
    rowCount: number
    columnCount: number
    sheets: string[]
    processingTime: number
    errors: ValidationError[]
    warnings: ValidationError[]
  }
}

interface ValidationError {
  row: number
  column: string
  value: any
  message: string
  type: 'error' | 'warning'
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({
  onDataProcessed,
  acceptedFileTypes = ['.xlsx', '.xls', '.csv'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  validationRules = [],
  title = "Upload de Ficheiros Excel",
  description = "Arraste ficheiros Excel ou CSV para esta área ou clique para selecionar"
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [selectedSheet, setSelectedSheet] = useState<string>('')

  // File drop handler with validation
  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      console.error('Rejected files:', rejectedFiles)
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)

    try {
      const startTime = Date.now()
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      // Read file
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, {
        cellStyles: true,
        cellFormulas: true,
        cellDates: true,
        cellNF: true,
        sheetStubs: true
      })

      clearInterval(progressInterval)
      setUploadProgress(95)

      // Get all sheet names
      const sheetNames = workbook.SheetNames
      const firstSheetName = sheetNames[0]
      
      // Process first sheet by default
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1,
        defval: null,
        raw: false
      })

      // Convert to objects with headers
      const headers = jsonData[0] as string[]
      const dataRows = jsonData.slice(1).map((row: any[]) => {
        const obj: any = {}
        headers.forEach((header, index) => {
          obj[header] = row[index] || null
        })
        return obj
      })

      // Validate data
      const { errors, warnings } = validateData(dataRows, validationRules)

      const processingTime = Date.now() - startTime

      const processedResult: ProcessedData = {
        data: dataRows,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          rowCount: dataRows.length,
          columnCount: headers.length,
          sheets: sheetNames,
          processingTime,
          errors,
          warnings
        }
      }

      setProcessedData(processedResult)
      setPreviewData(dataRows.slice(0, 10)) // Show first 10 rows
      setSelectedSheet(firstSheetName)
      setUploadProgress(100)

      // Callback with processed data
      if (onDataProcessed) {
        onDataProcessed(dataRows, processedResult.metadata)
      }

    } catch (error) {
      console.error('Error processing file:', error)
      setProcessedData({
        data: [],
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          rowCount: 0,
          columnCount: 0,
          sheets: [],
          processingTime: 0,
          errors: [{
            row: 0,
            column: 'file',
            value: null,
            message: `Erro ao processar ficheiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
            type: 'error'
          }],
          warnings: []
        }
      })
    } finally {
      setIsProcessing(false)
      setTimeout(() => setUploadProgress(0), 2000)
    }
  }, [onDataProcessed, validationRules])

  // Data validation function
  const validateData = (data: any[], rules: ValidationRule[]) => {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []

    data.forEach((row, rowIndex) => {
      rules.forEach(rule => {
        const value = row[rule.field]
        const actualRowIndex = rowIndex + 2 // +2 because of header and 0-based indexing

        // Required field validation
        if (rule.required && (value === null || value === undefined || value === '')) {
          errors.push({
            row: actualRowIndex,
            column: rule.field,
            value,
            message: rule.message || `Campo '${rule.field}' é obrigatório`,
            type: 'error'
          })
        }

        // Type validation
        if (value !== null && value !== undefined && value !== '') {
          switch (rule.type) {
            case 'number':
              if (isNaN(Number(value))) {
                errors.push({
                  row: actualRowIndex,
                  column: rule.field,
                  value,
                  message: rule.message || `Campo '${rule.field}' deve ser um número`,
                  type: 'error'
                })
              }
              break
            case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailRegex.test(value)) {
                errors.push({
                  row: actualRowIndex,
                  column: rule.field,
                  value,
                  message: rule.message || `Campo '${rule.field}' deve ser um email válido`,
                  type: 'error'
                })
              }
              break
            case 'date':
              if (new Date(value).toString() === 'Invalid Date') {
                errors.push({
                  row: actualRowIndex,
                  column: rule.field,
                  value,
                  message: rule.message || `Campo '${rule.field}' deve ser uma data válida`,
                  type: 'error'
                })
              }
              break
          }

          // Pattern validation
          if (rule.pattern && !rule.pattern.test(value)) {
            warnings.push({
              row: actualRowIndex,
              column: rule.field,
              value,
              message: rule.message || `Campo '${rule.field}' não corresponde ao padrão esperado`,
              type: 'warning'
            })
          }
        }
      })
    })

    return { errors, warnings }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxSize: maxFileSize,
    multiple: false
  })

  const clearData = () => {
    setProcessedData(null)
    setPreviewData([])
    setSelectedSheet('')
  }

  const downloadTemplate = () => {
    // Create template based on validation rules
    const headers = validationRules.map(rule => rule.field)
    const worksheet = XLSX.utils.aoa_to_sheet([headers])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template')
    XLSX.writeFile(workbook, 'template.xlsx')
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Solte o ficheiro aqui...' : 'Arraste um ficheiro Excel ou CSV'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Formatos suportados: {acceptedFileTypes.join(', ')} (max {Math.round(maxFileSize / 1024 / 1024)}MB)
            </p>
            <Button variant="outline">
              Selecionar Ficheiro
            </Button>
          </div>

          {validationRules.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Button variant="link" onClick={downloadTemplate} className="text-sm">
                <Download className="h-4 w-4 mr-2" />
                Descarregar Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">A processar ficheiro...</p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {processedData && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resultado do Processamento
                </CardTitle>
                <Button variant="outline" size="sm" onClick={clearData}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{processedData.metadata.rowCount}</p>
                  <p className="text-sm text-gray-600">Linhas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{processedData.metadata.columnCount}</p>
                  <p className="text-sm text-gray-600">Colunas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{processedData.metadata.errors.length}</p>
                  <p className="text-sm text-gray-600">Erros</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{processedData.metadata.warnings.length}</p>
                  <p className="text-sm text-gray-600">Avisos</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  📁 {processedData.metadata.fileName}
                </Badge>
                <Badge variant="outline">
                  📊 {processedData.metadata.sheets.length} folha{processedData.metadata.sheets.length > 1 ? 's' : ''}
                </Badge>
                <Badge variant="outline">
                  ⏱️ {processedData.metadata.processingTime}ms
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          {(processedData.metadata.errors.length > 0 || processedData.metadata.warnings.length > 0) && (
            <Tabs defaultValue="errors" className="w-full">
              <TabsList>
                <TabsTrigger value="errors" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Erros ({processedData.metadata.errors.length})
                </TabsTrigger>
                <TabsTrigger value="warnings" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Avisos ({processedData.metadata.warnings.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="errors">
                <Card>
                  <CardContent className="pt-6">
                    {processedData.metadata.errors.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Linha</TableHead>
                            <TableHead>Coluna</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Mensagem</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {processedData.metadata.errors.map((error, index) => (
                            <TableRow key={index}>
                              <TableCell>{error.row}</TableCell>
                              <TableCell>{error.column}</TableCell>
                              <TableCell className="max-w-32 truncate">{error.value}</TableCell>
                              <TableCell>{error.message}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">Sem erros encontrados!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="warnings">
                <Card>
                  <CardContent className="pt-6">
                    {processedData.metadata.warnings.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Linha</TableHead>
                            <TableHead>Coluna</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Mensagem</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {processedData.metadata.warnings.map((warning, index) => (
                            <TableRow key={index}>
                              <TableCell>{warning.row}</TableCell>
                              <TableCell>{warning.column}</TableCell>
                              <TableCell className="max-w-32 truncate">{warning.value}</TableCell>
                              <TableCell>{warning.message}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">Sem avisos!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Data Preview */}
          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Pré-visualização dos Dados
                </CardTitle>
                <CardDescription>
                  Primeiras 10 linhas do ficheiro processado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(previewData[0] || {}).map(header => (
                          <TableHead key={header}>{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value: any, cellIndex) => (
                            <TableCell key={cellIndex} className="max-w-32 truncate">
                              {value !== null && value !== undefined ? String(value) : '-'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default ExcelUpload