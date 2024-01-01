# SGJourney Community Pack
This is a simple pack made by members of the SGJourney Community.
Because of FTB Quests we are on curseforge...

## Contributing
You will need to have nodejs and npm.
Then, just run `npm install` to install all the dependencies<br>
After you have done this, you can simply use `grunt build` to build yourself a 
copy of the modpack, then install it into curseforge.<br>

Now, make a file called localConfig.json in your local git repo and add your new instance's path. Here is an example file:
```json
{
    "instanceFolder": "/path/to/curseforge/instances/SGJCommunityPack"
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
