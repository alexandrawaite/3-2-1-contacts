const allContacts = require('./contacts.json')
let errorCount = 0;
let failedContacts = [];

const addContact = function(firstName, lastName, email) {
  let contact = {}
  contact.first_name = firstName;
  contact.last_name = lastName;
  contact.email = email;
  if (typeof firstName === 'string' && typeof lastName === 'string' && typeof email === 'string') {
    allContacts.push(contact);
    return true;
  } else {
    failedContacts.push(contact);
    throw new Error("Not a string");
  }
}

const addContacts = function(contacts) {
  contacts.forEach(function(contact){
    try {
      addContact(contact[0], contact[1], contact[2])
    } catch (e) {
      errorCount++;
    }
  })
}

const printContacts = function() {
  const contacts = allContacts
    .map(function(contact) {
      return [
        contact.first_name + " " + contact.last_name, contact.email
      ]
    })
    .sort(function(a, b) {
      return a[0] < b[0]
      ? -1
      : a[0] > b[0]
      ? 1
      : 0
    })

  const findMaxLength = function(length, string) {
    return string.length > length
    ? string.length
    : length
  }
  const nameColumnLength = contacts
    .map(function(contact) {
      return contact[0]
    })
    .reduce(findMaxLength, 0)

  const emailColumnLength = contacts
    .map(function(contact) {
      return contact[1]
    })
    .reduce(findMaxLength, 0)

  console.log("Loading contact data...");
  console.log("...Finished loading contact data.\n");
  console.log("All Contacts: ");

  const bar = (
    "|" +
    "-".repeat(nameColumnLength + 2) +
    "+" +
    "-".repeat(emailColumnLength + 2) +
    "|"
  )

  console.log(bar);

  console.log(
    "| Full Name" +
    " ".repeat(nameColumnLength - 9) +
    " | Email Address " +
    " ".repeat(emailColumnLength - 13) +
    "|"
  );

  console.log(bar);

  contacts.forEach(function(contact) {
    const name = contact[0]
    const email = contact[1]
    console.log(
      "| " +
      name +
      " ".repeat(nameColumnLength - name.length + 1) +
      "| " +
      email +
      " ".repeat(emailColumnLength - email.length + 1) +
      "|"
    );
  })
  console.log(bar);
  console.log("Could not import " + errorCount + " contacts.");

  failedContacts.forEach(function(contact) {
    console.log("First: " + contact.first_name + ", Last: " + contact.last_name + ", Email: " + contact.email);
  })
}

addContacts([[6, "Peace", "apeace21@microsoft.com"], ["Allyson", 22, "aroubay2f@canalblog.com"], ["Mead", 52, "mfullman2r@nyu.edu"]])


// addContact("Joe", "Shmo", 4)

printContacts()