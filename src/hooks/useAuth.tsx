
import { useState, useEffect, createContext, useContext } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { auth, profiles } from '../lib/supabaseClient'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signUp: (email: string, password: string, userData?: any) => Promise<{ data: any; error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)
        
        // Fetch profile data when user logs in
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await profiles.getUserProfile(session.user.id)
              if (!error && profileData) {
                setProfile(profileData)
                // Store in localStorage for compatibility with existing code
                localStorage.setItem('user_id', session.user.id)
                localStorage.setItem('nome', profileData.full_name || '')
                localStorage.setItem('role', profileData.role || '')
                localStorage.setItem('parqueSelecionado', profileData.parque_id_principal || '')
              }
            } catch (err) {
              console.error('Error fetching profile:', err)
            }
          }, 0)
        } else {
          setProfile(null)
          // Clear localStorage when user logs out
          localStorage.removeItem('user_id')
          localStorage.removeItem('nome')
          localStorage.removeItem('role')
          localStorage.removeItem('parqueSelecionado')
        }
        
        setLoading(false)
      }
    )

    // Get initial session
    auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await auth.signIn(email, password)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    setLoading(true)
    try {
      const result = await auth.signUp(email, password, userData)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await auth.signOut()
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
