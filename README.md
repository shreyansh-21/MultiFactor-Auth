<h1>🔐 Fullstack Multi-Factor Authentication App</h1>

<p>This is a secure fullstack authentication system built with <strong>React (frontend)</strong> and <strong>Node.js + Express (backend)</strong>. It features robust <strong>Multi-Factor Authentication (MFA)</strong> using <strong>TOTP (Time-based One-Time Password)</strong> and QR codes, ensuring strong protection for user accounts.</p>

<h2>✨ Features</h2>
<ul>
  <li>🔒 User authentication with <strong>username & password</strong> (bcrypt + Passport.js)</li>
  <li>📱 <strong>Two-Factor Authentication (2FA)</strong> with TOTP via authenticator apps (Google Authenticator, Authy, etc.)</li>
  <li>📷 <strong>QR Code generation</strong> for easy setup of MFA</li>
  <li>🔐 <strong>JWT-based session management</strong> for secure, stateless auth</li>
  <li>📦 MongoDB for user and token storage via Mongoose</li>
  <li>🛡️ CORS and session handling with <code>express-session</code></li>
  <li>✅ Login flow includes both password and 4-digit TOTP verification</li>
  <li>🌐 Frontend built with <strong>React</strong> for a smooth user experience</li>
</ul>

<h2>🛠 Tech Stack</h2>

<h3>Backend:</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB + Mongoose</li>
  <li>Passport.js (local strategy)</li>
  <li>JSON Web Tokens (JWT)</li>
  <li>Speakeasy (TOTP)</li>
  <li>QRCode (for generating QR codes)</li>
  <li>BcryptJS (password hashing)</li>
  <li>dotenv, cors, express-session</li>
</ul>

<h3>Frontend:</h3>
<ul>
  <li>React.js</li>
  <li>Axios</li>
  <li>React Router</li>
  <li>TailwindCSS / Material UI (if applicable)</li>
</ul>


<h2>🚀 How to Run</h2>
<ol>
  <li>
    <strong>Clone the repo</strong>
    <pre><code>git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name</code></pre>
  </li>
  <li>
    <strong>Backend Setup</strong>
    <pre><code>cd backend
npm install
npm run dev</code></pre>
  </li>
  <li>
    <strong>Frontend Setup</strong>
    <pre><code>cd frontend
npm install
npm start</code></pre>
  </li>
  <li>
    <strong>Visit</strong> <a href="http://localhost:3000">http://localhost:3000</a> to get started.
  </li>
</ol>

