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
  } else {
    throw contact;
  }
}
const addContacts = function(contacts) {
  contacts.forEach(function(contact){
    try {
      addContact(contact[0], contact[1], contact[2])
    } catch (error) {
      failedContacts.push(error);
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
  console.log("\nCould not import " + errorCount + " contacts.");
  failedContacts.forEach(function(contact) {
    console.log("First: " + contact.first_name + ", Last: " + contact.last_name + ", Email: " + contact.email);
  })
}

////////////////////////////////////////////////////////


addContact("Joe", "Wilson", "jwils@aol.com")

addContacts([[6, "Peace", "apeace21@microsoft.com"], ["Allyson", 22, "aroubay2f@canalblog.com"], ["Mead", 52, "mfullman2r@nyu.edu"]])

// tests to see if contact was pushed to allContacts array
console.assert(allContacts[allContacts.length - 1].first_name === "Joe" && allContacts[allContacts.length - 1].last_name === "Wilson" && allContacts[allContacts.length - 1].email === "jwils@aol.com", "contact was not added")

// tests to see if three invalid contacts were added
console.assert(failedContacts.length === 3, "three contacts were not added")

printContacts()