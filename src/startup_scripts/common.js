// priority: 10
// This file is automatically shared amongst the server and startup scripts
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
var MODID = "sgcommunity_pack"
var Tags = {
    CIRCUIT: MODID+":circuit",
    CIRCUIT_BASIC: MODID+":circuit_basic",
    CIRCUIT_INTERMEDIATE: MODID+":circuit_intermediate",
    CIRCUIT_ADVANCED: MODID+":circuit_advanced",
}

class Substrate {
    static IRON = new Substrate("iron_substrate", "Iron Substrate")
    static GOLD = new Substrate("gold_substrate", "Gold Substrate")
    static DIAMOND = new Substrate("diamond_substrate", "Diamond Substrate")
    static NETHERITE = new Substrate("netherite_substrate", "Netherite Substrate")
    static KINETIC = new Substrate("kinetic_substrate", "Kinetic Substrate")
    static COMPUTATIONAL = new Substrate("computational_substrate", "Computational Substrate", {lightLevel: 0.5})
    static MEKANISED = new Substrate("mekanised_substrate", "Mekanised Substrate")
    static REACTIVE = new Substrate("reactive_substrate", "Reactive Substrate")
    static DEEP_SPACE = new Substrate("deep_space_substrate", "Deep Space Substrate")
    static NAQUADRIA = new Substrate("naquadria_substrate", "Naquadria Substrate")
    static POSITRONIC = new Substrate("positronic_substrate", "Positronic Substrate")
    constructor(identifier, name, builderOptions) {
        this.name = name
        this.identifier = identifier
        this.builderOptions = builderOptions ?? {}
    }
    getName() {
        return this.name
    }
    getIdentifier() {
        return MODID + ":"+this.identifier
    }
}
class Item {
    // Vacuum Tube
    static INCOMPLETE_VACUUM_TUBE = new Item("incomplete_vacuum_tube","Incomplete Vacuum Tube", { itemType: "create:sequenced_assembly"})
    static VACUUM_TUBE = new Item("vacuum_tube","Vacuum Tube", {tags: [Tags.CIRCUIT_BASIC, Tags.CIRCUIT]})
    static GLASS_TUBE = new Item("glass_tube","Glass Tube")
    static SILICA_DUST = new Item("silica_dust","Silica Dust")
    static SILICA_DUST_BUCKET = new Item("silica_dust_bucket","Silica Dust Bucket", {stackSize: 1})
    static SAND_MOLD = new Item("sand_mold","Sand Mold")
    static IRON_FILAMENT = new Item("iron_filament", "Iron Filament")
    static INTERMEDIATE_TEST_CIRCUIT = new Item("intermediate_test_circuit", "test circuit I", {tags: [Tags.CIRCUIT_INTERMEDIATE, Tags.CIRCUIT]})
    // Pure quartz glass
    static INCOMPLETE_SILICA_DUST = new Item("incomplete_washed_silica_dust", "Incomplete Washed Silica Dust", { itemType: "create:sequenced_assembly"})
    static WASHED_SILICA_DUST = new Item("washed_silica_dust", "Washed Silica Dust")
    static IMPURE_QUARTZ_GLASS = new Item("impure_quartz_glass", "Impure Quartz Glass")
    static PURE_QUARTZ_GLASS = new Item("pure_quartz_glass", "Pure Quartz Glass")
    // PCB Substrate
    static PCB_SUBSTRATE = new Item("pcb_substrate", "PCB Substrate")
    // Rudimentary Processor
    static ADDER = new Item("adder", "8 Bit Adder")
    static INCOMPLETE_ADDER = new Item("incomplete_adder", "Incomplete 8 Bit Adder", { itemType: "create:sequenced_assembly"})
    static XOR = new Item("xor", "8 Bit XOR")
    static INCOMPLETE_XOR = new Item("incomplete_xor", "Incomplete 8 Bit XOR", { itemType: "create:sequenced_assembly"})
    static RSHIFT = new Item("rshift", "8 Bit RShift")
    static INCOMPLETE_RSHIFT = new Item("incomplete_rshift", "Incomplete 8 Bit RShift", { itemType: "create:sequenced_assembly"})
    static ALU = new Item("alu", "ALU")
    static INCOMPLETE_ALU = new Item("incomplete_alu", "Incomplete ALU", { itemType: "create:sequenced_assembly"})
    static CONTROL_UNIT = new Item("control_unit", "Control Unit")
    static INCOMPLETE_CONTROL_UNIT = new Item("incomplete_control_unit", "Incomplete Control Unit", { itemType: "create:sequenced_assembly"})
    static SMALL_CACHE = new Item("small_cache", "Small Cache")
    static INCOMPLETE_SMALL_CACHE = new Item("incomplete_small_cache", "Incomplete Small Cache", { itemType: "create:sequenced_assembly"})

