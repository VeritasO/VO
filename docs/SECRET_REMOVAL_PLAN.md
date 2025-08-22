# Secret Removal Plan

This document outlines steps to identify and safely remove secrets accidentally committed to this repository.

1. Identify exposed secrets
   - Use pattern scans for common prefixes (sk- for OpenAI, apify_api_, AKIA, etc.) and high-entropy strings.
   - Command: `git grep -I --line-number -E "sk-|apify_api_|AKIA|-----BEGIN PRIVATE KEY|secret|PRIVATE_KEY"`

2. Replace secrets with placeholders
   - For each file found, replace the secret with an explicit placeholder (e.g., `your-openai-api-key-here`) and commit the change.

3. Prevent future commits
   - Ensure `.gitignore` contains `.env` and other secrets; add `!.env.example` to allow examples.

4. Rotate credentials
   - Rotate any API keys that were exposed (OpenAI, Apify, AWS, etc.) immediately.

5. Purge secrets from history (optional, destructive)
   - Use `git filter-repo` or `bfg` to remove secrets from history.
   - Example with BFG:
     - `bfg --delete-files .env`
     - `git reflog expire --expire=now --all && git gc --prune=now --aggressive`
   - Note: This rewrites history and requires coordination with collaborators.

6. Monitor
   - Add pre-commit hooks (husky) to block accidental commits of env files and run secret scans in CI.

If you want, I can prepare the exact `git filter-repo` commands and a safe rollout plan.
