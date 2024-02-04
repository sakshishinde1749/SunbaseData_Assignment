import React from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {

    const {login, handleChange, handleSubmit} = useLogin();

    if (localStorage.getItem("token")) {
        window.location.href = "/customers";
    }

    return (
        <div style={{display:"flex", height: "100vh", width:"100vw", justifyContent:"center", alignItems:"center"}}>
            <div>
                <h1>Login</h1>
                <form>
                    <div>
                        <label htmlFor="login_id">Username</label>
                        <input value={login.login_id} onChange={handleChange} type="text" id="login_id" name="login_id" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={login.password} onChange={handleChange} type="password" id="password" name="password" />
                    </div>
                    <button onClick={handleSubmit} type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;