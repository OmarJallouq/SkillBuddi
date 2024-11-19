import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="horizontal-nav">
            <h2 className="nav-logo" onClick={() => window.location.href = "/"}>SkillBuddi</h2>
            <div className="nav-links">
                <button onClick={() => window.location.href = "/"}>Home</button> {/* Home Button */}
                <button onClick={() => window.location.href = "/matching"}>Matching</button>
                <button onClick={() => window.location.href = "/profile"}>Profile</button>
                <button onClick={() => window.location.href = "/login/sign up"}>Login</button>
                <button onClick={() => window.location.href = "/messaging"}>Messaging</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                />
                <button className="search-button">Search</button>
            </div>
        </nav>
    );
};

export default NavBar;
