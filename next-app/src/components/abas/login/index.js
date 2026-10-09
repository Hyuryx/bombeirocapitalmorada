export default `<div id="login-screen">
        <div class="login-background"></div>
        <div class="login-container">
            <img src="assets/fotos/logo-capital.png" alt="Logo Capital" class="login-logo">
            <div id="login-clock" style="text-align: center; color: white; margin-bottom: 20px;">
                <div id="login-time" style="font-size: 3rem; font-weight: 800; letter-spacing: 2px; line-height: 1;">
                    00:00:00</div>
                <div id="login-date" style="font-size: 1rem; color: #ccc; margin-top: 5px;">Data</div>
            </div>
            <h2>PORTAL CBM</h2>
            <div class="login-input-group">
                <input type="password" id="login-password" placeholder="Digite a senha de acesso..." autocomplete="off">
                <button id="login-submit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
            <p id="login-error" style="display: none;">Senha incorreta. Tente novamente.</p>
        </div>
    </div>`;
