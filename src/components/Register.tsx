import { useState } from "react";

import { auth, db } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      console.log("Foydalanuvchi muvaffaqiyatli qo‘shildi:", user);
    } catch (error) {
      console.log("Xatolik:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card max-w-[300px]">
        <div className="card-header">Register</div>
        <div className="card-body space-y-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email..."
            className="form-control"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password..."
            className="form-control"
          />
        </div>
        <div className="card-footer">
          <button onClick={handleRegister} className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
