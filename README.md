# SGJourney Community Pack
This is a simple pack made by members of the SGJourney Community.
Everything is developed on modrinth and then ported over for other platforms.

## About Launchers other than Modrinth for Development
If you are using a launcher other than modrinth, you will need to manually keep your modlist in sync.
If your launcher supports importing modrinth packs, that is as simple as building dist, and then importing the resulting pack.
If it doesn't you will need to manually update mod versions (have fun ig)

## Contributing
You will need to have nodejs and npm.
Then, just run `npm install` to install all the dependencies<br>
After you have done this, you can simply use `grunt build` to build yourself a 
copy of the modpack, then install it into your favorite modrinth-supporting launcher.<br>
> Note: If you don't use modrinth, you will have to manually update after modlist changes

Now, make a file called localConfig.json in your local git repo and add your new instance's path. Here is an example file:
```json
{
    "instanceFolder": "/path/to/your/development/minecraft/instance"
}
```
This will tell the build tools where to make changes after you build dev (`grunt`)
## Building
You have to build after every change to a kubejs file<br>
`grunt` <br>
This uses babel to build the scripts in /src and copy/symlink all the relevant files
to the instanceFolder defined in localConfig.json<br>
`grunt build` <br>
This uses babel to build the scripts, and then copies all the files to /dist.
Config files are filtered by .gitignore
