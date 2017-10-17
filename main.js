const { app, electron, BrowserWindow } = require("electron");
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on('update-downloaded', (ev, info) => {
	// Wait 5 seconds, then quit and install
	// In your application, you don't need to wait 5 seconds.
	// You could call autoUpdater.quitAndInstall(); immediately
	setTimeout(function () {
		autoUpdater.quitAndInstall();
	}, 5000)
});

autoUpdater.checkForUpdates();

app.on('ready', function () {

	var mainWindow = new BrowserWindow({
		name: "ea-todo",
		width: 400,
		height: 600,
		toolbar: false,
		show: true
	});

	mainWindow.loadURL("http://google.com");

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

app.on('error', function () {
	app.exit();
});