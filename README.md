# 30X
This script provides various ways to create HTTP redirects from 301 to 308, useful for stuff like SSRF

---

### How to install on your custom domain.
1. Install Wrangler: Cloudflare's CLI tool.
```sh
npm install -g wrangler
```

2. Login to Cloudflare:
```sh
wrangler login
```

3. Initialize the Worker:
```sh
wrangler init example-worker
cd example-worker
```

4. Update `wrangler.toml` file with your custom domain and account ID.

5. Deploy the code:
```sh
wrangler deploy
```

Make sure the index.js is in the root or properly configured.
