import { auth, db } from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-screen justify-center flex items-center">
      <div
        onClick={handleGoogleSignIn}
        className="flex items-center text-xl bg-blue-400 rounded-lg text-white h-[50px] justify-center cursor-pointer hover:bg-blue-600  w-[300px]"
      >
        <FcGoogle className="size-8" /> Sign in with Google
      </div>
    </div>
  );
};
export default Login;
