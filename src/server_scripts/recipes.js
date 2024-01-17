// priority 2
// This is gonna be awful

ServerEvents.recipes((event) => {
    // Iron Substrate
    event.shaped(Item.of(Substrate.IRON,1), 
        ["IbI",
        "bBb",
        "IbI"],
        {
            "I": "minecraft:iron_ingot",
            "b": "minecraft:iron_bars",
            "B": "minecraft:iron_block"
        }
    )
    // Gold Substrate
    event.shaped(Item.of(Substrate.GOLD,1), 
        ["ggg",
        "GgG",
        "ggg"],
        {
            "g": "minecraft:gold_ingot",
            "G": "minecraft:gold_block"
        }
    )
    event.shaped(Item.of(Substrate.GOLD,1),
        ["nnn",
        "bBb",
        "nnn"],
        {
            "n": "minecraft:gold_nugget",
            "b": "minecraft:gold_block",
            "B": Substrate.IRON.getIdentifier()
        }
    )
    // Diamond Substrate
    event.shaped(Item.of(Substrate.DIAMOND,1), 
        ["dbd",
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
    // Kinetic Substrate
    event.recipes.create.mechanical_crafting(Substrate.KINETIC.getIdentifier(),
    [   //spell-checker: disable
        "ppppp",
        "svvvs",
        "scncs",
        "sdvds",
        "sppps"
    ],{ //spell-checker: enable
        "p": "minecraft:paper",
        "v": Item.VACUUM_TUBE.getIdentifier(),
        "s": "minecraft:stone",
        "d": "create:mechanical_drill",
        "c": "create:large_cogwheel",
        "n": Substrate.NETHERITE.getIdentifier()
    })
    // Computational Substrate
    event.shaped(Substrate.COMPUTATIONAL.getIdentifier(),[
        "tft",
        "dkd",
        "scs"
    ], {
        "t": "ae2:terminal",
        "f": "ae2:formation_plane",
        "d": "ae2:dense_energy_cell",
        "k": Substrate.KINETIC.getIdentifier(),
        "s": "#ae2:smart_cable",
        "c": "ae2:controller"
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
    registerAE2InscriberRecipeTagMiddle(event, "megacells:accumulation_processor", [Tags.CIRCUIT_ADVANCED, "megacells:printed_accumulation_processor", "ae2:printed_silicon"])
    // Pure Quartz Glass Recipe
    event.recipes.create.sequenced_assembly([Item.WASHED_SILICA_DUST.getIdentifier()], Item.SILICA_DUST.getIdentifier(), [
        event.recipes.createFilling(Item.INCOMPLETE_SILICA_DUST.getIdentifier(), [Fluid.toBucket("minecraft:water"),Item.INCOMPLETE_SILICA_DUST.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_SILICA_DUST.getIdentifier()).loops(32)
    event.recipes.createMixing(Item.IMPURE_QUARTZ_GLASS.getIdentifier(),Item.WASHED_SILICA_DUST.getIdentifier()).heated()
    event.blasting(Item.PURE_QUARTZ_GLASS.getIdentifier(),Item.IMPURE_QUARTZ_GLASS.getIdentifier())
    // PCB Substrate recipe
    registerAE2InscriberRecipe(event, Item.PCB_SUBSTRATE.getIdentifier(), [Item.PURE_QUARTZ_GLASS.getIdentifier(), "create:copper_sheet","create:copper_sheet"])
    // Phosphorus
    event.blasting(Item.PHOSPHORUS.getIdentifier(),Blocks.Phosphorite.getIdentifier())
    // Mekanism
    event.remove({id:"mekanism:metallurgic_infuser"})
    event.shaped("mekanism:metallurgic_infuser", [
        "ifi",
        "bob",
        "ifi"
    ], {
        i: "minecraft:iron_ingot",
        b: "#"+Tags.CIRCUIT_INTERMEDIATE,
        f: "minecraft:iron_ingot",
        o: "mekanism:ingot_osmium"
    })
    // Yeet the elite and basic control circuit recipes
    event.remove([{'id': "mekanism:control_circuit/basic"},{'id': "mekanism:control_circuit/elite"}])
    // Replace with even harder recipes :)
    registerMetallurgicInfusing(event, {amount: 20, tag: "mekanism:redstone"}, {tag: Tags.CIRCUIT_INTERMEDIATE}, "mekanism:basic_control_circuit")
    registerMetallurgicInfusing(event, {amount: 40, tag: "mekanism:diamond"}, {tag: Tags.CIRCUIT_ADVANCED}, "mekanism:elite_control_circuit")
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
    // Rudimentary Processor
    event.recipes.create.sequenced_assembly([Item.ADDER.getIdentifier()], Item.PURE_QUARTZ_GLASS.getIdentifier(), [
        event.recipes.createDeploying(Item.INCOMPLETE_ADDER.getIdentifier(),[Item.INCOMPLETE_ADDER.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_ADDER.getIdentifier()).loops(8)
    event.recipes.create.sequenced_assembly([Item.XOR.getIdentifier()], "create:iron_sheet", [
        event.recipes.createDeploying(Item.INCOMPLETE_XOR.getIdentifier(),[Item.INCOMPLETE_XOR.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_XOR.getIdentifier()).loops(8)
    event.recipes.create.sequenced_assembly([Item.RSHIFT.getIdentifier()], "create:copper_sheet", [
            event.recipes.createDeploying(Item.INCOMPLETE_RSHIFT.getIdentifier(),[Item.INCOMPLETE_RSHIFT.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_RSHIFT.getIdentifier()).loops(8)
    event.recipes.create.sequenced_assembly([Item.ALU.getIdentifier()], Item.PCB_SUBSTRATE.getIdentifier(), [
            event.recipes.createDeploying(Item.INCOMPLETE_ALU.getIdentifier(),[Item.INCOMPLETE_ALU.getIdentifier(),Item.ADDER.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_ALU.getIdentifier(),[Item.INCOMPLETE_ALU.getIdentifier(),Item.XOR.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_ALU.getIdentifier(),[Item.INCOMPLETE_ALU.getIdentifier(),Item.RSHIFT.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_ALU.getIdentifier(),[Item.INCOMPLETE_ALU.getIdentifier(),Item.PURE_QUARTZ_GLASS.getIdentifier()])
    ]).transitionalItem(Item.INCOMPLETE_ALU.getIdentifier()).loops(1)
    event.recipes.create.sequenced_assembly([Item.CONTROL_UNIT.getIdentifier()], Item.PCB_SUBSTRATE.getIdentifier(), [
        event.recipes.createDeploying(Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),[Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),"minecraft:redstone"]),
        event.recipes.createDeploying(Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),[Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()]),
        event.recipes.createDeploying(Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),[Item.INCOMPLETE_CONTROL_UNIT.getIdentifier(),"createaddition:copper_wire"])
    ]).transitionalItem(Item.CONTROL_UNIT.getIdentifier()).loops(3)
    event.recipes.create.sequenced_assembly([Item.SMALL_CACHE.getIdentifier()], Item.PCB_SUBSTRATE.getIdentifier(), [
            event.recipes.createDeploying(Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),[Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),"createaddition:copper_wire"]),
            event.recipes.createDeploying(Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),[Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),[Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),[Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()]),
            event.recipes.createDeploying(Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),[Item.INCOMPLETE_SMALL_CACHE.getIdentifier(),Item.VACUUM_TUBE.getIdentifier()]),
    ]).transitionalItem(Item.INCOMPLETE_SMALL_CACHE.getIdentifier()).loops(2)
    registerAE2InscriberRecipe(event, Item.RUDIMENTARY_PROCESSOR.getIdentifier(), [Item.CONTROL_UNIT.getIdentifier(),Item.SMALL_CACHE.getIdentifier(),Item.ALU.getIdentifier()])
    // Ad Astra
    event.shaped(Item.of(Item.RCU,1),[
        "SSS",
        "CCC",
        "RRR"],
        {
            S: "#forge:storage_blocks/steel",
            C: "#"+Tags.CIRCUIT_INTERMEDIATE,
            R: "ad_astra:iron_rod"
        })
    // Remove easy rocket engines
    event.remove("ad_astra:recipes/steel_engine")
    event.remove("ad_astra:recipes/desh_engine")
    event.remove("ad_astra:recipes/ostrum_engine")
    event.remove("ad_astra:recipes/calorite_engine")
    // Add hard engines
    event.shaped(Item.of("ad_astra:steel_engine",1),[
        "SSS",
        "ECE",
        " F "],
        {
            S: "#forge:plates/steel",
            C: Item.RCU.getIdentifier(),
            E: "ad_astra:engine_frame",
            F: "ad_astra:engine_fan"
        })
    event.shaped(Item.of("ad_astra:desh_engine",1),[
        "SSS",
        "ECE",
        " F "],
        {
            S: "#forge:plates/desh",
            C: Item.RCU.getIdentifier(),
            E: "ad_astra:engine_frame",
            F: "ad_astra:engine_fan"
        })
    event.shaped(Item.of("ad_astra:ostrum_engine",1),[
        "SSS",
        "ECE",
        " F "],
        {
            S: "#forge:plates/ostrum",
            C: Item.RCU.getIdentifier(),
            E: "ad_astra:engine_frame",
            F: "ad_astra:engine_fan"
        })
    event.shaped(Item.of("ad_astra:calorite_engine",1),[
        "SSS",
        "ECE",
        " F "],
        {
            S: "#forge:plates/calorite",
            C: Item.RCU.getIdentifier(),
            E: "ad_astra:engine_frame",
            F: "ad_astra:engine_fan"
        })
    // Computercraft
    event.remove([
        {id: "computercraft:computer_normal"},
        {id: "computercraft:computer_advanced"},
        {id: "computercraft:pocket_computer_normal"},
        {id: "computercraft:pocket_computer_advanced"},
    ])
    event.shaped("computercraft:computer_normal",[
        "sss",
        "scs",
        "sgs"
    ], {
        "s": "#balm:stones",
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "g": "#forge:glass_panes"
    })
    event.shaped("computercraft:computer_advanced",[
        "sss",
        "scs",
        "sgs"
    ], {
        "s": "minecraft:gold_ingot",
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "g": "#forge:glass_panes"
    })
    event.shaped("computercraft:pocket_computer_normal",[
        "scs",
        "sas",
        "sgs"
    ], {
        "s": "#balm:stones",
        "a": "minecraft:golden_apple",
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "g": "#forge:glass_panes"
    })
    event.shaped("computercraft:pocket_computer_advanced",[
        "scs",
        "sas",
        "sgs"
    ], {
        "s": "minecraft:gold_ingot",
        "a": "minecraft:golden_apple",
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "g": "#forge:glass_panes"
    })
    // AE2WTLIB
    event.remove({id:"ae2wtlib:quantum_bridge_card"})
    // SgJourney
    event.remove({id: "sgjourney:basic_interface"})
    event.remove({id: "sgjourney:reaction_chamber"})
    event.shaped("sgjourney:reaction_chamber",[
        "cnc",
        "nbn",
        "cnc"
    ],{
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "n": "sgjourney:naquadah_alloy",
        "b": "minecraft:blaze_powder"
    })
    event.shaped("sgjourney:basic_interface",[
        "gii",
        "cuu",
        "gii"
    ],{
        "c": "#"+ Tags.CIRCUIT_INTERMEDIATE,
        "i": "minecraft:iron_ingot",
        "g": "minecraft:gold_ingot",
        "u": "minecraft:copper_ingot"
    })
})
