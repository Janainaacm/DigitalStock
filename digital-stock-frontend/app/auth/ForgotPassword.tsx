import { useState } from "react";

type ForgotPasswordProps = {
  onLogin: () => void;
};

export default function ForgotPassword({ onLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    // Add your password reset logic here
    console.log("Forgot Password", { email });
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Forgot Password</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Reset Password</button>
      </form>
      <div>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}
