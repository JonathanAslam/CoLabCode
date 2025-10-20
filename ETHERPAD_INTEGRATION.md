# Etherpad Integration - Development vs Production

## Overview
This document explains how Etherpad is integrated differently in development and production environments to avoid cookie/CORS issues.

## The Problem
Etherpad embedded in an iframe from a different origin (different port/domain) causes cookie issues:
- Browser blocks third-party cookies
- Session data cannot be saved
- Error: "Cookie could not be found"

## The Solution
Both environments use **same-origin proxying** but implemented differently.

---

## Development Setup

### How it works:
- **Vite dev server** runs on `http://localhost:5173`
- **Vite proxy** forwards `/etherpad/*` requests to `http://etherpad:9001`
- Result: React app and Etherpad both served from `localhost:5173`

### Configuration:

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/etherpad': {
        target: 'http://etherpad:9001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/etherpad/, ''),
        ws: true, // WebSocket support
      },
    },
  },
})
```

**frontend/.env.development:**
```
VITE_ETHERPAD_BASE_URL=/etherpad/p/
```

### Start Development:
```bash
docker compose up
```
Access: `http://localhost:5173/document`

---

## Production Setup

### How it works:
- **Nginx** serves static React build on port 80
- **Nginx reverse proxy** forwards `/etherpad/*` requests to `http://etherpad:9001`
- Result: React app and Etherpad both served from same domain

### Configuration:

**nginx.conf:**
```nginx
server {
  listen 80;
  
  # Proxy Etherpad (with WebSocket support)
  location /etherpad/ {
    proxy_pass http://etherpad:9001/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_buffering off;
    proxy_read_timeout 86400;
  }
  
  # Serve React app
  location / {
    try_files $uri /index.html;
  }
}
```

**frontend/.env.production:**
```
VITE_ETHERPAD_BASE_URL=/etherpad/p/
```

### Build & Deploy Production:
```bash
# Build production image
docker compose -f docker-compose.prod.yml build frontend

# Run production
docker compose -f docker-compose.prod.yml up
```

---

## Key Differences

| Aspect | Development | Production |
|--------|-------------|------------|
| Server | Vite dev server | Nginx |
| Proxy | Vite proxy config | Nginx reverse proxy |
| Port | 5173 | 80 (or custom) |
| Hot Reload | ✅ Yes | ❌ No |
| Build Required | ❌ No | ✅ Yes |

---

## Benefits of This Approach

✅ **No CORS issues** - Same origin for both services
✅ **No cookie problems** - Browsers allow same-origin cookies
✅ **WebSocket support** - Real-time collaboration works
✅ **Consistent URLs** - Same path (`/etherpad/p/`) in dev and prod
✅ **Easy deployment** - Single domain for users

---

## Testing

### Development:
```bash
docker compose up
# Visit: http://localhost:5173/document
```

### Production:
```bash
docker compose -f docker-compose.prod.yml up --build
# Visit: http://localhost/document (or your domain)
```

---

## Troubleshooting

### Issue: Etherpad iframe shows "Cookie could not be found"
**Solution:** 
1. Clear browser cache and cookies
2. Hard refresh (Ctrl+Shift+R)
3. Verify proxy is working:
   - Dev: Check Vite console for proxy logs
   - Prod: Check nginx logs: `docker logs colabcode-frontend-1`

### Issue: WebSocket connection fails
**Solution:**
- Ensure `ws: true` in Vite config (dev)
- Ensure WebSocket headers in nginx config (prod)
- Check firewall/security groups allow WebSocket connections

### Issue: 502 Bad Gateway in production
**Solution:**
- Verify Etherpad container is running: `docker ps`
- Check Etherpad logs: `docker logs colabcode-etherpad-1`
- Verify network connectivity: `docker compose exec frontend ping etherpad`

---

## Additional Notes

- The proxy path `/etherpad/` can be customized (update both nginx.conf and vite.config.js)
- For production domains, update `server_name` in nginx.conf
- Consider SSL/TLS certificates for production (Let's Encrypt recommended)
- Monitor Etherpad performance in production (consider PostgreSQL instead of DirtyDB)
