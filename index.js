import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
import { Command } from "commander";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      console.log("listing comtacts...");
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact({
        name,
        email,
        phone,
      });
      break;

    case "remove":
      removeContact(id);
      break;

    case "help":
      console.log("To run: node index.js /n");
      console.log("actions: list/get/add/remove /n");
      console.log("options: -a/action -i/id -n/name -e/email -p/phone /n");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }

  rl.close();
}

invokeAction(argv);

//to run use this pattern:
//node index.js -a list
