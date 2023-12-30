# Gem's Serverpack
This is a simple little modpack for playing around with various mods
## TODO
Currently, we need tooling for interacting with curseforge and modrinth in js.
I plan on working on this and releasing it as npm modules.<br>
We also probably need a better project structure but idrc enough
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
Build dev <br>
`grunt` <br>
Build dist <br>
`grunt dist` <br>
