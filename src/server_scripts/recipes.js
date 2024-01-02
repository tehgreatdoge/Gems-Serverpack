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
    // Netherite Substrate
    event.smithing(Substrate.NETHERITE.getIdentifier(),"minecraft:netherite_upgrade_smithing_template", Substrate.DIAMOND.getIdentifier(), "minecraft:netherite_ingot")
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
