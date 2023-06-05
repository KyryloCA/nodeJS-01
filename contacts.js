console.clear();

import fs from "fs/promises";
import { nanoid } from "nanoid";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((res) => console.log("Contact list:", res));
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((arr) => arr.find((contactOBJ) => contactOBJ.id === contactId))
    .then((res) => console.log("Required contact:", res));
}

async function removeContact(contactId) {
  return fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((arr) => {
      const isInclude = arr.find((contactOBJ) => contactOBJ.id === contactId);
      if (isInclude) {
        const newArr = arr.filter((contactOBJ) => contactOBJ.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(newArr))
          .then(console.log("Contact removed successfully"))
          .catch((err) => console.log("Removing fail with error:", err));
      } else {
        console.log("There is no contact with this id");
      }
    });
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const oldContacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()));

  const newContacts = [...oldContacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts))
    .then(console.log("Contact successfully added"))
    .catch((err) =>
      console.log("Contact NOT added. finished with error:", err)
    );
}

export { listContacts, getContactById, removeContact, addContact };
