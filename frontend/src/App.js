import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });
    alert("Submitted!");
  };

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Good Morning 🌞</h1>

      <input name="name" placeholder="Name" onChange={handleChange} /><br/><br/>
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br/><br/>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/><br/>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;