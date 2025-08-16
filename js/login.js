

(function(){
  const loginForm = document.querySelector('.login1 form');
  const registerForm = document.querySelector('.register1 form');

  const MAX_ATTEMPTS = 3;
  const LOCK_TIME_MS = 60 * 1000; 

  const adminAccounts = [
    { nom: "DEUS", prenom: "Dayan Alex Stéphen", email: "deusdayanalexstephen@gmail.com", password: "2003" },
    { nom: "ARISTE", prenom: "Sardoune", email: "aristesardoune@gmail.com", password: "2003" },
    { nom: "LAURENT", prenom: "Jess-Kenzy", email: "laurentjesskenzy@gmail.com", password: "2003" }
  ];

  function loadUsers(){
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  function saveUser(user){
    const users = loadUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  function isLocked(){
    const lockUntil = localStorage.getItem('lockUntil');
    if(lockUntil && Date.now() < parseInt(lockUntil)){
      return true;
    }
    return false;
  }

  function lockSite(){
    localStorage.setItem('lockUntil', Date.now() + LOCK_TIME_MS);
  }

  function resetAttempts(){
    localStorage.removeItem('attempts');
  }

  function incrementAttempts(){
    let att = parseInt(localStorage.getItem('attempts') || '0') + 1;
    localStorage.setItem('attempts', att);
    if(att >= MAX_ATTEMPTS){
      lockSite();
      alert("Trop de tentatives! Réessayez dans 1 minute");
    }
  }

  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(isLocked()){
      alert("Vous êtes temporairement bloqué. Réessayez plus tard.");
      return;
    }

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    const isAdmin = adminAccounts.some(a => 
      a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if(isAdmin){
      resetAttempts();
      window.location.href = "principaladm.html";
      return;
    }

    const users = loadUsers();
    const found = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if(found){
      resetAttempts();
      window.location.href = "principal.html";
    } else {
      const isRegistered = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if(!isRegistered){
        alert("Vous devez vous inscrire avant de vous connecter.");
      } else {
        alert("Informations incorrectes.");
      }
      incrementAttempts();
    }
  });

  registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nom = registerForm.querySelector('input[placeholder="Nom"]').value.trim();
    const prenom = registerForm.querySelector('input[placeholder="Prenom"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();

    const users = loadUsers();
    if(users.some(u => u.email.toLowerCase() === email.toLowerCase())){
      alert("Cet email est déjà utilisé.");
      return;
    }

    saveUser({ nom, prenom, email, password });
    alert("Inscription réussie, vous pouvez maintenant vous connecter.");
    registerForm.reset();
  });
})();
const container = document.querySelector('.container1');
const registerBtn = document.querySelector('.register-btn1');
const loginBtn = document.querySelector('.login-btn1');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

