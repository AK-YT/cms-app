import { useEffect }from 'react'
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import ContactDetails from '../components/ContactDetails'
import ContactForm from '../components/ContactForm'



const Home = () => {
  const {contacts, dispatch} = useContactsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('http://localhost:4000/api/contacts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CONTACTS', payload: json})
      }
    }

    if (user) {
      fetchContacts()
    }
  }, [dispatch, user])

  return (

    <div className="grid grid-cols-[55%_45%] gap-[100px]">
  <div className="">
    {contacts && contacts.map((contact) => (
      <ContactDetails key={contact._id} contact={contact} />
    ))}
  </div>
  <ContactForm />
</div>

  )
}

export default Home