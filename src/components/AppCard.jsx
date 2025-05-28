
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
