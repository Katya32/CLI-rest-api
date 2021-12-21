const path = require('path');
const fs = require('fs').promises;
const { uid } = require('uid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find(({ id }) => {
      return id === contactId;
    });
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contact));
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    data.push({
      id: uid(),
      name,
      email,
      phone,
    });

    fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
