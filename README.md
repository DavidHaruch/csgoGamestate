## Add Config to CSGO

copy

    gamestate_integration_quickstartguide.cfg

into your csgo/cfg folder, locations for various oses below

* **Windows**

    ```C:\Program Files (x86)\Steam\SteamApps\common\Counter-Strike Global Offensive\csgo\cfg```

* **Ubuntu** (*this may not be completely right*)

    ```~/.local/share/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg```

	For other distros, you probably know what you are doing

* **Mac** (*I've never used a mac so this is just from the internet*)
	
	```/Users/$your_username?/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg```

## Install nodejs

>"Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."

Nodejs allows you to run javascript outside the browser, it is what is used to manage the post requests that CSGO makes to send the data.

The program constructs a simple web server, which processes the requests and hands the data off to the rest of the program to be analysed and used in the rest of the program.

**TL:DR you need to install this!**

* **Windows**

	1. Go to <https://nodejs.org/en/>, download the intstaller, and run.

* **Linux**

	1. I would reccommend [installing from your distro's package manager](https://nodejs.org/en/download/package-manager/), this page summs up almost all distros.
	2. You can also build from source.

* **Mac**

	1. Go to <https://nodejs.org/en/>, download the intstaller, and run.
