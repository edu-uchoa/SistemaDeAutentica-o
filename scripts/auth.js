 // Configuração do Firebase (substitua com suas credenciais)
        const firebaseConfig = {
            apiKey: "AIzaSyCmxHc6MZz3thmW3UF5R043L37tyXsr6i8",
            authDomain: "criptografiaweb-dcd66.firebaseapp.com",
            projectId: "criptografiaweb-dcd66",
            storageBucket: "criptografiaweb-dcd66.firebasestorage.app",
            messagingSenderId: "734037886744",
            appId: "1:734037886744:web:a0454f45c1c5127476806d"
        };

        // Inicializa o Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Elementos da UI
        const userInfoElement = document.getElementById('user-info');
        const ceaserInfoElement = document.getElementById('ceaser-info')
        const authSectionElement = document.getElementById('auth-section');
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');
        const signOutButton = document.getElementById('sign-out-button');
        const resetPasswordButton = document.getElementById('reset-password-button');
        const errorMessageElement = document.getElementById('error-message');
        
        // Elementos dos formulários
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');
        const sendResetButton = document.getElementById('send-reset-button');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const switchToLogin = document.getElementById('switch-to-login');
        const backToLogin = document.getElementById('back-to-login');
        
        // Event Listeners
        loginTab.addEventListener('click', () => switchAuthTab('login'));
        registerTab.addEventListener('click', () => switchAuthTab('register'));
        forgotPasswordLink.addEventListener('click', () => switchAuthTab('forgot'));
        switchToLogin.addEventListener('click', () => switchAuthTab('login'));
        backToLogin.addEventListener('click', () => switchAuthTab('login'));
        
        signOutButton.addEventListener('click', signOut);
        resetPasswordButton.addEventListener('click', sendResetPassword);
        loginButton.addEventListener('click', loginWithEmail);
        registerButton.addEventListener('click', registerWithEmail);
        sendResetButton.addEventListener('click', sendPasswordReset);
        
        // Função para alternar entre as abas
        function switchAuthTab(tab) {
            // Resetar mensagens de erro
            errorMessageElement.style.display = 'none';
            
            // Atualizar botões de aba
            loginTab.classList.remove('active');
            registerTab.classList.remove('active');
            
            // Esconder todos os formulários
            loginForm.classList.add('hidden');
            registerForm.classList.add('hidden');
            forgotPasswordForm.classList.add('hidden');
            
            // Mostrar o formulário selecionado
            if (tab === 'login') {
                loginTab.classList.add('active');
                loginForm.classList.remove('hidden');
            } else if (tab === 'register') {
                registerTab.classList.add('active');
                registerForm.classList.remove('hidden');
            } else if (tab === 'forgot') {
                forgotPasswordForm.classList.remove('hidden');
            }
        }
        
        // Função para mostrar mensagens de erro
        function showError(message) {
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
        }
        
        // Função para login com email/senha
        function loginWithEmail() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                showError('Por favor, preencha todos os campos.');
                return;
            }
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login bem-sucedido
                    updateUI(userCredential.user);
                })
                .catch((error) => {
                    showError(getAuthErrorMessage(error));
                });
        }
        
        // Função para cadastrar com email/senha
        function registerWithEmail() {
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (!email || !password || !confirmPassword) {
                showError('Por favor, preencha todos os campos.');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('As senhas não coincidem.');
                return;
            }
            
            if (password.length < 6) {
                showError('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Cadastro bem-sucedido
                    updateUI(userCredential.user);
                })
                .catch((error) => {
                    showError(getAuthErrorMessage(error));
                });
        }
        
        // Função para enviar email de redefinição de senha
        function sendPasswordReset() {
            const email = document.getElementById('reset-email').value;
            
            if (!email) {
                showError('Por favor, digite seu email.');
                return;
            }
            
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    showError('Email de redefinição enviado! Verifique sua caixa de entrada.');
                })
                .catch((error) => {
                    showError(getAuthErrorMessage(error));
                });
        }
        
        // Função para redefinir senha (quando logado)
        function sendResetPassword() {
            const user = firebase.auth().currentUser;
            if (user && user.email) {
                firebase.auth().sendPasswordResetEmail(user.email)
                    .then(() => {
                        alert('Email de redefinição enviado para ' + user.email);
                    })
                    .catch((error) => {
                        alert('Erro: ' + error.message);
                    });
            }
        }
        
        // Função para logout
        function signOut() {
            firebase.auth().signOut()
                .then(() => {
                    updateUI(null);
                    switchAuthTab('login');
                })
                .catch((error) => {
                    console.error('Erro ao fazer logout:', error);
                });
        }
        
        // Função para traduzir mensagens de erro do Firebase
        function getAuthErrorMessage(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    return 'Email inválido.';
                case 'auth/user-disabled':
                    return 'Esta conta foi desativada.';
                case 'auth/user-not-found':
                    return 'Nenhuma conta encontrada com este email.';
                case 'auth/wrong-password':
                    return 'Senha incorreta.';
                case 'auth/email-already-in-use':
                    return 'Este email já está em uso por outra conta.';
                case 'auth/weak-password':
                    return 'A senha é muito fraca (mínimo 6 caracteres).';
                case 'auth/operation-not-allowed':
                    return 'Operação não permitida.';
                case 'auth/too-many-requests':
                    return 'Muitas tentativas. Tente novamente mais tarde.';
                default:
                    return 'Ocorreu um erro. Por favor, tente novamente.';
            }
        }
        
        // Atualiza a UI com base no estado de autenticação
        function updateUI(user) {
            if (user) {
                // Usuário está logado
                userInfoElement.classList.remove('hidden');
                ceaserInfoElement.classList.remove('hidden')
                authSectionElement.classList.add('hidden');
                
                // Exibe informações do usuário
                userNameElement.textContent = user.displayName || user.email.split('@')[0];
                userEmailElement.textContent = user.email;
            } else {
                // Usuário não está logado
                userInfoElement.classList.add('hidden');
                ceaserInfoElement.classList.add('hidden')
                authSectionElement.classList.remove('hidden');
            }
        }
        
        // Monitora o estado de autenticação
        firebase.auth().onAuthStateChanged(function(user) {
            updateUI(user);
        });
        
        // Inicializa com a aba de login visível
        switchAuthTab('login');