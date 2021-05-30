import React from "react";
import {Link} from 'react-router-dom'
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });
  return <div>
    <h2>Contact List</h2>
    <Link to="/add"><button>Add Contact</button></Link>
    
    <div>{renderContactList}</div>
    </div>;
};

export default ContactList;
