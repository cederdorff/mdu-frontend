class UpdatePage {
    constructor(domElement) {
        this.domElement = domElement;
        this.render();
    }

    render() {
        this.domElement.innerHTML +=/*html*/`
            <section id="update" class="page">
                <header class="topbar">
                    <a class="left nav-link" href="#/users">Back</a>
                    <h2>Update user</h2>
                    <a class="right" onclick="updateUser()">Update</a>
                </header>
                <form>
                    <input type="text" class="name-input" placeholder="Type your name" required>
                    <input type="email" class="mail-input" placeholder="Type your mail" required>
                    <button type="button" name="button" onclick="updateUser()">Update User</button>
                </form>
            </section>
        `;
    }
}

export default UpdatePage;