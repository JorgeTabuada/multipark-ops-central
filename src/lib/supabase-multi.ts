// Multi-Database Supabase Configuration
// This implements the dual database system as specified in the fusion plan

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../integrations/supabase/types'

// Base Operacional (Dashboard) - Primary database
const DASHBOARD_URL = import.meta.env.VITE_SUPABASE_DASHBOARD_URL || "https://ioftqsvjqwjeprsckeym.supabase.co"
const DASHBOARD_ANON_KEY = import.meta.env.VITE_SUPABASE_DASHBOARD_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZnRxc3ZqcXdqZXByc2NrZXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTYwNzQsImV4cCI6MjA2MjczMjA3NH0.TXDfhioMFVNxLhjKgpXAxnKCPOl5n8QWpOkX2eafbYw"

// Base Ferramentas (RH & Analytics) - Secondary database
const FERRAMENTAS_URL = import.meta.env.VITE_SUPABASE_FERRAMENTAS_URL || "https://dzdeewebxsfxeabdxtiq.supabase.co"
const FERRAMENTAS_ANON_KEY = import.meta.env.VITE_SUPABASE_FERRAMENTAS_ANON_KEY || ""

// Create dashboard (operational) client
export const dashboardClient = createClient<Database>(DASHBOARD_URL, DASHBOARD_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Create ferramentas (tools) client - only if credentials are available
export const ferramentasClient = FERRAMENTAS_ANON_KEY 
  ? createClient<Database>(FERRAMENTAS_URL, FERRAMENTAS_ANON_KEY, {
      auth: {
        persistSession: false, // Don't persist sessions for secondary DB
        autoRefreshToken: false,
      },
    })
  : null

// Primary client (dashboard) - backwards compatibility
export const supabase = dashboardClient

// Database health check
export const checkDatabaseHealth = async () => {
  const checks = {
    dashboard: false,
    ferramentas: false,
    timestamp: new Date().toISOString(),
  }

  try {
    // Check dashboard database
    const { data: dashboardData, error: dashboardError } = await dashboardClient
      .from('profiles')
      .select('id')
      .limit(1)
    
    checks.dashboard = !dashboardError

    // Check ferramentas database if available
    if (ferramentasClient) {
      try {
        const { data: ferramentasData, error: ferramentasError } = await ferramentasClient
          .from('profiles')
          .select('id')
          .limit(1)
        
        checks.ferramentas = !ferramentasError
      } catch (err) {
        console.warn('Ferramentas database not accessible:', err)
        checks.ferramentas = false
      }
    }
  } catch (err) {
    console.error('Database health check failed:', err)
  }

  return checks
}

// Sync data between databases (when both are available)
export const syncDatabases = async () => {
  if (!ferramentasClient) {
    console.warn('Ferramentas database not configured - skipping sync')
    return false
  }

  try {
    // Sync profiles between databases
    const { data: dashboardProfiles } = await dashboardClient
      .from('profiles')
      .select('*')
    
    if (dashboardProfiles && dashboardProfiles.length > 0) {
      // This would sync profiles to ferramentas DB
      // Implementation depends on ferramentas DB schema
      console.log(`Found ${dashboardProfiles.length} profiles to potentially sync`)
    }

    return true
  } catch (err) {
    console.error('Database sync failed:', err)
    return false
  }
}

// Get appropriate client for specific operations
export const getClientForOperation = (operation: 'operational' | 'hr' | 'analytics' | 'tools') => {
  switch (operation) {
    case 'operational':
      return dashboardClient
    case 'hr':
    case 'analytics':
    case 'tools':
      return ferramentasClient || dashboardClient // Fallback to dashboard if ferramentas not available
    default:
      return dashboardClient
  }
}

export default {
  dashboard: dashboardClient,
  ferramentas: ferramentasClient,
  primary: supabase,
  checkHealth: checkDatabaseHealth,
  sync: syncDatabases,
  getClient: getClientForOperation,
}