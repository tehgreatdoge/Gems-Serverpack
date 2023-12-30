// priority: 1

// Visit the wiki for more info - https://kubejs.com/

console.info('Loading Startup Scripts')

Platform.mods.kubejs.name = "Gem's Server"

// Register substrates
for (let key in Substrate) {
    let substrate = Substrate[key]
    console.log(key)
    console.log(substrate)
    StartupEvents.registry("block", (event) => {
        event.create(substrate.getIdentifier()) // Create a new block
        .displayName(substrate.getName()) // Set a custom name
        .mapColor("metal") // Set a material (affects the sounds and some properties)
        .soundType("metal")
        .hardness(1.0) // Set hardness (affects mining time)
        .resistance(1.0) // Set resistance (to explosions, etc)
        .tagBoth("gems_server:substrates") // Tag the block and item
        .requiresTool(true) // Requires a tool or it won't drop (see tags below)
        .tagBlock("mineable/pickaxe") // or a pickaxe
        .tagBlock('minecraft:needs_iron_tool') // the tool tier must be at least iron
    })
}


global.MODID = "gems_server"

console.info('Loaded Startup Scripts')
