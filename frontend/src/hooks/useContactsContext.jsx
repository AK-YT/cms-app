import { useContext } from "react"

import { ContactsContext } from "../context/ContactsContext"

export const useContactsContext = () => {
  const context = useContext(ContactsContext)

  if(!context) {
    throw Error('useContactsContext must be used inside a ContactsContextProvider')
  }

  return context
}