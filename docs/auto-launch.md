# Auto‑launching Veritas.O Workspace and Services

This document contains recipes to make VS Code open `veritas.code-workspace` at login and to start the backend/frontend services.

## 1) VS Code on login
(See `veritas.code-workspace` for macOS, Linux systemd `--user`, and Windows Task Scheduler snippets.)

## 2) Start backend/frontend via systemd
Copy `deploy/systemd/veritas-start.service` to `~/.config/systemd/user/` or `/etc/systemd/system/` and enable:

```bash
# user-level
mkdir -p ~/.config/systemd/user
cp deploy/systemd/veritas-start.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now veritas-start.service
```

The service runs `/home/ladonyabell/VO/scripts/start-all.sh` which attempts to start backend and frontend.

## 3) Notes
- Adjust `WorkingDirectory` and `ExecStart` paths in the service file for your user.
- For production use, prefer dedicated process managers (pm2, systemd units per service) and secure secrets with environment variables.
