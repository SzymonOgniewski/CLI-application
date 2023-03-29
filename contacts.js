const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) throw error;
      console.log(`contact with id ${contactId} has been removed`);
    });
    console.table(newContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) throw error;
      console.log(`Contact ${name} has been added`);
    });
    console.table(updatedContacts);
  });
}

module.exports = { listContacts, getContactById, addContact, removeContact };
