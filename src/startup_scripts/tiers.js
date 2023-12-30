// priority: 0
class Substrate {
    static IRON = new Substrate("iron_substrate", "Iron Substrate")
    static GOLD = new Substrate("gold_substrate", "Gold Substrate")
    static DIAMOND = new Substrate("diamond_substrate", "Diamond Substrate")
    static NETHERITE = new Substrate("netherite_substrate", "Netherite Substrate")
    static VACUUM_TUBE = new Substrate("vacuum_tube_substrate", "Vacuum Tube Substrate")
    static COMPUTATIONAL = new Substrate("computational_substrate", "Computational Substrate")
    static MEKANISED = new Substrate("mekanised_substrate", "Mekanised Substrate")
    static REACTIVE = new Substrate("reactive_substrate", "Reactive Substrate")
    static DEEP_SPACE = new Substrate("deep_space_substrate", "Deep Space Substrate")
    static NAQUADRIA = new Substrate("naquadria_substrate", "Naquadria Substrate")
    static POSITRONIC = new Substrate("positronic_substrate", "Positronic Substrate")
    constructor(identifier, name) {
        this.name = name
        this.identifier = identifier
    }
    getName() {
        return this.name
    }
    getIdentifier() {
        return "gems_server:"+this.identifier
    }
}
global.Substrate = Substrate
function Tier(substrate, materials) {
    let newTier = {}
    newTier.materials = materials
}
global.Material = {
    coal: {
        item: "minecraft:coal",
        display: "minecraft:coal_ore",
        drops: [{"item": "minecraft:coal",min:2, max:3}]
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

}

global.tiers = {
    IRON: Tier(Substrate.IRON, {coal: 1, iron: 0.5}),
    GOLD: Tier(Substrate.GOLD, {coal: 2, iron: 1, gold: 0.5}),
    DIAMOND: Tier(Substrate.DIAMOND, {coal: 2, iron: 2, gold: 1, diamond: 0.5, lapis: 0.5, redstone: 0.5}),
    // All tiers after this require the previous tier to craft
    NETHERITE: Tier(Substrate.NETHERITE, {coal: 4, iron: 2, gold: 2, diamond: 1, ancient_debris: 0.25, lapis: 1, redstone: 1}),
    VACUUM_TUBE: Tier(Substrate.VACUUM_TUBE, {coal: 4, iron: 4, gold: 2, diamond: 2, ancient_debris: 0.5, lapis: 2, redstone: 2, certus:1, nether_quartz: 1}),
    COMPUTATIONAL: Tier(Substrate.COMPUTATIONAL, {coal: 4, iron: 4, gold: 4, diamond: 3, ancient_debris: 1, lapis: 3, redstone: 3, certus:2, nether_quartz: 2}),
    // Now we begin the hard tiers (e.g., the substrate made with osmium doesn't give osmium)
    MEKANISED: Tier(Substrate.MEKANISED, {coal: 4, iron: 4, gold: 4, diamond: 4, ancient_debris: 2, lapis: 4, redstone: 4, certus:2, nether_quartz: 2, fluix:1}),
    REACTIVE: Tier(Substrate.REACTIVE, {coal: 4, iron: 4, gold: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 4, certus:3, nether_quartz: 3, fluix:1, osmium:1}),
}
