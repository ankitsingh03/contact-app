import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div>
      <hr />
      <Link to={{pathname:`/contact/${id}`, state: {contact:props.contact}}}>
      <div>{name}</div>
      <div>{email}</div>
      </Link>
      <Link to={{pathname:`/edit`, state: {contact:props.contact}}} ><button>Edit</button></Link>
      
      <button onClick={() => props.clickHandler(id)} >Delete</button>
    </div>
  );
};

export default ContactCard;
