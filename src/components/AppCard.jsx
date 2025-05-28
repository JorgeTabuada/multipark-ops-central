
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppCard = ({ app }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(app.route)
  }

  const getIcon = (iconName) => {
    const icons = {
      'caixa': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.18-.21-2.31-.77-3.17-1.63l1.41-1.41c.62.62 1.45 1.03 2.35 1.03.9 0 1.73-.41 2.35-1.03l1.41 1.41c-.86.86-1.99 1.42-3.17 1.63v.01z"/>
        </svg>
      ),
      'reservas': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      'tarefas': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      ),
      'produtividade': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      'projetos': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      'recolhas': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      'bi-interno': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
        </svg>
      ),
      'perdidos': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      'relatorios': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      'rh': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 16.97 6c-.95 0-1.78.55-2.18 1.37L12.25 12 8.62 7.37C8.22 6.55 7.39 6 6.44 6c-1.42 0-2.63 1.02-2.93 2.37L1 16h2.5v6h2v-6h1.25l.69-2.37.56 1.37H9v7h2v-7h1.5l.56-1.37.69 2.37H15v6h5z"/>
        </svg>
      ),
      'cancelamentos': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
        </svg>
      ),
      'despesas': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      'faturacao': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      'comentarios': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
        </svg>
      ),
      'auditorias': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      'comportamentos': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 6L12 8.5 14.5 6 17 8.5 15.5 11H8.5L7 8.5 9.5 6zM7.5 17c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5H7.5zm6.5 0c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5H14z"/>
        </svg>
      ),
      'confirmacao': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      'entregas': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          <path d="M5 6h5v2H5zm0-2h5v2H5z"/>
        </svg>
      ),
      'acessos': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 8h2v2h-2V9zm0 4h2v6h-2v-6z"/>
        </svg>
      ),
      'marketing': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      ),
      'formacao': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      'mapa': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
        </svg>
      ),
      'agregadores': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>
      ),
      'default': (
        <svg className="w-12 h-12 mb-3 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    }
    
    return icons[iconName] || icons['default']
  }

  return (
    <div 
      className="bg-blue-700 hover:bg-blue-800 text-white p-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {getIcon(app.icon)}
      <h3 className="text-lg font-semibold text-center">{app.name}</h3>
      <p className="text-sm text-center mt-2 opacity-90">{app.description}</p>
    </div>
  )
}

export default AppCard
