import React from "react";

const Home = () => {
    return (
        <div style={{display:"flex", height: "100vh", width:"100vw", justifyContent:"center", alignItems:"center", color:"black", flexDirection:"column"}}>
            <h1>Welcome to Customer app</h1>
            <a href="/login">Login here!</a>
        </div>
    );
}

export default Home;