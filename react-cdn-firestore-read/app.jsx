import * as React from "https://cdn.skypack.dev/react";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom";
import { HashRouter, Routes, Route, NavLink } from "https://cdn.skypack.dev/react-router-dom";
import { usersRef } from "./firebase-config.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// ====== PAGES ====== //

function Home() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const cleanUp = onSnapshot(usersRef, data => {
            const users = data.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });
            setUsers(users);
        });

        return () => cleanUp();
    }, []);

    return (
        <section className="page">
            <h1>Users</h1>
            <section className="grid-container">
                {users.map(user => (
                    <article>
                        <img src={user.img} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>
                            <a href={`mailto:${user.mail}`}>{user.mail}</a>
                        </p>
                    </article>
                ))}
            </section>
        </section>
    );
}

function About() {
    return (
        <section className="page">
            <h1>About Page</h1>
        </section>
    );
}

function Clients() {
    return (
        <section className="page">
            <h1>Clients Page</h1>
        </section>
    );
}

// ====== COMPONENTS ====== //

function Nav() {
    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
            </NavLink>
            <NavLink to="/clients" className={({ isActive }) => (isActive ? "active" : "")}>
                Clients
            </NavLink>
        </nav>
    );
}

// ====== APP ====== //

function App() {
    return (
        <main>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/clients" element={<Clients />} />
            </Routes>
        </main>
    );
}

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.querySelector("#root")
);
