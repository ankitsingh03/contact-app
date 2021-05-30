import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import Error from "./Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../api/contacts";
import contacts from "../api/contacts";

class AppClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  }

  retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  AddContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    // this.setState([...contacts, response.data]);
    this.setState({ contacts: [...this.state.contacts, response.data] });
  };

  UpdateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    let data = this.state.contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    });
    this.setState({ contacts: data });
  };

  removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    let newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    this.setState({ contacts: newContactList });
  };

  componentDidMount = () => {
    // const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (data) setContacts(data);
    const getAllContacts = async () => {
      const allContacts = await this.retrieveContacts();
      if (allContacts) this.setState({ contacts: allContacts });
    };
    getAllContacts();
  };

  //   componentDidMount = () => {
  //     // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  //   };

  render() {
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
                  contacts={this.state.contacts}
                  getContactId={this.removeContactHandler}
                />
              )}
            />
            <Route
              exact
              path="/add"
              render={(props) => (
                <AddContact
                  {...props}
                  AddContactHandler={this.AddContactHandler}
                />
              )}
            />
            <Route path="/contact/:id" component={ContactDetail} />
            <Route
              exact
              path="/edit"
              render={(props) => (
                <EditContact
                  {...props}
                  UpdateContactHandler={this.UpdateContactHandler}
                />
              )}
            />
            <Route component={Error} />
          </Switch>

          {/* <AddContact AddContactHandler={AddContactHandler} /> */}
          {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
        </Router>
      </div>
    );
  }
}

export default AppClass;
