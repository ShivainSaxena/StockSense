import PasswordChecklist from "react-password-checklist";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, validPass);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Greetings!</h1>
        <h3>Create a new account for free</h3>
        <label>Email: </label>
        <input
          type="email"
          placeholder="example@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital"]}
          minLength={8}
          value={password}
          onChange={(isValid) => setValidPass(isValid)}
        />
        <button
          style={{
            pointerEvents: isLoading ? "none" : "auto",
            background: isLoading ? "#3d2fb6" : "#5542f6",
          }}
        >
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
