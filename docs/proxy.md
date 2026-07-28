# Corporate proxy notes

If `npm install`, the opencode installer, or model calls fail on the Bosch network:

1. Set proxy environment variables (adjust host/port to the current Bosch proxy):
   ```bash
   export HTTP_PROXY=http://localhost:3128
   export HTTPS_PROXY=http://localhost:3128
   export NO_PROXY=localhost,127.0.0.1,.bosch.com
   ```
2. Tell npm about it:
   ```bash
   npm config set proxy $HTTP_PROXY
   npm config set https-proxy $HTTPS_PROXY
   ```
3. If TLS interception breaks downloads, point Node at the corporate CA bundle:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/bosch-ca-bundle.pem
   ```
4. Still stuck? Post the exact error in the workshop Teams channel — proxy issues
   are the #1 pre-work blocker and usually fixable in five minutes with help.
