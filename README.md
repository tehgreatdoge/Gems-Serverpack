# Gem's Serverpack
This is a simple little modpack for playing around with various mods
## TODO
A better project structure but its not too important
## Contributing
You will need to have nodejs and npm, and also `npm install -g grunt`<br>
Then, just run `npm install` to install all the dependencies<br>
After you have done this, you can simply use `grunt build` to build yourself a 
copy of the modpack and install it into your favorite modrinth-supporting launcher.<br>
Now, make a file called localConfig.json and add your new instance. Here is an example file:
```json
{
    "instanceFolder": "path/to/your/development/minecraft/instance"
}
```
## Building
You have to build after every change to a kubejs file<br>
`grunt` <br>
This uses babel to build the scripts in /src and copy/symlink all the relevant files
to the instanceFolder defined in localConfig.json<br>
`grunt build` <br>
This uses babel to build the scripts, and then copies all the files to /dist.
Please make that any modified config files are not git ignored as this will filter by ignore.
## Updating Dev Instance After Modlist Changes
(read todo first)<br>
To update your dev instance after modlist changes you must first build dist and
then you can load the instance into your preferred launcher. (will be improved)
