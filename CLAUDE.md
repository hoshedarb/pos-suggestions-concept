# Project rules (read every session)

## Git and GitHub
- Never run `git` or `gh` commands yourself. The user is not an engineer and has never used Git or GitHub on their own, so guide them.
- Whenever a git or gh step is needed, give the exact command to type, **one at a time**, with a one-line plain-English explanation of what it does and what they should see afterward.
- The user runs each command by typing `!` before it in this session, so you can see the output.
- If `gh` asks questions, tell the user which option to pick.
- Wait until the output shows a command worked before giving the next one.
- If something fails, explain it simply and say how to fix it.
- When something must be done on the GitHub website, list exactly which buttons to click, in order.

## About the project
- This is an unofficial portfolio concept of an associate-facing telecom POS order screen for a tablet.
- Never use the iQmetrix name or logo.

## Scope
- Keep the app small. Only build what the user asks for in each prompt.
- Ask before adding anything extra.

## Code style
- Plain React (JavaScript, not TypeScript) with Vite.
- Plain CSS files for styling. No Tailwind or UI libraries.
- Keep components simple and readable.

## Design target
- Landscape tablet, 1180 x 820 px.

## Commands
- `npm install` installs packages.
- `npm run dev` starts the app locally.
- `npm run build` checks that the app builds.
