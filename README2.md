# 🛡️ Sistema de Autenticação Militar & Trava de Máquina (HWID) — CBM

> **Documentação Completa de Arquitetura, Segurança e Implementação**  
> Desenvolvido para o **Corpo de Bombeiros Militar**.  
> Integração com **Discord OAuth2**, verificação de **Cargos e Membro no Servidor**, geração de **HWID Físico (Cross-Browser)**, política de **1 Desktop + 1 Mobile** e **Painel Administrativo para Reset de Dispositivos**.

---

## 📑 Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Fluxo das 6 Etapas de Autenticação (HUD)](#2-fluxo-das-6-etapas-de-autenticação-hud)
3. [Configuração no Discord Developer Portal](#3-configuração-no-discord-developer-portal)
4. [Variáveis de Ambiente (.env.local)](#4-variáveis-de-ambiente-envlocal)
5. [Como Funciona a Trava de Máquina (HWID Cross-Browser)](#5-como-funciona-a-trava-de-máquina-hwid-cross-browser)
6. [Estrutura de Arquivos do Projeto](#6-estrutura-de-arquivos-do-projeto)
7. [Endpoints de API (Rotas Next.js)](#7-endpoints-de-api-rotas-nextjs)
8. [Painel Administrativo de Reset de HWID](#8-painel-administrativo-de-reset-de-hwid)
9. [Guia de Implementação Rápida no seu Projeto](#9-guia-de-implementação-rápida-no-seu-projeto)

---

## 1. Visão Geral da Arquitetura

O sistema foi desenhado para blindar o acesso ao portal, impedindo:
* Compartilhamento de contas ou logins vazados;
* Login por pessoas que não fazem parte do servidor oficial do Discord dos Bombeiros;
* Login por membros sem o cargo oficial (setagem) de Bombeiro;
* Acesso simultâneo ou em múltiplas máquinas não autorizadas (cada militar tem direito a vincular **1 Computador** e **1 Dispositivo Móvel**);
* Burla de dispositivo via troca de navegador (Chrome, Edge, Opera, Brave, Firefox ou Aba Anônima geram o mesmo HWID).

```
                        [ Militar insere ID Militar ]
                                     ↓
              [ Coleta de HWID Físico (GPU, CPU, Tela, Áudio) ]
                                     ↓
                     [ Requisição POST para /api/auth ]
                                     ↓
  ┌──────────────────────────────────┴──────────────────────────────────┐
  │                           AS 6 ETAPAS                               │
  ├─ 1. Conexão Segura com a API                                        │
  ├─ 2. Checagem: Militar está no Servidor do Discord? ──(Não)──→ [Link]│
  ├─ 3. Checagem: Cargo de Bombeiro + Bot Autorizado? ───(Não)──→ [OAuth]│
  ├─ 4. Identificação da Plataforma (PC ou Mobile)                      │
  ├─ 5. Validação da Trava de HWID:                                     │
  │     ├─ 1º Acesso: Registra o HWID no banco como autorizado          │
  │     ├─ Mesmo Dispositivo: Acesso Permitido                          │
  │     └─ Dispositivo Diferente: BLOQUEADO (Requer Reset no Painel)    │
  └─ 6. Emissão da Sessão Criptografada Única                          │
                                     ↓
                       [ Portal Principal Liberado ]
```

---

## 2. Fluxo das 6 Etapas de Autenticação (HUD)

Quando o militar digita seu ID (ex: `01`) e clica em **ENTRAR**:

| Etapa | Nome da Verificação | O que o Sistema Valida | Ação em Caso de Falha |
| :---: | :--- | :--- | :--- |
| **01** | **Conexão Segura** | Conectividade com a API do Discord e servidores. | Alerta de falha de conexão com retry. |
| **02** | **Servidor Discord** | Busca o membro na Guild oficial pelo apelido contendo `#ID`. | Trava a verificação e exibe botão: **`[ENTRAR NO SERVIDOR DO DISCORD]`** (abre o convite em nova aba). |
| **03** | **Autorização do Bot & Cargo** | Confere se tem a Role militar e se o militar já autorizou o Bot oficial via OAuth2. | Se for o 1º acesso e o Bot não estiver autorizado, trava e exibe o botão pulsante: **`[AUTORIZAR BOT NO DISCORD]`**. |
| **04** | **Identificação do Dispositivo** | Detecta se o acesso é de um **Desktop** ou **Mobile (Smartphone/Tablet)**. | Exibe visualmente o tipo de hardware identificado. |
| **05** | **Validação de HWID (Trava de Máquina)** | Consulta se aquele ID já possui aquela categoria de dispositivo vinculada. | Se tentar logar em um **2º PC** diferente: **TRAVA e BLOQUEIA**: *"Acesso bloqueado: Este ID militar já está registrado em outro computador. Solicite ao Comando a liberação da máquina."* |
| **06** | **Emissão de Sessão Criptografada** | Gera token único de sessão e salva cookies seguros. | Libera o acesso ao portal e notifica os componentes. |

---

## 3. Configuração no Discord Developer Portal

Acesse [discord.com/developers/applications](https://discord.com/developers/applications) e siga os passos abaixo:

### 3.1. Criar a Aplicação e o Bot
1. Clique em **New Application**, dê o nome (ex: `CBM Segurança`) e confirme.
2. No menu lateral, clique em **Bot**:
   - Em **Token**, clique em **Reset Token** e copie o token gerado (`DISCORD_BOT_TOKEN`).
   - Em **Privileged Gateway Intents**, **ATIVE obrigatoriamente**:
     - ✅ **Server Members Intent** (ON).
   - Salve as alterações.

### 3.2. Configurar o OAuth2 (Login de Autorização)
1. No menu lateral, clique em **OAuth2** ➔ **General**:
   - Copie o **Client ID** (`DISCORD_CLIENT_ID`).
   - Clique em **Reset Secret** e copie o **Client Secret** (`DISCORD_CLIENT_SECRET`).
2. Em **Redirects**, adicione as URLs de retorno autorizadas:
   - Para desenvolvimento local:  
     `http://localhost:3000/api/auth/discord/callback`
   - Para o site em produção:  
     `https://seusite.com/api/auth/discord/callback`  
     *(ou `https://seu-projeto.vercel.app/api/auth/discord/callback`)*
3. Clique em **Save Changes**.

### 3.3. Convidar o Bot para o Servidor Oficial
1. Vá em **OAuth2** ➔ **URL Generator**.
2. Marque os Scopes: `bot`, `applications.commands`.
3. Em Bot Permissions, marque: `View Channels`, `Read Message History`.
4. Copie a URL gerada e abra no navegador para adicionar o bot ao seu servidor do Discord.
5. Coloque o cargo do Bot **acima** dos cargos dos membros no Discord para que ele possa ler todos os membros sem restrição.

---

## 4. Variáveis de Ambiente (`.env.local`)

Crie ou atualize o arquivo `.env.local` na raiz do seu projeto Next.js:

```env
# Discord Bot Credentials
DISCORD_BOT_TOKEN="MTUyOTkzNjUyOTA2NDA2NzI1NQ.GYqYFz..."
DISCORD_CLIENT_ID="1529936529064067255"
DISCORD_CLIENT_SECRET="Jeh1zHGa1LLpoOYNxT5nfJlBG_c82Ekn"
NEXT_PUBLIC_DISCORD_CLIENT_ID="1529936529064067255"

# Servidor e Cargos Oficiais
DISCORD_GUILD_ID="1505995174801702912"
DISCORD_ROLE_BOMBEIRO="1505995174906429566"
DISCORD_INVITE_URL="https://discord.gg/JdAB2NVss"

# Senha Mestra / Admin
MASTER_PASSWORD="SUA_SENHA_MESTRA"

# (Opcional) Redis na Nuvem para persistência em produção Vercel/Upstash
# REDIS_URL="redis://default:token@seuhost.upstash.io:6379"
```

---

## 5. Como Funciona a Trava de Máquina (HWID Cross-Browser)

### O Problema Comum:
Se o sistema usar `localStorage`, `cookies` ou `User-Agent`, a pessoa consegue burlar a trava simplesmente:
* Abrindo em outro navegador (ex: Chrome ➔ Edge);
* Abrindo em Janela Anônima;
* Limpando os dados do navegador.

### A Solução Implementada (Hardware Imutável):
O script `deviceFingerprint.js` extrai propriedades físicas exclusivas do silício da máquina:
1. **GPU WebGL (Placa de Vídeo):**
   - Fabricante não mascarado (`UNMASKED_VENDOR_WEBGL`) e modelo da GPU (`UNMASKED_RENDERER_WEBGL`) limpo de prefixos voláteis de navegadores;
   - Constantes de hardware do chip gráfico: `MAX_TEXTURE_SIZE`, `MAX_RENDERBUFFER_SIZE`, `MAX_VERTEX_UNIFORM_VECTORS`.
2. **CPU (Processador):**
   - Quantidade real de núcleos de hardware (`navigator.hardwareConcurrency`).
3. **Monitor/Tela:**
   - Resolução física total e profundidade de cor (`screen.width x screen.height x screen.colorDepth`).
4. **Placa de Áudio:**
   - Taxa de amostragem física de saída (`audioCtx.sampleRate`) e canais de hardware (`maxChannelCount`).
5. **Sistema Operacional e Fuso Horário:**
   - Plataforma base (Windows, macOS, Linux, iOS, Android) e Timezone da máquina.

Esses parâmetros são convertidos em um hash criptográfico **SHA-256**.  
**Resultado:** Seja no **Google Chrome**, **Microsoft Edge**, **Opera**, **Brave**, **Firefox** ou **Aba Anônima** na mesma máquina, o HWID calculado é **idêntico**. Em uma máquina diferente, o HWID muda completamente.

---

## 6. Estrutura de Arquivos do Projeto

```bash
next-app/
├── public/
│   ├── js/
│   │   ├── deviceFingerprint.js        # Script de geração do HWID no navegador
│   │   └── script.js                   # Lógica da tela de login militar e HUD
│   └── painel-avisos/
│       ├── index.html                  # Painel com as abas de monitores de PC
│       ├── painel.css                  # Estilos dos monitores 3D e painel admin
│       └── painel.js                   # Controlador das abas e reset de HWID
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── devices/
│   │   │   │       └── route.js        # API: Lista militares e executa reset de HWID
│   │   │   └── auth/
│   │   │       ├── route.js            # API: Validação das 6 etapas do HUD
│   │   │       └── discord/
│   │   │           ├── login/
│   │   │           │   └── route.js    # API: Redirecionamento OAuth2 do Discord
│   │   │           └── callback/
│   │   │               └── route.js    # API: Retorno da autorização e vínculo
│   │   ├── layout.js                   # Injeção de scripts e bloqueio inicial
│   │   └── page.js                     # Renderizador da aplicação
│   └── lib/
│       ├── deviceFingerprint.js        # Módulo auxiliar de HWID para React/Next
│       └── deviceStore.js              # Banco de dados de militares (JSON/Redis)
└── data/
    └── devices_store.json              # Base local persistente de vínculos e HWIDs
```

---

## 7. Endpoints de API (Rotas Next.js)

### 7.1. `POST /api/auth`
Valida o login militar através das 6 etapas.
* **Corpo da Requisição (JSON):**
  ```json
  {
    "id": "01",
    "hwid": "pc_a79f2b184c0e5a9f02b1c8e3",
    "deviceType": "desktop"
  }
  ```
* **Respostas:**
  - `200 OK`: Acesso autorizado, sessão emitida.
  - `401 Unauthorized`: Falha na Etapa 3 (Bot não autorizado) ➔ Retorna `action: "AUTHORIZE_BOT"` e `actionUrl`.
  - `403 Forbidden`: Falha na Etapa 5 (HWID travado em outra máquina) ➔ Retorna `action: "HWID_LOCKED"`.
  - `404 Not Found`: Falha na Etapa 2 (Não está no Discord CBM) ➔ Retorna `action: "JOIN_DISCORD"` e `actionUrl`.

### 7.2. `GET /api/auth/discord/login`
Inicia o fluxo OAuth2. Recebe os parâmetros `id`, `hwid` e `type` e redireciona o usuário para `discord.com/oauth2/authorize` preservando o estado no parâmetro `state` (Base64).

### 7.3. `GET /api/auth/discord/callback`
Recebe o código de autorização do Discord, troca pelo Access Token do usuário, confere se o membro pertence ao servidor CBM com o cargo de Bombeiro, salva `isBotAuthorized: true`, vincula a máquina no banco e redireciona para a página principal com `discord_auth=success`.

### 7.4. `GET /api/admin/devices`
Retorna a lista completa de militares cadastrados, HWIDs e datas de acesso.
* **Resposta Exemplo:**
  ```json
  {
    "sucesso": true,
    "total": 1,
    "militares": [
      {
        "militarId": "01",
        "nick": "Capitão Silva #01",
        "discordTag": "silva#0",
        "isBotAuthorized": true,
        "desktopHwid": "pc_a79f2b184c0e5a9f02b1c8e3",
        "mobileHwid": null,
        "lastLogin": "2026-10-13T18:00:00.000Z"
      }
    ]
  }
  ```

### 7.5. `POST /api/admin/devices`
Executa o reset de HWID ou a **exclusão total de cadastro** solicitada por um Oficial/Admin.
* **Corpo para Reset de Dispositivo (JSON):**
  ```json
  {
    "militarId": "01",
    "target": "desktop"
  }
  ```
  *(Opções de `target`: `"desktop"`, `"mobile"` ou `"all"`)*

* **Corpo para Exclusão Total de Cadastro (JSON):**
  ```json
  {
    "militarId": "01",
    "action": "delete"
  }
  ```
  *Efeito:* Apaga permanentemente o cadastro militar, desvincula a conta antiga do Discord, remove ambos os HWIDs (PC e Mobile) e limpa o histórico de logs. O militar poderá registrar uma nova conta de Discord ou novo aparelho a partir do zero.

---

## 8. Painel Administrativo de HWID, Logs & Gestão de Cadastros

Acessível através da rota `/painel-avisos`:
1. No topo, clique no **Monitor 2 (TERMINAL 02: PAINEL ADMINISTRATIVO)**.
2. O painel exibe:
   - **Métricas:** Total de Militares, Desktops Ativos, Mobiles Ativos e Bots Autorizados;
   - **Busca Rápida:** Filtro instantâneo por ID, Nome de Guerra ou Discord;
   - **Cards de Militares com Gestão Completa:**
     - Botão `[ 🔄 Resetar HWID do PC ]`
     - Botão `[ 🔄 Resetar HWID do Celular ]`
     - Botão `[ 📜 Ver Logs (X) ]`: Abre modal com a **timeline completa de auditoria**, mostrando cada tentativa de acesso, bloqueios por HWID em outra máquina, autorização do Bot, data e hora;
     - Botão `[ ⚠️ Resetar HWIDs ]`: Libera simultaneamente tanto o PC quanto o Celular;
     - Botão `[ 🗑️ Excluir Cadastro ]`: Abre modal tático de segurança para apagar integralmente o militar do banco (ideal para trocas de conta do Discord ou aparelhos vendidos).
3. Ao clicar em Resetar ou Excluir, uma janela de confirmação de segurança surge antes de aplicar a alteração.
4. No próximo login, o militar poderá registrar seu novo computador, celular ou nova conta sem conflito.

---

## 9. Guia de Implementação Rápida no seu Projeto

Se você está implementando este sistema em outra parte do projeto ou em um novo repositório:

1. **Copie os arquivos principais:**
   - `src/lib/deviceFingerprint.js` e `public/js/deviceFingerprint.js`
   - `src/lib/deviceStore.js`
   - As rotas da pasta `src/app/api/auth/` e `src/app/api/admin/`
   - O painel em `public/painel-avisos/`

2. **Configure o `.env.local`** com o seu `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID` e `DISCORD_ROLE_BOMBEIRO`.

3. **No Discord Developer Portal:**
   - Adicione o Redirect: `http://localhost:3000/api/auth/discord/callback` (e a URL da Vercel).
   - Ative a opção **Server Members Intent** na aba Bot.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

Pronto! Seu sistema de login militar com verificação no Discord e trava de máquina (HWID) estará rodando 100% blindado e seguro.
