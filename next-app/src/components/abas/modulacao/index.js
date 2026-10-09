export default `<div id="view-modulacao" class="global-view" style="display: none;">
        <div class="background-overlay bg-modulacao"></div>

        <div class="app-container">
            <!-- Sidebar -->
            <aside class="sidebar" id="sidebar-modulacao">
                <div class="sidebar-logo-container" style="text-align: center; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px;">
                    <img src="assets/iconesite/icone.png" class="sidebar-logo" alt="Logo Bombeiros" style="width: 80%; max-width: 150px; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <!-- Toggle Button -->
                <button class="sidebar-toggle-btn" id="toggle-sidebar-modulacao">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <nav class="sidebar-nav">
                    <ul>
                        <li class="active" data-target="home">
                            <svg class="anim-icon icon-home" viewBox="0 0 24 24" stroke="#00d2ff">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg> Início
                        </li>
                        <li data-target="codigos-q">
                            <svg class="anim-icon icon-q-code" viewBox="0 0 24 24" stroke="#10b981">
                                <circle cx="9" cy="12" r="5"></circle>
                                <line x1="12.5" y1="15.5" x2="15" y2="18"></line>
                                <path class="wave1" d="M17 9c1 1 1 3 0 4"></path>
                                <path class="wave2" d="M20 7c2 2 2 6 0 8"></path>
                            </svg> Códigos Q
                        </li>
                        <li data-target="alfabeto-fonetico">
                            <svg class="anim-icon icon-head" viewBox="0 0 24 24" stroke="#b142ff">
                                <circle cx="8" cy="8" r="4"></circle>
                                <path d="M8 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z"></path>
                                <path class="wave1" d="M15 8c1.5 1.5 1.5 4.5 0 6"></path>
                                <path class="wave2" d="M18 5c3 3 3 9 0 12"></path>
                            </svg> Alfabeto Fonético
                        </li>
                        <li data-target="numeracao-fonetica">
                            <svg class="anim-icon icon-number" viewBox="0 0 24 24" stroke="#ff8c00">
                                <text x="4" y="18" font-size="18" font-family="monospace" font-weight="bold" fill="none" stroke="#ff8c00">7</text>
                                <path class="wave1" d="M14 8c1.5 1.5 1.5 4.5 0 6"></path>
                                <path class="wave2" d="M17 5c3 3 3 9 0 12"></path>
                            </svg> Numeração Fonética
                        </li>
                        <li data-target="padrao-radio">
                            <svg class="anim-icon icon-radio" viewBox="0 0 24 24" stroke="#fde047">
                                <rect x="6" y="8" width="10" height="14" rx="2"></rect>
                                <line x1="9" y1="8" x2="9" y2="3"></line>
                                <path class="wave1" d="M14 4c1 1 1 3 0 4"></path>
                                <path class="wave2" d="M17 2c2 2 2 6 0 8"></path>
                            </svg> Padrão de Rádio
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="main-content">

                <section id="home" class="content-section active">
                    <header class="section-header">
                        <h1>Apresentação</h1>
                        <p>Apostila Geral de Modulação - Capital Morada</p>
                    </header>
                    <div id="modulacao-bounce-cards-grid" class="cards-grid">
                        <div class="card info-card red-card" style="width: 250px; height: auto; min-height: 250px;">
                            <h3>Objetivo da Apostila</h3>
                            <p>Orientar os membros sobre como modular corretamente, como organizar informações pelo
                                rádio, códigos a utilizar, e como reconhecer as principais viaturas. Guia prático
                                atualizável.</p>
                        </div>
                        <div class="card info-card green-card" style="width: 250px; height: auto; min-height: 250px;">
                            <h3>O que é modulação?</h3>
                            <p>Forma correta de se comunicar pelo rádio. Significa transmitir informações de maneira
                                clara, objetiva, organizada e compreensível para todos na ocorrência.</p>
                        </div>
                        <div class="card info-card blue-card" style="width: 250px; height: auto; min-height: 250px;">
                            <h3>Princípios Básicos</h3>
                            <p><strong>Clareza:</strong> Fale sem pressa e sem cortar palavras.<br>
                                <strong>Objetividade:</strong> Transmita somente o necessário.<br>
                                <strong>Organização:</strong> Identifique quem chama e quem recebe.<br>
                                <strong>Respeito:</strong> Postura profissional na frequência.
                            </p>
                        </div>
                        <div class="card info-card orange-card" style="width: 250px; height: auto; min-height: 250px;">
                            <h3>Na prática, modular é informar:</h3>
                            <p>1. Quem está falando<br>2. Para quem é a mensagem<br>3. Qual é a situação<br>4. Onde está
                                acontecendo<br>5. Qual apoio é necessário</p>
                        </div>
                    </div>
                    <div class="radio-atual-wrapper">
                        <div class="radio-atual-container">
                            <svg class="radio-atual-icon" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="6" y="9" width="12" height="12" rx="2" fill="rgba(0, 240, 255, 0.15)"></rect>
                                <line x1="9" y1="9" x2="9" y2="3"></line>
                                <circle cx="10" cy="13" r="1" fill="#00f0ff"></circle>
                                <circle cx="14" cy="13" r="1" fill="#00f0ff"></circle>
                                <circle cx="10" cy="17" r="1" fill="#00f0ff"></circle>
                                <circle cx="14" cy="17" r="1" fill="#00f0ff"></circle>
                                <path d="M14 4c1.2 1.2 1.2 3.6 0 4.8"></path>
                                <path d="M17 2c2.5 2.5 2.5 7.5 0 10"></path>
                            </svg>
                            <h1 class="radio-atual-title">RÁDIO ATUAL - 1228</h1>
                        </div>
                    </div>
                </section>

                <section id="codigos-q" class="content-section">
                    <header class="section-header">
                        <h1>Códigos Q</h1>
                        <p>Conjunto de abreviações para tornar a comunicação rápida e padronizada.</p>
                    </header>
                    <h2 style="margin: 20px 0 10px; font-size: 1.2rem; color: #fff;">Códigos Mais Importantes</h2>
                    <div id="codigos-q-bounce-cards-grid" class="cards-carousel" style="display: flex; overflow-x: auto; gap: 15px; padding-bottom: 15px; scroll-snap-type: x mandatory; margin-bottom: 20px;">
                        <div class="card info-card blue-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QAP</h3>
                            <p>Está na escuta? Verifica se alguém está ouvindo.<br><em>"Bombeiro 01, QAP?"</em></p>
                        </div>
                        <div class="card info-card green-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QSL</h3>
                            <p>Entendido / Mensagem recebida.<br><em>"QSL, em deslocamento."</em></p>
                        </div>
                        <div class="card info-card yellow-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QTH</h3>
                            <p>Localização / Endereço.<br><em>"Informe seu QTH."</em></p>
                        </div>
                        <div class="card info-card orange-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QTI</h3>
                            <p>Rota / Deslocamento.<br><em>"Equipe em QTI sentido hospital."</em></p>
                        </div>
                        <div class="card info-card purple-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QRR</h3>
                            <p>Pedido de apoio / Reforço.<br><em>"Solicito QRR no QTH."</em></p>
                        </div>
                        <div class="card info-card red-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QSM</h3>
                            <p>Repita a mensagem. Usado quando falha.<br><em>"QSM, transmissão cortada."</em></p>
                        </div>
                        <div class="card info-card blue-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QRX</h3>
                            <p>Aguarde. Momento antes de responder.<br><em>"QRX, verificando a vítima."</em></p>
                        </div>
                        <div class="card info-card yellow-card" style="width: 250px; height: auto; min-height: 200px;">
                            <h3>QTO / QTX / QRT</h3>
                            <p><strong>QTO:</strong> Deslocando/Saindo.<br><strong>QTX:</strong> Manter
                                acompanhamento.<br><strong>QRT:</strong> Encerrar transmissão.</p>
                        </div>
                    </div>
                    
                    <div class="content-box" style="padding: 10px; background: transparent; border: none; box-shadow: none; display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <img src="assets/codigos de comunicaçao/codigoq.png" alt="Guia Visual Código Q" style="max-width: 48%; border-radius: 8px; cursor: pointer; flex: 1 1 300px;">
                        <img src="assets/codigos de comunicaçao/codigo_de_intensidade.png" alt="Código de Intensidade" style="max-width: 48%; border-radius: 8px; cursor: pointer; flex: 1 1 300px;">
                    </div>
                </section>

                <section id="alfabeto-fonetico" class="content-section">
                    <header class="section-header">
                        <h1>Alfabeto Fonético</h1>
                        <p>Utilizado para soletrar nomes, placas, e endereços com precisão.</p>
                    </header>
                    <div class="split-view" style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start; justify-content: center; margin-top: 20px;">
                        <!-- Image Side -->
                        <div style="flex: 1 1 300px; max-width: 500px;">
                            <img src="assets/codigos de comunicaçao/fonetico.png" alt="Guia Alfabeto Fonético" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                        </div>
                        
                        <!-- Card Side -->
                        <div class="card info-card purple-card" style="flex: 2 1 400px;">
                            <h2 style="margin: 0 0 15px; font-size: 1.2rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Tabela Fonética</h2>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 15px; text-align: center;">
                                <div><strong style="color: var(--primary-green);">A</strong><br>Alfa</div>
                                <div><strong style="color: var(--primary-green);">B</strong><br>Bravo</div>
                                <div><strong style="color: var(--primary-green);">C</strong><br>Charlie</div>
                                <div><strong style="color: var(--primary-green);">D</strong><br>Delta</div>
                                <div><strong style="color: var(--primary-green);">E</strong><br>Echo</div>
                                <div><strong style="color: var(--primary-green);">F</strong><br>Fox</div>
                                <div><strong style="color: var(--primary-green);">G</strong><br>Golf</div>
                                <div><strong style="color: var(--primary-green);">H</strong><br>Hotel</div>
                                <div><strong style="color: var(--primary-green);">I</strong><br>Índia</div>
                                <div><strong style="color: var(--primary-green);">J</strong><br>Juliet</div>
                                <div><strong style="color: var(--primary-green);">K</strong><br>Kilo</div>
                                <div><strong style="color: var(--primary-green);">L</strong><br>Lima</div>
                                <div><strong style="color: var(--primary-green);">M</strong><br>Mike</div>
                                <div><strong style="color: var(--primary-green);">N</strong><br>November</div>
                                <div><strong style="color: var(--primary-green);">O</strong><br>Oscar</div>
                                <div><strong style="color: var(--primary-green);">P</strong><br>Papa</div>
                                <div><strong style="color: var(--primary-green);">Q</strong><br>Quebec</div>
                                <div><strong style="color: var(--primary-green);">R</strong><br>Romeu</div>
                                <div><strong style="color: var(--primary-green);">S</strong><br>Sierra</div>
                                <div><strong style="color: var(--primary-green);">T</strong><br>Tango</div>
                                <div><strong style="color: var(--primary-green);">U</strong><br>Uniform</div>
                                <div><strong style="color: var(--primary-green);">V</strong><br>Victor</div>
                                <div><strong style="color: var(--primary-green);">W</strong><br>Whiskey</div>
                                <div><strong style="color: var(--primary-green);">X</strong><br>X-Ray</div>
                                <div><strong style="color: var(--primary-green);">Y</strong><br>Yankee</div>
                                <div><strong style="color: var(--primary-green);">Z</strong><br>Zulu</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="numeracao-fonetica" class="content-section">
                    <header class="section-header">
                        <h1>Numeração Fonética</h1>
                        <p>Padroniza a transmissão dos números pelo rádio.</p>
                    </header>
                    
                    <div class="split-view" style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start; justify-content: center; margin-top: 20px;">
                        <!-- Card Side -->
                        <div class="card info-card blue-card" style="flex: 2 1 400px;">
                            <h2 style="margin: 0 0 15px; font-size: 1.2rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Tabela Numérica</h2>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px; text-align: center;">
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">1</strong><br>Primeiro</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">2</strong><br>Segundo</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">3</strong><br>Terceiro</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">4</strong><br>Quarto</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">5</strong><br>Quinto</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">6</strong><br>Sexto</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">7</strong><br>Sétimo</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">8</strong><br>Oitavo</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">9</strong><br>Nono</div>
                                <div><strong style="color: var(--primary-green); font-size: 1.2rem;">0</strong><br>Nulo / Negativo</div>
                            </div>
                        </div>

                        <!-- Image Side -->
                        <div style="flex: 1 1 300px; max-width: 500px;">
                            <img src="assets/codigos de comunicaçao/numeros.png" alt="Guia Numeração Fonética" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                        </div>
                    </div>
                </section>

                <section id="padrao-radio" class="content-section">
                    <header class="section-header">
                        <h1>Padrão de Comunicações CBM</h1>
                        <p>Modelos visuais e exemplos de comunicação em serviço.</p>
                    </header>
                    
                    <div class="cards-grid" style="padding: 10px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <img src="assets/comunicaçao de entrada e saida de serviço/comunicaçao.png" alt="Comunicação CBM" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <img src="assets/comunicaçao de entrada e saida de serviço/radio_entrada_e_saida.png" alt="Entrada e Saída" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <img src="assets/comunicaçao de entrada e saida de serviço/pausa.png" alt="Pausa" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <img src="assets/comunicaçao de entrada e saida de serviço/deslocamento.png" alt="Deslocamento" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                    
                    <div class="cards-grid" style="margin-top: 20px;">
                        <div class="card info-card purple-card">
                            <h3>Comunicação Voltada ao Bombeiro</h3>
                            <p>Foco em assistência, orientação, cuidado e segurança da vítima. Diferente da policial, o contato inicial deve buscar acalmar e prestar apoio. Informe apenas dados necessários: local, tipo, vítimas, riscos, apoio.</p>
                        </div>
                        <div class="card info-card yellow-card">
                            <h3>Boas Práticas</h3>
                            <p>Mantenha tom calmo; evite expor dados desnecessários; não grite; não discuta; confirme com QSL; peça QSM quando necessário.</p>
                        </div>
                    </div>

                    <h2 style="margin: 30px 0 15px; font-size: 1.3rem; color: #fff; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Transcrição de Frequência</h2>
                    
                    <div class="radio-chat-ui" style="background: rgba(15, 20, 25, 0.9); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; padding: 20px; box-shadow: inset 0 0 20px rgba(0, 240, 255, 0.05), 0 10px 30px rgba(0,0,0,0.5); font-family: 'Courier New', Courier, monospace; overflow: hidden; position: relative;">
                        
                        <!-- Terminal Header -->
                        <div style="display: flex; justify-content: space-between; color: var(--primary-blue); border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 10px; margin-bottom: 15px; font-size: 0.9rem;">
                            <span><strong style="color: #00f0ff;">[FREQ: 1228 MHz]</strong> SECURE COMMS</span>
                            <span class="blinking-cursor" style="animation: blink 1s step-end infinite;">REC_</span>
                        </div>
                        
                        <!-- Chat Sequence -->
                        <div style="font-size: 0.95rem; line-height: 1.5;">
                            <div style="color: #888; font-style: italic; margin: 15px 0; text-align: center; font-size: 0.85rem;">-- Solicitação de chamada aberta na rede --</div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 8px;">
                                <span style="color: #ff4757; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(255,71,87,0.5);">[CENTRAL] :</span>
                                <span style="color: #fff;">"QAP Subtenente RJ?"</span>
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <span style="color: #2ed573; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(46,213,115,0.5);">[SUBTENENTE RJ] :</span>
                                <span style="color: #fff;">"QAP Central, Subtenente RJ na escuta. Indo na última QRU, QSL."</span>
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 8px;">
                                <span style="color: #ff4757; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(255,71,87,0.5);">[CENTRAL] :</span>
                                <span style="color: #fff;">"QSL RJ. Desloque até a última QRU informada e, ao chegar na QTH, repasse a situação na rede."</span>
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <span style="color: #2ed573; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(46,213,115,0.5);">[SUBTENENTE RJ] :</span>
                                <span style="color: #fff;">"QSL Central. Subtenente RJ em QTI sentido à QRU."</span>
                            </div>
                            
                            <div style="color: #888; font-style: italic; margin: 15px 0; text-align: center; font-size: 0.85rem;">-- Unidade chega ao local da ocorrência --</div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 8px;">
                                <span style="color: #2ed573; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(46,213,115,0.5);">[SUBTENENTE RJ] :</span>
                                <span style="color: #fff;">"QAP Central, Subtenente RJ já estou na QTH. Há muitos feridos no local, irei realizar o salvamento dos mesmos. QSL."</span>
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <span style="color: #ff4757; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(255,71,87,0.5);">[CENTRAL] :</span>
                                <span style="color: #fff;">"QSL RJ. Qualquer informe, joga na rede. QSL."</span>
                            </div>
                            
                            <div style="color: #888; font-style: italic; margin: 15px 0; text-align: center; font-size: 0.85rem;">-- Após atendimento e estabilização --</div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 8px;">
                                <span style="color: #2ed573; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(46,213,115,0.5);">[SUBTENENTE RJ] :</span>
                                <span style="color: #fff;">"QAP Central, código 4 na área. Subtenente RJ retornando à QTI da base. QSL."</span>
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <span style="color: #ff4757; font-weight: bold; width: 140px; text-align: right; text-shadow: 0 0 5px rgba(255,71,87,0.5);">[CENTRAL] :</span>
                                <span style="color: #fff;">"QSL RJ. TKS pelo informe."</span>
                            </div>
                            
                            <div style="color: #00f0ff; font-weight: bold; text-align: center; margin-top: 20px; font-size: 0.85rem; border-top: 1px solid rgba(0, 240, 255, 0.2); padding-top: 10px;">
                                /// TRANSMISSION ENDED ///
                            </div>
                        </div>
                    </div>
                </section>

                

                <!-- Rodapé Centralizado -->
                <footer class="site-footer">
                    <p>© 2026 ERREJOTA. Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    </div>
`;
