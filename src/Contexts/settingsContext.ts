import React from 'react'

const SettingsContext = React.createContext(null as any)
export const {
  Provider: SettingsContextProvider,
  Consumer: SettingsContextConsumer,
} = SettingsContext
export default SettingsContext
