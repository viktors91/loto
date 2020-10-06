import React from 'react'

const TemplatesContext = React.createContext(null as any)
export const {
  Provider: TemplatesContextProvider,
  Consumer: TemplatesContextContextConsumer,
} = TemplatesContext
export default TemplatesContext
