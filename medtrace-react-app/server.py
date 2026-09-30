import http.server
import urllib.request
import urllib.error
import os
import sys

PORT = 8080
BACKEND_HOST = "https://medtrace-l2k9.onrender.com"
WEB_DIR = os.path.join(os.path.dirname(__file__), "medtrace-react-app", "public")

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def proxy_request(self):
        target_url = BACKEND_HOST + self.path
        body = None
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            body = self.rfile.read(content_length)

        headers = {}
        for key in ["Content-Type", "Authorization", "Accept"]:
            val = self.headers.get(key)
            if val:
                headers[key] = val

        req = urllib.request.Request(target_url, data=body, headers=headers, method=self.command)
        try:
            with urllib.request.urlopen(req) as resp:
                self.send_response(resp.status)
                for k, v in resp.getheaders():
                    if k.lower() not in ["access-control-allow-origin", "transfer-encoding", "content-encoding", "connection"]:
                        self.send_header(k, v)
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(resp.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for k, v in e.headers.items():
                if k.lower() not in ["access-control-allow-origin", "transfer-encoding", "content-encoding", "connection"]:
                    self.send_header(k, v)
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            self.send_response(502)
            self.send_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(f'{{"detail": "Proxy error: {str(e)}"}}'.encode())

    def do_GET(self):
        if self.path.startswith("/api/"):
            self.proxy_request()
        else:
            if self.path == "/":
                self.send_response(302)
                self.send_header("Location", "/medtracer/MEDTRACE1.HTML")
                self.end_headers()
                return
            super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/"):
            self.proxy_request()
        else:
            self.send_error(405)

    def do_PATCH(self):
        if self.path.startswith("/api/"):
            self.proxy_request()
        else:
            self.send_error(405)

    def do_DELETE(self):
        if self.path.startswith("/api/"):
            self.proxy_request()
        else:
            self.send_error(405)

if __name__ == "__main__":
    server_address = ("", PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, ProxyHandler)
    print(f"MedTrace Dev Server running at http://localhost:{PORT}")
    print(f"Proxying /api/* -> {BACKEND_HOST}")
    httpd.serve_forever()
