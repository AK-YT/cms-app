const express = require('express')
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
} = require('../controllers/contactsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getContacts)

router.get('/:id', getContact)

router.post('/', createContact)

router.delete('/:id', deleteContact)

router.patch('/:id', updateContact)

module.exports = router