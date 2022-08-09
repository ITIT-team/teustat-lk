import { createContext, useContext } from 'react'
export const GlobalContext = createContext()
export const PanelContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext) || {}
export const usePanelContext = () => useContext(PanelContext) || {}
