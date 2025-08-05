// Custom hook for multi-database operations
// Provides easy access to both operational and tools databases

import { useState, useEffect } from 'react'
import { dashboardClient, ferramentasClient, checkDatabaseHealth, getClientForOperation } from '../lib/supabase-multi'

interface DatabaseHealth {
  dashboard: boolean
  ferramentas: boolean
  timestamp: string
}

interface UseMultiDatabaseReturn {
  dashboardClient: typeof dashboardClient
  ferramentasClient: typeof ferramentasClient
  health: DatabaseHealth | null
  isHealthy: boolean
  getClient: typeof getClientForOperation
  refreshHealth: () => Promise<void>
}

export const useMultiDatabase = (): UseMultiDatabaseReturn => {
  const [health, setHealth] = useState<DatabaseHealth | null>(null)

  const refreshHealth = async () => {
    try {
      const healthCheck = await checkDatabaseHealth()
      setHealth(healthCheck)
    } catch (error) {
      console.error('Failed to check database health:', error)
      setHealth({
        dashboard: false,
        ferramentas: false,
        timestamp: new Date().toISOString()
      })
    }
  }

  useEffect(() => {
    // Initial health check
    refreshHealth()

    // Set up periodic health checks (every 5 minutes)
    const interval = setInterval(refreshHealth, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const isHealthy = health ? health.dashboard : false

  return {
    dashboardClient,
    ferramentasClient,
    health,
    isHealthy,
    getClient: getClientForOperation,
    refreshHealth,
  }
}

// Hook for specific database operations
export const useDatabase = (type: 'operational' | 'hr' | 'analytics' | 'tools' = 'operational') => {
  const { getClient, health, isHealthy } = useMultiDatabase()
  
  const client = getClient(type)
  
  return {
    client,
    health,
    isHealthy,
    isAvailable: client !== null,
  }
}