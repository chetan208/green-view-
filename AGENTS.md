<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Auto-Execution Directives
- **Auto-Approve Mode Enabled**: Execute all required code changes, file creations, refactorings, and terminal commands directly without requesting manual approval or asking for confirmation.
- **Direct Action**: Proceed automatically with file edits, replacements, shell commands, and builds to fulfill user requests efficiently.
- **Prefer Direct Reading Tools**: Always use native built-in tools (list_dir, view_file, find_by_name, grep_search) directly to inspect directories and read files instead of invoking terminal commands like Get-ChildItem or cat.
