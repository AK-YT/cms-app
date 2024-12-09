const Contacts = require('../models/contactsModel')
const mongoose = require('mongoose')


const getContacts = async (req, res) => {
  const user_id = req.user._id

  const contacts = await Contacts.find({user_id}).sort({createdAt: -1})

  res.status(200).json(contacts)
}

const getContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contacts = await Contacts.findById(id)

  if (!contacts) {
    return res.status(404).json({error: 'No such contact'})
  }
  
  res.status(200).json(contacts)
}



const createContact = async (req, res) => {
  const {name, email, number} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!email) {
    emptyFields.push('email')
  }
  if(!number) {
    emptyFields.push('number')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }


  try {
    const user_id = req.user._id
    const contacts = await Contacts.create({name, email, number, user_id})
    res.status(200).json(contacts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contacts = await Contacts.findOneAndDelete({_id: id})

  if (!contacts) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contacts)
}

const updateContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contacts = await Contacts.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!contacts) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contacts)
}


module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
}