const NavBar = () =>{
    return (
      <>
            {/* Side Navigation Bar */}
      <nav className="side-nav">
        <h2>SkillBuddi</h2>
        <button onClick={() => window.location.href = "/matching"}>Matching</button>
        <button onClick={() => window.location.href = "/profile"}>Profile</button>
        <button onClick={() => window.location.href = "/login/sign up"}>Login</button>
        <button onClick={() => window.location.href = "/messaging"}>Messaging</button>
      </nav>
      </>
    )
};

export default NavBar