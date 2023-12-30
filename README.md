# Gem's Serverpack
This is a simple little modpack for playing around with various mods
## TODO
Actually implement the tooling for dev and dist builds<br>
Make tooling for interacting with curseforge and modrinth in js.
I plan on working on this and releasing it as npm modules.<br>
A better project structure but its not too important
## Contributing
You will need to have nodejs and npm, and also `npm install -g grunt`<br>
Then, just run `npm install` to install all the dependencies<br>
Now, make a file called localConfig.json. Here is an example file:
```json
{
    "instanceFolder": "path/to/your/development/minecraft/instance"
}
```
## Building
`grunt` <br>
This will use babel to build the scripts in /src and copy all the relevant files
to the instanceFolder defined in localConfig.json<br>
`grunt dist` <br>
This will use babel to build the scripts in /src, copy all the relevant files
to dist/curseforge and dist/modrinth, and make the appropriate platform-specific
changes
