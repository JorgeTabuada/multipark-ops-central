
import React, { useState, useEffect } from 'react'

const ParkSelector = ({ onParkChange }) => {
  const [selectedPark, setSelectedPark] = useState('')
  const role = localStorage.getItem('role')
  const defaultPark = localStorage.getItem('parqueSelecionado')

  const parks = [
    { id: 'lisboa', name: 'Lisboa' },
    { id: 'porto', name: 'Porto' },
    { id: 'faro', name: 'Faro' }
  ]

  useEffect(() => {
    setSelectedPark(defaultPark || 'lisboa')
  }, [defaultPark])

  const handleParkChange = (parkId) => {
    setSelectedPark(parkId)
    localStorage.setItem('parqueSelecionado', parkId)
    if (onParkChange) {
      onParkChange(parkId)
    }
  }

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Selecionar Parque:
      </label>
      <div className="flex flex-wrap gap-3">
        {parks.map(park => (
          <button
            key={park.id}
            onClick={() => handleParkChange(park.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPark === park.id
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {park.name}
          </button>
        ))}
        
        {role === 'super_admin' && (
          <button
            onClick={() => handleParkChange('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPark === 'todos'
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos os Parques
          </button>
        )}
      </div>
    </div>
  )
}

export default ParkSelector
