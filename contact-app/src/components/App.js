import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/contacts";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const AddContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const UpdateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (data) setContacts(data);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            // why we used render insted on component
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddContact {...props} AddContactHandler={AddContactHandler} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route
            exact
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                UpdateContactHandler={UpdateContactHandler}
              />
            )}
          />
        </Switch>

        {/* <AddContact AddContactHandler={AddContactHandler} /> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
