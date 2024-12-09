import { useState } from "react"
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ContactForm = () => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const contact = {name, email, number}

    const response = await fetch('http://localhost:4000/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setEmail('')
      setNumber('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CONTACT', payload: json})
    }
  }

  return (



    <form className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 max-h-[71vh]" onSubmit={handleSubmit}>
  <h3 className="text-3xl font-semibold text-blue-700">Add a New Contact</h3>

  <div>
    <label className="block text-lg font-medium text-gray-700">Person Name:</label>
    <input 
      type="text"
      onChange={(e) => setName(e.target.value)}
      value={name}
      className={`w-full py-2 px-3 mt-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emptyFields.includes('name') ? 'border-red-500' : 'border-gray-300'}`}
    />
  </div>

  <div>
    <label className="block text-lg font-medium text-gray-700">Email</label>
    <input 
      type="text"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className={`w-full py-2 px-3 mt-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emptyFields.includes('email') ? 'border-red-500' : 'border-gray-300'}`}
    />
  </div>

  <div>
    <label className="block text-lg font-medium text-gray-700">Number:</label>
    <input 
      type="number"
      onChange={(e) => setNumber(e.target.value)}
      value={number}
      className={`w-full py-2 px-3 mt-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emptyFields.includes('number') ? 'border-red-500' : 'border-gray-300'}`}
    />
  </div>

  <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300">Add Contact</button>

  {error && <div className="text-red-600 text-center mt-4">{error}</div>}
</form>
  )
}

export default ContactForm