import React from "react";
import { Link } from "react-router-dom";

const ContactDetail = (props) => {
  const { name, email } = props.location.state.contact;
  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default ContactDetail;