    static RUDIMENTARY_PROCESSOR = new Item("rudimentary_processor", "Rudimentary Processor",  {tags: [Tags.CIRCUIT_INTERMEDIATE, Tags.CIRCUIT]})
    // Computation Parts
    // static RAM = new Item("ram", "RAM")
    // static INCOMPLETE_RAM = new Item("incomplete_ram", "Incomplete RAM", { itemType: "create:sequenced_assembly"})
    // static BASIC_COMPUTATION_UNIT = new Item("basic_computation_unit", "Basic Computation Unit")
    // static INCOMPLETE_BASIC_COMPUTATION_UNIT = new Item("incomplete_basic_computation_unit", "Incomplete Basic Computation Unit", { itemType: "create:sequenced_assembly"})
    // Ad Astra
    static RCU = new Item("rocket_control_unit","Rocket Control Unit")
    constructor(identifier, name, builderOptions) {
        this.name = name
        this.identifier = identifier
        this.builderOptions = builderOptions ?? {}
        this.builderOptions.tags ??= []
    }
    getName() {
        return this.name
    }
    getIdentifier() {
        return MODID+ ":" +this.identifier
    }
    static of(item, count = 1) {
        if (item instanceof Item) {
            item = item.getIdentifier()
        }
        else if(item instanceof Substrate) {
            item = item.getIdentifier()
        }
        else if (typeof item == "object") {
            return { item:item.item, count: count}
        }
        return {item: item, count: count}
    }
}
class Fluid {
    static toBucket(fluid) {
        if (typeof fluid == "string") {
            return({"fluid": fluid, "amount":1000})
        }
        else {
            fluid.amount = 1000
            return (fluid)
        }
    }
    static toAmount(fluid,amount) {
        if (typeof fluid == "string") {
            return({"fluid": fluid, "amount":amount})
        }
        else {
            fluid.amount = amount
            return (fluid)
        }
    }
}
class Tier {
    static IRON = new Tier(Substrate.IRON, {coal: 1, copper: 1, iron: 1})
    static GOLD = new Tier(Substrate.GOLD, {coal: 2, copper: 2, iron: 2, gold: 1})
    static DIAMOND = new Tier(Substrate.DIAMOND, {coal: 2, copper: 2, iron: 2, gold: 2, diamond: 0.5, lapis: 0.5, redstone: 0.5})
    // All tiers after this require the previous tier to craft
    static NETHERITE = new Tier(Substrate.NETHERITE, {coal: 4, copper: 4, iron: 2, gold: 2, diamond: 1, ancient_debris: 0.25, lapis: 1, redstone: 1, emerald: 0.5})
    static KINETIC = new Tier(Substrate.KINETIC, {coal: 4, copper: 4, iron: 4, gold: 2, diamond: 2, ancient_debris: 0.5, lapis: 2, redstone: 2, emerald: 1, certus:1, nether_quartz: 1})
    static COMPUTATIONAL = new Tier(Substrate.COMPUTATIONAL, {coal: 4, iron: 4, gold: 4, diamond: 3, ancient_debris: 1, lapis: 3, redstone: 3, emerald: 1, certus:2, nether_quartz: 2})
    // Now we begin the hard tiers (e.g., the substrate made with osmium doesn't give osmium)
    static MEKANISED = new Tier(Substrate.MEKANISED, {coal: 4, copper: 4, iron: 4, gold: 4, diamond: 4, ancient_debris: 2, lapis: 4, redstone: 4, emerald: 2, certus:2, nether_quartz: 2, fluix:1})
    static REACTIVE = new Tier(Substrate.REACTIVE, {coal: 4, copper: 4, iron: 4, gold: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 4, emerald: 2, certus:3, nether_quartz: 3, fluix:1, osmium:1})
    static DEEP_SPACE = new Tier(Substrate.DEEP_SPACE, {coal: 4, copper: 4, iron: 4, gold: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 4, emerald: 4, certus:4, nether_quartz: 4, fluix:2, osmium:2, tin:1, lead: 1})
    static NAQUADRIA = new Tier(Substrate.REACTIVE, {coal: 8, copper: 8, iron: 8, gold: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 8, emerald: 4, certus: 4, nether_quartz: 4, fluix:4, osmium:4, tin:2, lead: 2, fluorine:1, uranium: 1})
    static POSITRONIC = new Tier(Substrate.POSITRONIC, {coal: 16, copper: 8, iron: 8, gold: 8, diamond: 8, ancient_debris: 8, lapis: 8, redstone: 16, emerald: 4, certus: 8, nether_quartz: 8, fluix:8, osmium:8, tin:4, lead: 4, fluorine:4, uranium: 4, naquadah: 1})
    constructor(substrate, materials) {
        this.substrate = substrate
        this.materials = materials
    }
}
var Materials = {
    coal: {
        item: "minecraft:coal",
        display: "minecraft:coal_ore",
        drops: [{"item": "minecraft:coal",min:2, max:3}]
    },
    copper: {
        item: "minecraft:copper_ingot",
        display: "minecraft:copper_ore",
        drops: [{"item": "minecraft:raw_copper",min:2, max:3}]
    },
    iron: {
        item: "minecraft:iron_ingot",
        display: "minecraft:iron_ore",
        drops: [{"item": "minecraft:raw_iron",min:2, max:3}]
    },
    gold: {
        item: "minecraft:gold_ingot",
        display: "minecraft:gold_ore",
        drops: [{"item": "minecraft:raw_gold",min:2, max:3}]
    },
    diamond: {
        item: "minecraft:diamond",
        display: "minecraft:diamond_ore",
        drops: [{"item": "minecraft:diamond",min:2, max:3}]
    },
    ancient_debris: {
        item: "minecraft:netherite_ingot",
        display: "minecraft:ancient_debris",
        drops: [{"item": "minecraft:ancient_debris",min:2, max:3}]
    },
    lapis: {
        item: "minecraft:lapis_lazuli",
        display: "minecraft:lapis_ore",
        drops: [{"item": "minecraft:lapis_lazuli",min:2, max:3}]
    },
    redstone: {
        item: "minecraft:redstone",
        display: "minecraft:redstone_ore",
        drops: [{"item": "minecraft:redstone",min:2, max:3}]
    },
    emerald: {
        item: "minecraft:emerald",
        display: "minecraft:emerald_ore",
        drops: [{"item": "minecraft:emerald",min:2, max:3}]
    },
    certus: {
        item: "ae2:charged_certus_quartz_crystal",
        display: "ae2:quartz_cluster",
        drops: [{"item": "ae2:certus_quartz_crystal",min:2, max:3}]
    },
    nether_quartz: {
        item: "minecraft:quartz",
        display: "minecraft:nether_quartz_ore",
        drops: [{"item": "minecraft:quartz",min:2, max:3}]
    },
    fluix: {
        item: "ae2:fluix_crystal",
        display: "ae2:fluix_block",
        drops: [{"item": "ae2:fluix_crystal",min:2, max:3}]
    },
    osmium: {
        item: "mekanism:ingot_osmium",
        display: "mekanism:osmium_ore",
        drops: [{"item": "mekanism:raw_osmium",min:2, max:3}]
    },
    tin: {
        item: "mekanism:ingot_tin",
        display: "mekanism:tin_ore",
        drops: [{"item": "mekanism:raw_tin",min:2, max:3}]
    },
    lead: {
        item: "mekanism:ingot_lead",
        display: "mekanism:lead_ore",
        drops: [{"item": "mekanism:raw_lead",min:2, max:3}]
    },
    fluorine: {
        item: "mekanism:fluorite_gem",
        display: "mekanism:fluorite_ore",
        drops: [{"item": "mekanism:fluorite_gem",min:2, max:3}]
    },
    uranium: {
        item: "mekanism:ingot_lead",
        display: "mekanism:lead_ore",
        drops: [{"item": "mekanism:raw_lead",min:2, max:3}]
    },
    naquadah: {
        item: "sgjourney:pure_naquadah",
        display: "sgjourney:naquadah_ore",
        drops: [{"item": "sgjourney:raw_naquadah",min:2, max:3}]
    },
}
