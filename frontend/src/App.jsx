import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./component/Loading";
import ListUsers from "./component/ListUsers";
import FormUser from "./component/FormUser";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const clearFormState = () => {
    setId("");
    setName("");
    setAge("");
  };

  const setFormState = (user) => {
    setId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/users");
      const data = await response.json();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setIsLoading(true);
      const user = { name, age: +age };
      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.user) {
        clearFormState();
        await getUsers();
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.message) {
        clearFormState();
        await getUsers();
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setIsLoading(true);
      const user = { name, age: +age };
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.message) {
        clearFormState();
        await getUsers();
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <header className="header container">
        <h1>MERN</h1>
      </header>

      <section className="container">
        <FormUser
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          id={id}
          onClickAddUser={addUser}
          onClickEditUser={editUser}
          onClickCancelEdit={clearFormState}
        />
      </section>

      <section className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <ListUsers
            users={users}
            onClickDelete={deleteUser}
            onClickEdit={setFormState}
          />
        )}
      </section>
    </div>
  );
}

export default App;
