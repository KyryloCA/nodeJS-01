console.clear();

import fs from "fs/promises";
import { nanoid } from "nanoid";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readDB() {
  try {
    const rawData = await fs.readFile(contactsPath);
    const parsedcontactList = JSON.parse(rawData.toString());
    return parsedcontactList;
  } catch (error) {
    console.log("error when read DB", error);
  }
}

async function writeDB(arr) {
  try {
    const writeNewArr = await fs.writeFile(contactsPath, JSON.stringify(arr));
    return true;
  } catch (error) {
    console.log("error when write DB", error);
  }
}

async function listContacts() {
  try {
    const contactList = await readDB();

    console.log("Contact list:", contactList);
    return contactList;
  } catch (error) {
    console.log("error", error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await readDB();

    const requestedContact = contactList.find(
      (contactOBJ) => contactOBJ.id === contactId
    );
    if (!requestedContact) {
      console.log("Requested contact isn't exist");
    } else {
      console.log("Requested contact is:", requestedContact);
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await readDB();
    // const rawData = await fs.readFile(contactsPath);
    // const parsedcontactList = JSON.parse(rawData.toString());
    const isInclude = contactList.find(
      (contactOBJ) => contactOBJ.id === contactId
    );
    if (!isInclude) {
      console.log("There is no contact with this id");
      return;
    }
    const newArr = contactList.filter(
      (contactOBJ) => contactOBJ.id !== contactId
    );

    const result = writeDB(newArr);
    if (result) {
      console.log("Contact removed successfully");
    } else {
      console.log("Removing fail, try again");
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contactList = await readDB();

    const newContacts = [...contactList, newContact];

    const result = writeDB(newContacts);
    if (result) {
      console.log("Contact added successfully");
    } else {
      console.log("Adding fail, try again");
    }
  } catch (error) {
    console.log("error", error);
  }
}

export { listContacts, getContactById, removeContact, addContact };
