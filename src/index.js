function generateHTML(errorMessage) {
  const errorBanner = errorMessage
    ? `<div class="disclaimer">
         Error: ${errorMessage}
       </div>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>30X Redirects</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
        line-height: 1.5;
        color: #24292f;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        transition: background 0.3s, color 0.3s;
      }

      .dark-theme {
        background-color: #0d1117;
        color: #c9d1d9;
      }

      .dark-theme .disclaimer {
        background-color: #2f2f2f;
        color: #ff7b72;
      }

      .container {
        max-width: 1012px;
        margin: 32px auto;
        padding: 0 16px;
        position: relative;
      }

      h1 {
        padding-bottom: 0.3em;
        font-size: 2em;
        border-bottom: 1px solid #eaecef;
        position: relative;
      }

      h1 small {
        display: block;
        font-size: 0.5em;
        font-weight: normal;
        color: #57606a;
      }

      h3 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
        font-size: 1.25em;
      }

      p, ul {
        margin-top: 0;
        margin-bottom: 16px;
      }

      code {
        padding: 0.2em 0.4em;
        background-color: rgba(175, 184, 193, 0.2);
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, monospace;
      }

      pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 6px;
        margin-bottom: 16px;
      }

      .dark-theme pre {
        background-color: #161b22;
      }

      .disclaimer {
        background-color: #f8d7da;
        color: #721c24;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 24px;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .theme-toggle {
        position: absolute;
        right: 16px;
        top: 16px;
        padding: 6px 12px;
        font-size: 0.9em;
        border: none;
        border-radius: 5px;
        background: #24292f;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .dark-theme .theme-toggle {
        background: #ffffff;
        color: #000000;
      }

      .github-link {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <button class="theme-toggle" onclick="toggleTheme()">
        <i class="fas fa-moon dark:hidden"></i> Toggle Theme
      </button>

      ${errorBanner}

      <h1>30X Redirects
        <small>Made with ❤️ by <a href="https://x.com/0xdexter0us">dexter0us</a></small>
      </h1>

      <p>This tool provides various ways to create HTTP redirects. Below are the supported methods and examples:</p>
      <div class="disclaimer">
        <strong>Disclaimer:</strong> This service is provided as open-source software, and its use is at your own risk...
      </div>

      <h3>Path Segments</h3>
      <pre><code>https://30x.dexter0us.com/302/https://example.com</code></pre>

      <h3>Query Parameters</h3>
      <pre><code>https://30x.dexter0us.com/?code=301&target=https://example.com</code></pre>

      <h3>Base64 Encoded Target</h3>
      <pre><code>https://30x.dexter0us.com/?code=307&target=aHR0cHM6Ly9leGFtcGxlLmNvbQ==</code></pre>

      <h3>Mixed Usage (Path for Code, Query for Target)</h3>
      <pre><code>https://30x.dexter0us.com/303/?target=https://example.com</code></pre>

      <h3>Using Base64 Without Protocol</h3>
      <pre><code>https://30x.dexter0us.com/?code=308&target=ZXhhbXBsZS5jb20=</code></pre>

      <blockquote>
        <p>Note: If no protocol is specified, http:// will be added automatically.</p>
      </blockquote>

      <h3>Path Segments with Subdirectories</h3>
      <pre><code>https://30x.dexter0us.com/301/https://example.com/path/to/page</code></pre>

      <h3>Using Other Protocols</h3>
      <pre><code>https://30x.dexter0us.com/302/sftp://sftp.example.com
https://30x.dexter0us.com/307/file:///C:/example.txt
https://30x.dexter0us.com/302/gopher://gopher.example.com</code></pre>

      <h3>Supported Status Codes</h3>
      <ul>
        <li>301 - Moved Permanently</li>
        <li>302 - Found</li>
        <li>303 - See Other</li>
        <li>307 - Temporary Redirect</li>
        <li>308 - Permanent Redirect</li>
      </ul>

      <div class="github-link">
        <p>For more details, visit the project on <a href="https://github.com/0xdexter0us/30X">GitHub</a>.</p>
      </div>
    </div>

    <script>
      function toggleTheme() {
        document.body.classList.toggle('dark-theme');
      }
    </script>
  </body>
  </html>
  `;
}
