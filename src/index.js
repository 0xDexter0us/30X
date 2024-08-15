addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const pathSegments = url.pathname.split('/')
  
    let statusCode, targetUrl, errorMessage
  
    if (pathSegments.length >= 3) {
      statusCode = parseInt(pathSegments[1])
      targetUrl = pathSegments.slice(2).join('/')
    }
  
    if (!statusCode || !targetUrl) {
      const params = url.searchParams
      statusCode = parseInt(params.get('code')) || statusCode
      targetUrl = params.get('target') || targetUrl
      const b64target = params.get('b64target')
      if (b64target) {
        try {
          targetUrl = atob(b64target)
        } catch (e) {
          errorMessage = 'Invalid base64 encoded target'
        }
      }
    }
  
    if ([301, 302, 303, 307, 308].includes(statusCode) && targetUrl) {
      if (!targetUrl.match(/^[a-zA-Z]+:\/\//)) {
        targetUrl = 'http://' + targetUrl
      }
      return Response.redirect(targetUrl, statusCode)
    }

    if (url.pathname !== '/' || url.search !== '') {
      errorMessage = 'Invalid redirect request'
    }
  
    return new Response(generateHTML(errorMessage), {
      headers: { 'Content-Type': 'text/html' },
      status: errorMessage ? 400 : 200
    })
  }
  
  function generateHTML(errorMessage) {
    const errorBanner = errorMessage
      ? `<div style="background-color: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 15px; border-radius: 4px;">
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
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.5;
            color: #24292f;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 1012px;
            margin: 32px auto;
            padding: 0 16px;
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

        p,
        ul {
            margin-top: 0;
            margin-bottom: 16px;
        }

        code {
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(175, 184, 193, 0.2);
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
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

        pre code {
            padding: 0;
            margin: 0;
            font-size: 100%;
            word-break: normal;
            white-space: pre;
            background: transparent;
            border: 0;
        }

        .highlight {
            margin-bottom: 16px;
        }

        blockquote {
            padding: 0 1em;
            color: #57606a;
            border-left: 0.25em solid #d0d7de;
            margin: 0 0 16px 0;
        }

        .status-codes ul {
            padding-left: 20px;
        }

        .status-codes li {
            margin-bottom: 6px;
        }

        .important-notes {
            display: flex;
            justify-content: space-between;
        }

        .github-link {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
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

        a:visited {
        color: inherit;
        }

        a:hover, a:focus, a:active {
        color: inherit;
        text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">

        ${errorBanner}
        <h1>30X Redirects
            <small>Made with ❤️ by <a href="https://x.com/0xdexter0us">dexter0us</a></small>
        </h1>

        <p>This tool provides various ways to create HTTP redirects. Below are the supported methods and examples:</p>
        <div class="disclaimer">
            <strong>Disclaimer:</strong> This service is provided as open-source software, and its use is at your own risk. The author (Dexter0us) is not responsible for any misuse, including but not limited to malicious redirection or unauthorized access. The usage and operation of this service are beyond the author's control. The author disclaims any liability for damages, data loss, or security breaches resulting from its use.
        </div>
        
        <h3>Path Segments</h3>
        <p>Format: <code>/[STATUS_CODE]/[TARGET_URL]</code></p>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/302/https://example.com</code></pre>
        </div>

        <h3>Query Parameters</h3>
        <p>Format: <code>?code=[STATUS_CODE]&target=[TARGET_URL]</code></p>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/?code=301&target=https://example.com</code></pre>
        </div>

        <h3>Base64 Encoded Target</h3>
        <p>Format: <code>?code=[STATUS_CODE]&b64target=[BASE64_ENCODED_URL]</code></p>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/?code=307&b64target=aHR0cHM6Ly9leGFtcGxlLmNvbQ==</code></pre>
        </div>

        <h3>Additional Usage Examples</h3>

        <h3>Mixed Usage (Path for Code, Query for Target)</h3>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/303/?target=https://example.com</code></pre>
        </div>

        <h3>Using Base64 Without Protocol</h3>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/?code=308&b64target=ZXhhbXBsZS5jb20=</code></pre>
        </div>
        <blockquote>
            <p>Note: If no protocol is specified, http:// will be added automatically.</p>
        </blockquote>

        <h3>Path Segments with Subdirectories</h3>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/301/https://example.com/path/to/page</code></pre>
        </div>

        <h3>Using Other Protocols</h3>
        <div class="highlight">
            <pre><code>https://30x.dexter0us.com/302/sftp://sftp.example.com
https://30x.dexter0us.com/307/file:///C:/example.txt
https://30x.dexter0us.com/302/gopher://gopher.example.com</code></pre>
            </div>

        <div class="important-notes">
            <div class="status-codes">
                <h3>Supported Status Codes</h3>
                <ul>
                    <li>301 - Moved Permanently</li>
                    <li>302 - Found</li>
                    <li>303 - See Other</li>
                    <li>307 - Temporary Redirect</li>
                    <li>308 - Permanent Redirect</li>
                </ul>
            </div>
            <div class="important">
                <h3>Important Notes</h3>
                <ul>
                    <li>Various protocols are supported, including http, https, sftp, file, gopher, etc.</li>
                    <li>If no protocol is specified in the target URL, http:// will be automatically prepended.</li>
                    <li>Invalid requests will return a 400 Bad Request response.</li>
                    <li>For security reasons, always ensure you're redirecting to trusted URLs.</li>
                    <li>Some protocols may be blocked by browsers even if allowed by this service.</li>
                    <li>The actual behavior of the redirect may depend on the client's support for different protocols.</li>
                </ul>
            </div>
        </div>
        <div class="github-link">
            <p>For more details, visit the project on <a href="https://github.com/0xdexter0us/30X">GitHub</a>.</p>
        </div>
    </div>
</body>
</html>
  `
}
