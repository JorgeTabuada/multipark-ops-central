# 🚀 MultiPark Ops Central - Sistema de Gestão Integrado

> **Plataforma de gestão completa para operações MultiPark com interface moderna e funcionalidades avançadas**

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6.svg)
![Supabase](https://img.shields.io/badge/Supabase-2.49.8-3ecf8e.svg)

---

## 📋 **Resumo do Projeto**

O **MultiPark Ops Central** é uma aplicação de gestão empresarial avançada desenvolvida especificamente para operações de estacionamento. O sistema integra múltiplas funcionalidades numa interface moderna e intuitiva, proporcionando uma experiência de utilizador superior.

### 🎯 **Principais Características**

- **27 Módulos Funcionais** organizados em 4 categorias principais
- **Sistema Multi-Database** com suporte para bases operacionais e analíticas
- **Interface Moderna** com shadcn/ui e design responsivo
- **Upload Excel Avançado** com validação e processamento robusto
- **Sistema de Roles** completo com controlo de acesso granular
- **Análise Comportamental** com métricas avançadas
- **Monitorização de Saúde** das bases de dados em tempo real

---

## 🏗️ **Arquitetura do Sistema**

### **Stack Tecnológica**
```
Frontend:   React 18 + Vite + TypeScript
UI:         shadcn/ui + Tailwind CSS + Radix UI
Estado:     TanStack React Query + Context API
Database:   Supabase (Multi-Database Support)
Auth:       Supabase Auth + Role-based Access
Files:      Supabase Storage + Excel Processing
Deploy:     Lovable/Vercel Ready
```

### **Estrutura do Projeto**
```
multipark-ops-central/
├── 📁 src/
│   ├── 📁 pages/              # 27 páginas funcionais
│   ├── 📁 components/         # Componentes customizados + shadcn/ui
│   ├── 📁 integrations/       # Cliente Supabase + tipos (137KB)
│   ├── 📁 hooks/              # Hooks customizados + multi-database
│   ├── 📁 lib/                # Utilitários + configuração
│   └── 📁 types/              # Definições TypeScript
├── 📁 supabase/               # Configuração base de dados
└── 📁 public/                 # Assets estáticos
```

---

## 🎨 **Interface e Módulos**

### **Categorias de Módulos**

#### 🔵 **Operacional (6 módulos)**
- **Caixa Multipark** - Reconciliação operacional diária
- **Cancelamentos** - Gestão de cancelamentos
- **Confirmação de Caixa** - Validação de transações
- **Entregas** - Sistema de entregas
- **Recolhas** - Gestão de recolhas (10KB código)
- **Reservas** - Dashboard de análise (5.6KB código)

#### 🟢 **Gestão (5 módulos)**
- **Despesas** - CRUD completo de despesas
- **Faturação** - Sistema de faturação
- **Recursos Humanos** - Gestão de pessoal
- **Projetos** - Gestão de projetos
- **Tarefas** - Sistema de tarefas

#### 🟣 **Análises (7 módulos)**
- **BI Interno** - Dashboard analytics (6.6KB)
- **Comportamentos** - Análise comportamental **[MELHORADO]**
- **Mapa de Ocupação** - Ocupação tempo real
- **Marketing** - Gestão de campanhas
- **Produtividade Condutores** - Métricas (7KB)
- **Relatórios** - Sistema de reports (6.3KB)
- **Reservas Externas** - Integração externa

#### 🟠 **Administração e Suporte (5 módulos)**
- **Acessos e Alterações** - Logs do sistema
- **Auditorias Internas** - Sistema de auditoria (6.3KB)
- **Comentários & Reclamações** - CRM
- **Formação & Apoio** - Gestão de formação
- **Perdidos & Achados** - Sistema P&A (7KB)

---

## 🔥 **Funcionalidades Avançadas**

### **Sistema Multi-Database**
```typescript
// Acesso a múltiplas bases de dados
const { dashboardClient, ferramentasClient } = useMultiDatabase()

// Cliente específico por operação
const { client } = useDatabase('analytics')
```

### **Upload Excel com Validação**
```typescript
// Regras de validação personalizáveis
const validationRules = [
  { field: 'email', required: true, type: 'email' },
  { field: 'idade', required: false, type: 'number' }
]

// Componente com drag & drop
<ExcelUpload 
  validationRules={validationRules}
  onDataProcessed={handleData}
  maxFileSize={20 * 1024 * 1024} // 20MB
/>
```

### **Sistema de Roles**
```typescript
// Roles disponíveis
type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'supervisor' 
  | 'team_leader' 
  | 'back_office' 
  | 'tesoureiro'

// Controlo de acesso automático
const availableModules = modules.filter(module => 
  module.roles.includes(profile.role)
)
```

---

## 🚀 **Como Começar**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Conta Lovable (opcional)

### **Instalação Local**
```bash
# 1. Clonar o repositório
git clone https://github.com/JorgeTabuada/multipark-ops-central.git
cd multipark-ops-central

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com as suas credenciais Supabase

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

### **Variáveis de Ambiente**
```env
# Base Operacional (Principal)
VITE_SUPABASE_DASHBOARD_URL=https://ioftqsvjqwjeprsckeym.supabase.co
VITE_SUPABASE_DASHBOARD_ANON_KEY=seu_dashboard_key

# Base Ferramentas (Opcional - RH & Analytics)
VITE_SUPABASE_FERRAMENTAS_URL=https://dzdeewebxsfxeabdxtiq.supabase.co
VITE_SUPABASE_FERRAMENTAS_ANON_KEY=seu_ferramentas_key

# Configuração da App
VITE_APP_URL=http://localhost:5173
```

---

## 🗄️ **Base de Dados**

### **Estrutura Robusta**
- **137KB de tipos TypeScript** auto-gerados
- **50+ tabelas** com relacionamentos complexos
- **Views BI** para análises avançadas
- **RLS (Row Level Security)** implementado
- **Triggers e Functions** PostgreSQL

### **Principais Tabelas**
```sql
-- Sistema de utilizadores e perfis
profiles, system_roles, documentos_colaborador

-- Operacional
reservas, parques, movimentacoes_veiculos, caixa_sessoes_diarias

-- Análises
comportamentos_metricas_diarias, auditoria_sessoes, produtividade_condutores_diaria

-- CRM
comentarios_reclamacoes, perdidos_achados_casos, campanhas_marketing

-- RH
tarefas, projetos, despesas, formacao_conteudos
```

---

## 🔧 **Desenvolvimento**

### **Scripts Disponíveis**
```bash
npm run dev          # Servidor desenvolvimento
npm run build        # Build produção
npm run build:dev    # Build desenvolvimento
npm run lint         # Verificar código
npm run preview      # Preview build local
```

### **Estrutura de Componentes**
```
components/
├── ui/                    # shadcn/ui components
├── DashboardHome.tsx      # Dashboard principal melhorado
├── ExcelUpload.tsx        # Upload avançado de Excel
├── Header.jsx             # Cabeçalho da aplicação
├── ParkSelector.jsx       # Seletor de parques
└── [Módulo].jsx          # Componentes por módulo
```

### **Custom Hooks**
```typescript
// Multi-database com health monitoring
const { dashboardClient, ferramentasClient, health } = useMultiDatabase()

// Database específico por tipo
const { client, isAvailable } = useDatabase('analytics')

// Autenticação completa
const { user, profile, signIn, signOut } = useAuth()
```

---

## 📊 **Funcionalidades Destacadas**

### **Dashboard Moderno**
- Interface categorizada por áreas funcionais
- Cards com hover effects e animações
- Status badges para módulos melhorados
- Health monitoring das bases de dados
- Role-based module filtering

### **Sistema Excel Avançado**
- Drag & drop interface intuitivo
- Validação em tempo real com regras customizáveis
- Preview de dados com tabelas
- Relatórios de erros e avisos detalhados
- Template download automático
- Suporte para múltiplas folhas Excel

### **Análise Comportamental**
- Upload de dados com validação
- Cálculo automático de métricas
- Indicadores de performance
- Relatórios de risco
- Análise comparativa
- Integração com base analytics

---

## 🔐 **Segurança**

- **Row Level Security (RLS)** no Supabase
- **Role-based Access Control** granular
- **JWT Authentication** com refresh automático
- **Audit logs** completos no sistema
- **Validação client + server-side**
- **Environment variables** para configuração segura

---

## 🚀 **Deploy**

### **Opção 1: Lovable (Recomendado)**
1. Aceder ao [projeto Lovable](https://lovable.dev/projects/594b39df-07c8-4a3d-b4ef-03905a1d57ef)
2. Click "Share" → "Publish"
3. Configurar domínio custom (opcional)

### **Opção 2: Vercel**
1. Conectar repositório GitHub ao Vercel
2. Configurar environment variables
3. Deploy automático

### **Opção 3: Manual**
```bash
npm run build
# Upload da pasta dist/ para servidor
```

---

## 📈 **Performance**

- **Lazy loading** de páginas e componentes
- **React Query** para cache inteligente
- **Vite** para build otimizado
- **TypeScript** para type safety
- **Health checks** automáticos
- **Error boundaries** implementados

---

## 🧪 **Estado do Projeto**

### **✅ Implementado (90%)**
- [x] Sistema de autenticação completo
- [x] 27 páginas funcionais
- [x] Interface moderna com shadcn/ui
- [x] Base de dados robusta (137KB tipos)
- [x] Sistema multi-database
- [x] Upload Excel avançado
- [x] Análise comportamental melhorada
- [x] Role-based access control

### **🔄 Em Desenvolvimento**
- [ ] Relatórios PDF avançados
- [ ] Notificações push
- [ ] API externa para integrações
- [ ] Mobile app React Native

### **📋 Planeado**
- [ ] Dashboard executivo
- [ ] Machine learning analytics
- [ ] Integração com ERPs externos
- [ ] Sistema de workflows

---

## 🤝 **Contribuições**

Para contribuir para o projeto:

1. Fork o repositório
2. Criar branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit mudanças (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push branch (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

---

## 📞 **Suporte**

- **GitHub Issues**: [Reportar problemas](https://github.com/JorgeTabuada/multipark-ops-central/issues)
- **Email**: jorgetabuada@airpark.pt
- **Lovable Project**: [Acesso direto](https://lovable.dev/projects/594b39df-07c8-4a3d-b4ef-03905a1d57ef)

---

## 📄 **Licença**

Este projeto é propriedade da MultiPark e está licenciado sob términos proprietários.

---

## 🏆 **Créditos**

**Desenvolvido por:** Jorge Tabuada  
**Empresa:** MultiPark  
**Tecnologias:** React, TypeScript, Supabase, shadcn/ui  
**Plataforma:** Lovable  

---

<div align="center">

**🚀 MultiPark Ops Central - Gestão Inteligente, Resultados Excepcionais**

[![Deploy](https://img.shields.io/badge/Deploy-Lovable-green.svg)](https://lovable.dev/projects/594b39df-07c8-4a3d-b4ef-03905a1d57ef)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/JorgeTabuada/multipark-ops-central)

</div>