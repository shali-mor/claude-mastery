#!/usr/bin/env python3
"""Reads npm JSON from stdin and prints version + recent versions."""
import sys, json
try:
    d = json.load(sys.stdin)
    print("Version:", d.get("version", "?"))
    versions = list(d.get("time", {}).keys())[-10:]
    print("Recent versions:", ", ".join(versions))
except Exception:
    pass
