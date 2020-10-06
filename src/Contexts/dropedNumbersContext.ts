import React from 'react'

// type ContextValue = DefaultValue | ProviderValue;

const DropedNumbersContext = React.createContext(null as any)
export const {
  Provider: DropedNumbersContextProvider,
  Consumer: DropedNumbersContextConsumer,
} = DropedNumbersContext
export default DropedNumbersContext
