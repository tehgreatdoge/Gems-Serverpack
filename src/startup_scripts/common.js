// priority: 10
// This file is automatically shared amongst the server and startup scripts
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
    static ADVANCED_TEST_CIRCUIT = new Item("advanced_test_circuit", "test circuit III", {tags: [Tags.CIRCUIT_ADVANCED, Tags.CIRCUIT]})
    // Pure quartz glass
    static INCOMPLETE_SILICA_DUST = new Item("incomplete_washed_silica_dust", "Incomplete Washed Silica Dust", { itemType: "create:sequenced_assembly"})
    static WASHED_SILICA_DUST = new Item("washed_silica_dust", "Washed Silica Dust")
    static IMPURE_QUARTZ_GLASS = new Item("impure_quartz_glass", "Impure Quartz Glass")
    static PURE_QUARTZ_GLASS = new Item("pure_quartz_glass", "Pure Quartz Glass")
    // PCB Substrate
    // static PCB_SUBSTRATE = new Item("pcb_substrate", "PCB Substrate")
    static ADVANCED_PCB_SUBSTRATE = new Item("advanced_pcb_substrate", "PCB Substrate")
    // Silicon Wafers
    static PHOSPHORUS = new Item("phosphorus", "Phosphorus", {tags: ["forge:phosphorus"]})
    // Rudimentary Processor
    // static ADDER = new Item("adder", "8 Bit Adder")
    // static INCOMPLETE_ADDER = new Item("incomplete_adder", "Incomplete 8 Bit Adder", { itemType: "create:sequenced_assembly"})
    // static XOR = new Item("xor", "8 Bit XOR")
    // static INCOMPLETE_XOR = new Item("incomplete_xor", "Incomplete 8 Bit XOR", { itemType: "create:sequenced_assembly"})
    // static RSHIFT = new Item("rshift", "8 Bit RShift")
    // static INCOMPLETE_RSHIFT = new Item("incomplete_rshift", "Incomplete 8 Bit RShift", { itemType: "create:sequenced_assembly"})
    static ALU = new Item("alu", "ALU")
    static INCOMPLETE_ALU = new Item("incomplete_alu", "Incomplete ALU", { itemType: "create:sequenced_assembly"})
    static CONTROL_UNIT = new Item("control_unit", "Control Unit")
    static INCOMPLETE_CONTROL_UNIT = new Item("incomplete_control_unit", "Incomplete Control Unit", { itemType: "create:sequenced_assembly"})
    // static SMALL_CACHE = new Item("small_cache", "Small Cache")
    // static INCOMPLETE_SMALL_CACHE = new Item("incomplete_small_cache", "Incomplete Small Cache", { itemType: "create:sequenced_assembly"})

    static RUDIMENTARY_PROCESSOR = new Item("rudimentary_processor", "Rudimentary Processor",  {tags: [Tags.CIRCUIT_INTERMEDIATE, Tags.CIRCUIT]})
    // Photomasks
    //static FET_PHOTOMASK = new Item("mosfet_photomask", "MOSFET Photomask")
    static IC_PHOTOMASK = new Item("integrated_circuit_photomask", "Integrated Circuit Photomask")
    static EP_PHOTOMASK = new Item("edible_processor_photomask", "Edible Processor Photomask")
    static ISO_PHOTOMASK= new Item("isotopic_decay_oscillator_photomask", "Isotopic Decay Oscillator Photomask")
    // Mekanism Era Tier I
    static SILICON_BOULE = new Item("silicon_boule", "Silicon Boule")
    static SILICON_WAFER = new Item("silicon_wafer", "Silicon Wafer")
    static INCOMPLETE_MOSFET_WAFER = new Item("incomplete_mosfet_wafer", "Incomplete MOSFET Wafer")
    static MOSFET_WAFER = new Item("mosfet_wafer", "MOSFET Wafer")
    static MOSFET_CHIP = new Item("mosfet_chip", "MOSFET Chip")
    static MOSFET = new Item("mosfet", "MOSFET", {tags: [Tags.CIRCUIT_BASIC, Tags.CIRCUIT]})
    // Mekanism Era Tier II
    static INCOMPLETE_IC = new Item("incomplete_integrated_circuit_wafer", "Incomplete Integrated Circuit Wafer")
    static INTEGRATED_CIRCUIT_WAFER = new Item("integrated_circuit_wafer", "Integrated Circuit Wafer")
    static INTEGRATED_CIRCUIT_CHIP = new Item("integrated_circuit_chip", "Integrated Circuit Chip")
    static INTEGRATED_CIRCUIT = new Item("integrated_circuit", "Integrated Circuit", {tags: [Tags.CIRCUIT_INTERMEDIATE, Tags.CIRCUIT]})
    //====MEKANISM ERA TIER III===\\
    // Edible Processor
    static KELP_ASH = new Item("kelp_ash", "Kelp Ash")
    static SODIUM_BICARBONATE = new Item("sodium_bicarbonate", "Baking Soda")
    static WAFER_DOUGH = new Item("wafer_dough","Wafer Dough")
    static WAFER = new Item("wafer","Wafer", {food: (foodBuilder) => {foodBuilder.hunger(5).saturation(1)}})
    static INCOMPLETE_EDIBLE_PROCESSOR_WAFER = new Item("incomplete_edible_processor_wafer","Incomplete Edible Processor Wafer", {food: (foodBuilder) => {foodBuilder.hunger(5).saturation(1)}})
    static EDIBLE_PROCESSOR_WAFER = new Item("edible_processor_wafer","Edible Processor Wafer", {food: (foodBuilder) => {foodBuilder.hunger(10).saturation(3)}})
    static EDIBLE_PROCESSOR_CHIP = new Item("edible_processor_chip","Edible Processor Chip", {food: (foodBuilder) => {foodBuilder.hunger(5).saturation(2)}})
    static EDIBLE_PROCESSOR = new Item("edible_processor","Edible Processor", {food: (foodBuilder) => {foodBuilder.hunger(9).saturation(2)}})
    // Isotopic Decay Oscillator (terrible name)
    static URANIUM_WAFER = new Item("uranium_wafer", "Uranium Wafer")
    static INCOMPLETE_ISOTOPIC_DECAY_OSCILLATOR_WAFER = new Item("incomplete_isotopic_decay_oscillator_wafer", "Incomplete Isotopic Decay Oscillator Wafer")
    static ISOTOPIC_DECAY_OSCILLATOR_WAFER = new Item("isotopic_decay_oscillator_wafer", "Isotopic Decay Oscillator Wafer")
    static ISOTOPIC_DECAY_OSCILLATOR_CHIP = new Item("isotopic_decay_oscillator_chip", "Isotopic Decay Oscillator Chip")
    static ISOTOPIC_DECAY_OSCILLATOR = new Item("isotopic_decay_oscillator", "Isotopic Decay Oscillator")

    // RAM Stick (read: RESOURCE AMPLIFICATION and MULTIPLICATION stick)
    // static RAM_PHOTOMASK = new Item("ram_module_photomask", "RAM Module Photomask")
    // static INCOMPLETE_RAM_MODULE_WAFER = new Item("incomplete_ram_module_wafer","Incomplete RAM Module Wafer")
    // static RAM_MODULE_WAFER = new Item("ram_module_wafer","RAM Module Wafer")
    // static RAM_MODULE_CHIP = new Item("ram_module_chip","RAM Module Chip")
    // static RAM_MODULE = new Item("ram_module","RAM Module")
    // static RAM_PCB = new Item("ram_pcb","RAM PCB")
    // static RAM_STICK = new Item("ram_stick","RAM Stick")
    
    // Computation Processor (totally not an excuse for resource multiplication)
    // static COMPUTATION_PROCESSOR_PHOTOMASK = new Item("computation_processor_photomask", "Computation Processor Photomask")
    // static INCOMPLETE_COMPUTATION_PROCESSOR = new Item("incomplete_computation_processor_wafer", "Incomplete Computation Processor Wafer")
    // static COMPUTATION_PROCESSOR_WAFER = new Item("computation_processor_wafer", "Computation Processor Wafer")
    // static COMPUTATION_PROCESSOR_CHIP = new Item("computation_processor_chip", "Computation Processor Chip")
    // static COMPUTATION_PROCESSOR = new Item("computation_processor", "Computation Processor")
    
    // Computation Core
    static COMPUTATION_CORE = new Item("computation_core", "Computation Core", {tags: [Tags.CIRCUIT_ADVANCED, Tags.CIRCUIT]})
    static COMPUTATION_CORE_FRAME= new Item("computation_core_frame","Computation Core Frame")
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
    static GOLD = new Tier(Substrate.GOLD, {coal: 2, copper: 2, iron: 2, gold: 1, zinc: 1})
    static DIAMOND = new Tier(Substrate.DIAMOND, {coal: 2, copper: 2, iron: 2, gold: 2, zinc: 1, diamond: 0.5, lapis: 0.5, redstone: 0.5})
    // All tiers after this require the previous tier to craft
    static NETHERITE = new Tier(Substrate.NETHERITE, {coal: 4, copper: 4, iron: 2, gold: 2, zinc: 2, diamond: 1, ancient_debris: 0.5, lapis: 1, redstone: 1, emerald: 0.5})
    static KINETIC = new Tier(Substrate.KINETIC, {coal: 4, copper: 4, iron: 4, gold: 2, zinc: 2, diamond: 2, ancient_debris: 1, lapis: 2, redstone: 2, emerald: 1, certus:1, nether_quartz: 1})
    static COMPUTATIONAL = new Tier(Substrate.COMPUTATIONAL, {coal: 4, iron: 4, gold: 4, zinc: 2, diamond: 3, ancient_debris: 1, lapis: 3, redstone: 3, emerald: 1, certus:2, nether_quartz: 2})
    // Now we begin the hard tiers (e.g., the substrate made with osmium doesn't give osmium)
    static MEKANISED = new Tier(Substrate.MEKANISED, {coal: 4, copper: 4, iron: 4, gold: 4, zinc:4, diamond: 4, ancient_debris: 2, lapis: 4, redstone: 4, emerald: 2, certus:2, nether_quartz: 2, fluix:1})
    static REACTIVE = new Tier(Substrate.REACTIVE, {coal: 4, copper: 4, iron: 4, gold: 4, zinc: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 4, emerald: 2, certus:3, nether_quartz: 3, fluix:1, osmium:1})
    static DEEP_SPACE = new Tier(Substrate.DEEP_SPACE, {coal: 4, copper: 4, iron: 4, gold: 4, zinc: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 4, emerald: 4, certus:4, nether_quartz: 4, fluix:2, osmium:2, tin:1, lead: 1, borax: 1})
    static NAQUADRIA = new Tier(Substrate.REACTIVE, {coal: 8, copper: 8, iron: 8, gold: 4, zinc: 4, diamond: 4, ancient_debris: 4, lapis: 4, redstone: 8, emerald: 4, certus: 4, nether_quartz: 4, fluix:4, osmium:4, tin:2, lead: 2, borax: 2, fluorine:1, uranium: 1})
    static POSITRONIC = new Tier(Substrate.POSITRONIC, {coal: 16, copper: 8, iron: 8, gold: 8, zinc: 8, diamond: 8, ancient_debris: 8, lapis: 8, redstone: 16, emerald: 4, certus: 8, nether_quartz: 8, fluix:8, osmium:8, tin:4, lead: 4, borax: 3, fluorine:4, uranium: 4, naquadah: 2})
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
    zinc: {
        item: "create:zinc_ingot",
        display: "create:zinc_ore",
        drops: [{"item": "create:raw_zinc",min:2, max:3}]
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
    borax: {
        item: MODID + ":borax",
        display: MODID + ":borax",
        drops: [{"item": MODID + ":borax",min:2, max:3}]
    },
    fluorine: {
        item: "mekanism:fluorite_gem",
        display: "mekanism:fluorite_ore",
        drops: [{"item": "mekanism:fluorite_gem",min:2, max:3}]
    },
    uranium: {
        item: "mekanism:ingot_uranium",
        display: "mekanism:uranium_ore",
        drops: [{"item": "mekanism:raw_uranium",min:2, max:3}]
    },
    naquadah: {
        item: "sgjourney:pure_naquadah",
        display: "sgjourney:naquadah_ore",
        drops: [{"item": "sgjourney:raw_naquadah",min:2, max:3}]
    },
}
class ToolType {
    static PICKAXE = new ToolType("mineable/pickaxe")
    static SHOVEL = new ToolType("mineable/shovel")
    constructor(identifier) {
        this.identifier = identifier
    }
    getIdentifier() {
        return this.identifier
    }
}
class ToolTier {
    static IRON = new ToolTier("minecraft:needs_iron_tool")
    static DIAMOND = new ToolTier("minecraft:needs_diamond_tool")
    constructor(identifier) {
        this.identifier = identifier
    }
    getIdentifier() {
        return this.identifier
    }
}
class MaterialType {
    static STONE = new MaterialType("stone", "stone")
    static DIRT = new MaterialType("gravel", "dirt")
    constructor(sound, color) {
        this.sound = sound
        this.color = color
    }
    getSound() {
        return this.sound
    }
    getMapColor() {
        return this.mapColor
    }
}
class Block {
    _blockTags = []
    _itemTags = []
    _hardness = 1
    _blastResistance = 1
    _lightLevel = 0
    _requiresTool = false
    _mapColor = "grass"
    _soundType = "grass"
    constructor(identifier, name) {
        this.identifier = identifier
        this.name = name
    }
    tagBlock(tag) {
        this._blockTags.push(tag)
        return this
    }
    tagItem(tag) {
        this._itemTags.push(tag)
        return this
    }
    tagBoth(tag) {
        this.tagBlock(tag)
        this.tagItem(tag)
        return this
    }
    material(materialType) {
        this._soundType = materialType.getSound()
        this._mapColor = materialType.getMapColor()
        return this
    }
    hardness(hardness) {
        this._hardness = hardness
        return this
    }
    blastResistance(blastResistance) {
        this._blastResistance = blastResistance
        return this
    }
    lightLevel(lightLevel) {
        this._lightLevel = lightLevel
        return this
    }
    requiresTool(requiresTool) {
        this._requiresTool = requiresTool
        return this
    }
    requireTier(toolTier) {
        this.tagBlock(toolTier.getIdentifier())
        return this
    }
    useTool(toolType) {
        this.tagBlock(toolType.getIdentifier())
        return this
    }
    getDisplayName() {
        return this.name
    }
    getSoundType() {
        return this._soundType
    }
    getMapColor() {
        return this._mapColor
    }
    getIdentifier() {
        return MODID+ ":" + this.identifier
    }
    getHardness() {
        return this._hardness
    }
    getBlastResistance() {
        return this._blastResistance
    }
    getLightLevel() {
        return this._lightLevel
    }
    getRequiresTool() {
        return this._requiresTool
    }
    getBlockTags() {
        return this._blockTags
    }
    getItemTags() {
        return this._itemTags
    }
}
var Blocks = {
    PHOSPHORITE: new Block("phosphorite", "Phosphorite").material(MaterialType.STONE).useTool(ToolType.PICKAXE).requireTier(ToolTier.IRON).tagBoth("forge:ores/phosphorus").tagBoth("forge:ores"),
    BORAX: new Block("borax", "Borax").material(MaterialType.STONE).useTool(ToolType.PICKAXE).requireTier(ToolTier.IRON).tagBoth("forge:ores/borax").tagBoth("forge:ores"),
    COMPOST_FLORAL: new Block("floral_compost", "Floral Compost").material(MaterialType.DIRT).useTool(ToolType.SHOVEL),
    COMPOST_MULCH: new Block("mulch_compost", "Mulch").material(MaterialType.DIRT).useTool(ToolType.SHOVEL),
    COMPOST_ORGANIC: new Block("organic_compost", "Organic Compost").material(MaterialType.DIRT).useTool(ToolType.SHOVEL),
    COMPOST_CORAL: new Block("coral_compost", "Coral Compost").material(MaterialType.DIRT).useTool(ToolType.PICKAXE),
}
class Gas {
    _color = 0x000000
    constructor(identifier, name) {
        this.identifier = identifier
        this.name = name
    }
    color(color) {
        this._color = color
        return this
    }
    getIdentifier() {
        return "mekanism:" + this.identifier
    }
    getDisplayName() {
        return this.name
    }
    getColor() {
        return this._color
    }
}
var Gases = {
    BLAZE_GAS: new Gas("blaze_gas", "Blaze Gas").color(0xF18A22),
    PHOSPHORUS_GAS: new Gas("phosphorus", "Phosphorus Gas").color(0xFFFFDD),
    SILICON_GAS: new Gas("silicon", "Molten Silicon").color(0xEECCCC),
    DOPED_SILICON_GAS: new Gas("doped_silicon", "Doped Molten Silicon").color(0xFFCCDD),
    RESIN: new Gas("photoresist", "Photoresist").color(0xFF643C),
    BORON_TRIFLUORIDE: new Gas("boron_trifluoride", "Boron Trifluoride").color(0xFFFFFF),
    BORON_TRIOXIDE: new Gas("boron_trioxide", "Boron Trioxide").color(0xFFFFFF),
    TREE_SAP: new Gas("tree_sap", "Tree Sap").color(0xc06000),
}
