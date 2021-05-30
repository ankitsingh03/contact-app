import React from "react";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
    };
  }

  add = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.email) {
      alert("all field are mandatory");
    } else {
      this.props.AddContactHandler(this.state);
      this.setState({ name: "", email: "" });
      // redirect to home page after hit on add button
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div>
        <h2>Add Contact</h2>
        <form onSubmit={this.add}>
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
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
