// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Loading Startup Scripts')

// Register substrates

StartupEvents.registry("block", (event) => {
    for (let key in Substrate) {
        let substrate = Substrate[key]
        event.create(substrate.getIdentifier()) // Create a new block
            .displayName(substrate.getName()) // Set a custom name
            .mapColor("metal") // Set a material (affects the sounds and some properties)
            .soundType("metal")
            .hardness(1.0) // Set hardness (affects mining time)
            .resistance(1.0) // Set resistance (to explosions, etc)
            .lightLevel(substrate.builderOptions.lightLevel ?? 0)
            .tagBoth(MODID+"substrates") // Tag the block and item
            .requiresTool(true) // Requires a tool or it won't drop (see tags below)
            .tagBlock("mineable/pickaxe") // or a pickaxe
            .tagBlock('minecraft:needs_iron_tool') // the tool tier must be at least iron
    }
})

StartupEvents.registry("item", (event) => {
    for (let e in Item) {
        let item = Item[e]
        let builder
        if (item.builderOptions.itemType) {
            builder = event.create(item.getIdentifier(), item.builderOptions.itemType)
        }
        else {
            builder = event.create(item.getIdentifier())
        }
        for (let tag of item.builderOptions.tags) {
            builder.tag(tag)
        }
        if (item.builderOptions.use) {
            builder.use(item.builderOptions.use)
        }
        item.builderOptions.stackSize ? builder.maxStackSize(item.builderOptions.stackSize) : undefined
        builder.displayName(item.getName())
    }
})
StartupEvents.registry("fluid", (event) => {
    event.create(MODID+":liquid_glass")
        .displayName("Molten Glass")
        .thickTexture(0x0FFCCCC)
        .bucketColor(0xFFCCCC)
})

console.info('Loaded Startup Scripts')
