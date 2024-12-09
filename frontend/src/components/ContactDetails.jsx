import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { formatDistanceToNow } from 'date-fns';


const ContactDetails = ({ contact }) => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/api/contacts/' + contact._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CONTACT', payload: json})
    }
  }

  return (
  <div className="bg-white rounded-lg my-4 p-4 relative shadow-md">
  <h4 className="text-3xl font-semibold text-primary mb-4">{contact.name}</h4>
  
  <div className="pb-1 mb-1">
    <p className="text-lg text-gray-700"><strong className="text-gray-800">Email: </strong>{contact.email}</p>
  </div>
  
  <div className="pb-1 mb-1">
    <p className="text-lg text-gray-700"><strong className="text-gray-800">Number: </strong>{contact.number}</p>
  </div>

  <div className="pb-0 mb-2">
    <p className="text-sm text-gray-700">{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</p>
  </div>

  <span className="absolute top-3 right-3 cursor-pointer p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 text-lg" onClick={handleClick}>
    DELETE
  </span>
</div>

  )
}

export default ContactDetails

