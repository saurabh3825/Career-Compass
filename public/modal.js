/*
    File: modal.js
    Version: 3.0
    Purpose: Handles all logic for the login/signup modal with backend integration.
*/
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('open-login-modal');
    const modalContainer = document.getElementById('modal-container');

    if (!openModalBtn || !modalContainer) return;

    const openModal = () => {
        if (modalContainer.innerHTML === '') {
            fetch('login.html')
                .then(response => response.text())
                .then(html => {
                    modalContainer.innerHTML = html;
                    modalContainer.querySelector('.modal-overlay').classList.add('visible');
                    attachModalEvents();
                })
                .catch(error => console.error('Error fetching modal content:', error));
        } else {
            modalContainer.querySelector('.modal-overlay').classList.add('visible');
        }
    };
    
    const closeModal = () => {
        modalContainer.querySelector('.modal-overlay').classList.remove('visible');
    };

    const attachModalEvents = () => {
        const modalOverlay = modalContainer.querySelector('.modal-overlay');
        const closeModalBtn = modalContainer.querySelector('.close-modal-btn');
        const loginForm = modalContainer.querySelector('#login-form-modal');
        const signupForm = modalContainer.querySelector('#signup-form-modal');
        const showSignupLink = modalContainer.querySelector('#show-signup-link');
        const showLoginLink = modalContainer.querySelector('#show-login-link');

        // UI toggles
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
        showSignupLink.addEventListener('click', (e) => { 
            e.preventDefault(); 
            loginForm.classList.add('form-hidden'); 
            signupForm.classList.remove('form-hidden'); 
        });
        showLoginLink.addEventListener('click', (e) => { 
            e.preventDefault(); 
            signupForm.classList.add('form-hidden'); 
            loginForm.classList.remove('form-hidden'); 
        });

        // 🔐 Handle Login
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailOrUsername = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ emailOrUsername, password })
                });
                const data = await res.json();

                if (res.ok) {
                    alert("✅ Login successful!");
                    localStorage.setItem("token", data.token); // save JWT
                    closeModal();
                } else {
                    alert("❌ " + data.msg);
                }
            } catch (err) {
                console.error("Login error:", err);
                alert("❌ Login request failed.");
            }
        });

        // 📝 Handle Signup
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;

            try {
                const res = await fetch("http://localhost:5000/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();

                if (res.ok) {
                    alert("🎉 Signup successful! Please login.");
                    signupForm.classList.add("form-hidden");
                    loginForm.classList.remove("form-hidden");
                } else {
                    alert("❌ " + data.msg);
                }
            } catch (err) {
                console.error("Signup error:", err);
                alert("❌ Signup request failed.");
            }
        });
    };

    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});
