// priority 2
// This is gonna be awful

ServerEvents.recipes((event) => {
    // Iron Substrate
    event.shaped(Item.of(Substrate.IRON,1), [
        "IbI",
        "bBb",
        "IbI"],
        {
            "I": "minecraft:iron_ingot",
            "b": "minecraft:iron_bars",
            "B": "minecraft:iron_block"
        }
    )
    // Gold Substrate
    event.shaped(Item.of(Substrate.GOLD,1), [
        "ggg",
        "GgG",
        "ggg"],
        {
            "g": "minecraft:gold_ingot",
            "G": "minecraft:gold_block"
        }
    )
    event.shaped(Item.of(Substrate.GOLD,1), [
        "nnn",
        "bBb",
        "nnn"],
        {
            "n": "minecraft:gold_nugget",
            "b": "minecraft:gold_block",
            "B": Substrate.IRON.getIdentifier()
        }
    )
    // Diamond Substrate
    event.shaped(Item.of(Substrate.DIAMOND,1), [
        "dbd",
        "GdG",
        "dbd"],
        {
            "d": "minecraft:diamond",
            "b": "minecraft:iron_bars",
            "G": "minecraft:gold_block"
        }
    )
    event.shaped(Item.of(Substrate.DIAMOND,1), [
        "dbd",
        "bGb",
        "dbd"],
        {
            "d": "minecraft:diamond",
            "b": "minecraft:iron_bars",
            "G": Substrate.GOLD.getIdentifier()
        }
    )
    event.smithing(Substrate.NETHERITE.getIdentifier(),"minecraft:netherite_upgrade_smithing_template", Substrate.DIAMOND.getIdentifier(), "minecraft:netherite_ingot")
    // Kinetic Substrate
    event.recipes.create.mechanical_crafting(Substrate.KINETIC.getIdentifier(),
    [
        "ppppp",
        "svvvs",
        "scncs",
        "sdvds",
        "sppps"
    ],{
        "p": "minecraft:paper",
        "v": Item.VACUUM_TUBE.getIdentifier(),
        "s": "minecraft:stone",
        "d": "create:mechanical_drill",
        "c": "create:large_cogwheel",
        "n": Substrate.NETHERITE.getIdentifier()
    })
    // Mekanised Substrate

    // Reactive Substrate

    // Deep Space Substrate

    // Naquadah Substrate

    // Positronic Substrate
    // Be evil and remove all the easy ae2 circuit recipes
    event.remove([{id:"ae2:inscriber/engineering_processor"},{id:"ae2:inscriber/logic_processor"},{id:"ae2:inscriber/calculation_processor"},{id:"megacells:inscriber/accumulation_processor"}])
    // Replace them with harder recipes
    registerAE2InscriberRecipeTagMiddle(event, "ae2:engineering_processor", [Tags.CIRCUIT_BASIC, "ae2:printed_engineering_processor", "ae2:printed_silicon"])
    registerAE2InscriberRecipeTagMiddle(event, "ae2:logic_processor", [Tags.CIRCUIT_BASIC, "ae2:printed_logic_processor", "ae2:printed_silicon"])
    registerAE2InscriberRecipeTagMiddle(event, "ae2:calculation_processor", [Tags.CIRCUIT_BASIC, "ae2:printed_calculation_processor", "ae2:printed_silicon"])
    registerAE2InscriberRecipeTagMiddle(event, "megacells:accumulation_processor", [Tags.CIRCUIT_BASIC, "megacells:printed_accumulation_processor", "ae2:printed_silicon"])
    // Netherite Substrate
    // Create Vacuum Tube
    event.recipes.create.pressing(Item.SILICA_DUST.getIdentifier(), "minecraft:glass")
    event.recipes.create.pressing(Item.SAND_MOLD.getIdentifier(), "minecraft:sand")
    event.recipes.create.deploying(Item.SILICA_DUST_BUCKET.getIdentifier(), ["minecraft:bucket",Item.SILICA_DUST.getIdentifier()])
    event.recipes.create.filling(MODID + ":liquid_glass_bucket", [Fluid.toBucket(MODID + ":liquid_glass"),"minecraft:bucket"])
    event.recipes.create.filling(Item.GLASS_TUBE.getIdentifier(), [Fluid.toBucket(MODID + ":liquid_glass"),Item.SAND_MOLD.getIdentifier()])
    event.blasting(MODID + ":liquid_glass_bucket",Item.SILICA_DUST_BUCKET.getIdentifier())
    event.recipes.create.sequenced_assembly([
        Item.VACUUM_TUBE.getIdentifier()
    ], Item.GLASS_TUBE.getIdentifier(), [
        event.recipes.createDeploying(Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),[Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),"create:iron_sheet"]),
        event.recipes.createDeploying(Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),[Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),"create:copper_sheet"]),
        event.recipes.createDeploying(Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),[Item.INCOMPLETE_VACUUM_TUBE.getIdentifier(),Item.IRON_FILAMENT.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_VACUUM_TUBE.getIdentifier()).loops(3)
    event.custom({
        type: "createaddition:rolling",
        input: {
            item: "createaddition:iron_wire"
        },
        result: {
            item: Item.IRON_FILAMENT.getIdentifier(),
            count: 2
        }
    })
})
