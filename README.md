# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Development

In order to run this project, a few variables need to be set in a local .env file

```
VITE_GOOGLE_API_KEY=<key will be shared in email>
VITE_ENDPOINT_URL=https://restapi.appspaces.ca/rest/
VITE_ENDPOINT_USERNAME=<username provided>
VITE_ENDPOINT_PASSWORD=<password provided>
```

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.


## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- radix-ui
- Tailwind CSS

## Netlify limitations

This app has a working pipeline setup to automatically deploy to a netlify URL. 
https://stirring-fairy-4b15f9.netlify.app/

However, this comes with a limitation I was not able to go around for the purpose of this demo. The main request is reject with a CORS error, to circumvent this I used a variation of Chrome running without web-security flags using this command on Mac OSX: 
```
Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"
```

## Next Steps

Things I would love to get to: 
- Add UnitTests to cover edge scenarios.
- Improve UX when unexpected data is returned. 
- For this demo, I rely on the AutoComplete service to generate the Address, some extra validation might be required if data is filled manually. 
- I would like to get more understanding on international shipping logic.
