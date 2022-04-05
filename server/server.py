#!/usr/bin/env python3

import urllib.parse as urlparse
from http.server import SimpleHTTPRequestHandler, HTTPServer
from subprocess import Popen

from args import get_args


def missing_bin(bin):
    print("======================")
    print(
        f"ERROR: {bin.upper()} does not appear to be installed correctly! please ensure you can launch '{bin}' in the terminal.")
    print("======================")


class CORSRequestHandler(SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        try:
            url = urlparse.urlparse(self.path)
            query = urlparse.parse_qs(url.query)
        except:
            query = {}

        urls = str(query["play_url"][0])
        if urls.startswith('magnet:') or urls.endswith('.torrent'):
            try:
                pipe = Popen([
                                 'peerflix', '-k', urls, '--', '--force-window'
                             ] + query.get("mpv_args", []))
            except FileNotFoundError as e:
                missing_bin('peerflix')
        else:
            try:
                pipe = Popen(['mpv', urls, '--force-window'] +
                             query.get("mpv_args", []))
            except FileNotFoundError as e:
                missing_bin('mpv')
        self.send_response(200, "playing...")

        self.send_response(200)
        self.end_headers()


if __name__ == '__main__':
    args = get_args()
    print(args.host)
    print(args.port)
    print("Listening on {}:{}".format(args.host, args.port))

    httpd = HTTPServer((args.host, args.port), CORSRequestHandler)
    httpd.serve_forever()
