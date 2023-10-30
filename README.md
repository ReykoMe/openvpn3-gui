# Openvpn3 GUI for Linux

Simple Electron based OpenVPN3 GUI wrapper for Linux

### Motivation

Network manager's solution not working properly and for some cases causes connection loss. OpenVpn3 Client CLI works fine, but working with GUI is more comfortable for me. I like OpenVPN Connect application, but it's available only for Windows and MacOS

### Development guide

#### Environment setup

1. Install `NodeJS 20.0.2^` version:

- using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) ( preferred )
- using [official installer](https://nodejs.org/en/download)

2. Clone this repository
3. Install dependencies with `npm install` in project root
4. run command `npm run dev`

### Branching

- `main`- latest release version
- `dev` - latest unstable changes
- `release/v0.0.0` - release based branches

`dev` branch also includes version tags for better navigation on git tree  
It's a not default flow used in applications development, and may be changed in future

### Building

`npm run build` - in your project folder will be created release/v... folder, where tou can find all built packages. Application building can take a time. Wait for finish.  
At this moment you can build [AppImage package](https://appimage.org/) without installer and other things.  
You can use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) for better system integration

### Download OpenVPN 3 GUI

`in progress`

### How to use It?

1. Instal [OpenVPN 3 Client for Linux](https://openvpn.net/cloud-docs/owner/connectors/connector-user-guides/openvpn-3-client-for-linux.html)
2. Build executable AppImage package or run application in development mode from root
3. Run package, import configuration file and press "connect"

### Known issues

This app written for 4 evenings in free time and have some issues

#### Bugs:

1. When you change tabs in Dashboard when connection in progress and return - all "connect" buttons will be disabled and progress icon hidden. Solution - move processingItem state in 1 level to top.
2. Dashboard => Imported Configs => Connect try connect with config to server with no response => Endless connection state. Reason: no error handler. Temp solution: restart the app, go to "Non imported" tab and press "Disconnect" or open terminal, find this connection with `openvpn3 sessions-list`, copy the path and run command `openvpn3 session-manage --disconnect --path <session_path>`
3. App Layout => Menu Button - not working, sidebar and navigation between screens not implemented yet.

### Code

1. No logger for back-end
2. No normal error handlers
3. No test coverage
4. No typing for event names in ipcMainHandlers (using constants)
5. Used default config for electron/preload
6. Some code duplications
