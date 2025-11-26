# Resume Builder

This repository contains a React-based **Resume Builder** application located in the `resume-builder/` folder.

## Project Structure

- `resume-builder/`
  - `src/` – React components and app logic
  - `public/` – Static files and HTML template
  - `package.json` – Dependencies and scripts
  - `README.md` – Default Create React App documentation

## Getting Started

1. Go inside the app folder:

   ```bash
   cd "resume-builder"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

   The app will open on `http://localhost:3000` (or another available port).

## Scripts (run inside `resume-builder`)

- `npm start` – Start development server
- `npm test` – Run tests
- `npm run build` – Create optimized production build in `build/`

## Git & Ignore Rules

- Root `.gitignore` is configured to ignore:
  - `resume-builder/node_modules/`
  - `resume-builder/build/`
  - Coverage, env files, and log files
- Inner `resume-builder/.gitignore` (CRA default) is kept as-is for compatibility.

## Notes

- Keep committing from the root (`New folder (2)`) so the whole project stays in one repo.
- For detailed Create React App docs, check `resume-builder/README.md`.
