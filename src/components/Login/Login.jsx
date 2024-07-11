import React, { useState } from "react";
import { supabase } from "../../config/supabaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: 'https://example.com/welcome'
            }
          })
          console.log("login correcto!",data);
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type="email"
        name="email"
         placeholder="pon tu email"
         onChange={(e)=> setEmail(e.target.value)}
          />
        <button>send</button>
      </form>
    </div>
  );
};

export default Login;
