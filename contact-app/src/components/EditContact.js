import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id: id,
      name: name,
      email: email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.email) {
      alert("all field are mandatory");
    } else {
      this.props.UpdateContactHandler(this.state);
      this.setState({ name: "", email: "" });
      // redirect to home page after hit on add button
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <h2>Edit Contact</h2>
        <form onSubmit={this.update}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <button>Update</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
