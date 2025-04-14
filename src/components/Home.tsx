// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase.config";
// import UsersCrud from "../usersCrud";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "../redux/store";

// const Home = () => {
//   const handleLogOut = () => {
//     signOut(auth);
//   };
//   return (
//     <div>
//       <h1>Home</h1>
//       <button onClick={handleLogOut} className="btn btn-danger">
//         Logout
//       </button>

//       <div>

//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import {
  ref,
  set,
  onValue,
  getDatabase,
  remove,
  update,
  push,
} from "firebase/database";
import { database } from "../firebase/firebase.config";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
};

const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = () => {
    const usersEndpoint = ref(database, "users");
    if (editingId === "") {
      const reference = push(usersEndpoint);
      set(reference, {
        name,
        age: parseInt(age),
        email,
      });
    } else {
      const updateRef = ref(database, `users/${editingId}`);
      update(updateRef, {
        name,
        age: parseInt(age),
        email,
      });
    }
  };

  const fetchUsers = () => {
    const userRef = ref(database, "users");
    onValue(userRef, (snapshot) => {
      const users: User[] = [];
      snapshot.forEach((item) => {
        users.push({ id: item.key, ...item.val() });
      });
      setUsers(users);
    });
  };

  const handleDelete = (userId: string) => {
    const deleteUserRef = ref(database, `users/${userId}`);
    remove(deleteUserRef);
  };

  const handleUpdate = (user: User) => {
    setName(user.name);
    setAge(user.age + "");
    setEmail(user.email);
    setEditingId(user.id);
  };

  return (
    <div className="container">
      <div className="card max-w-[300px] mx-auto mt-5">
        <div className="card-header">Register</div>
        <div className="card-body space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="input form-control input-bordered w-full"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
            className="input form-control input-bordered w-full"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="input form-control input-bordered w-full"
          />
        </div>
        <div className="card-footer">
          <button onClick={handleSave} className="btn btn-primary w-full">
            Save
          </button>
        </div>
      </div>

      <div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}.</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(user)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
