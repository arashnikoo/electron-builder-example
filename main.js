const { app, electron, BrowserWindow, dialog } = require("electron");
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on('update-downloaded', (ev, info) => {
	// Wait 5 seconds, then quit and install
	// In your application, you don't need to wait 5 seconds.
	// You could call autoUpdater.quitAndInstall(); immediately	
});

autoUpdater.on('checking-for-update', (ev, info) => {

});

app.on('ready', function () {

	var mainWindow = new BrowserWindow({
		name: "ea-todo",
		width: 400,
		height: 600,
		toolbar: false,
		show: true
	});

	autoUpdater.on('update-available', (ev, info) => {
		dialog.showMessageBox(mainWindow, {
			type: "question",
			buttons: ["Yes", "No"],
			message: "A new version is avalable, would you like to install it now?"
		}, (response) => {
			if (response == 0) {
				autoUpdater.quitAndInstall();
			}
		});
	});

	mainWindow.loadURL("http://google.com");

	mainWindow.on('closed', function () {
		mainWindow = null;
		app.exit();
	});

	autoUpdater.checkForUpdates();
});

app.on('error', function () {
	app.exit();
});