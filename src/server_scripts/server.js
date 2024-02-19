// priority: 1

// Visit the wiki for more info - https://kubejs.com/

// TODO:Remove Fluix Researcher Trades

// Remove Computer Scientist Trades
MoreJSEvents.villagerTrades((event) => {
    event.forEachTrades("advancedperipherals:computer_scientist", [1,5], (listings) => {
        listings.removeIf(()=> true)
    })
})
let VillagerTrade = Java.loadClass("de.srendi.advancedperipherals.common.village.VillagerTrade")
MoreJSEvents.wandererTrades((event) => {
    // Nuke Advanced Peripherals trades
    event.getTrades(1).removeIf((trade) => trade.getClass() == VillagerTrade)
    event.getTrades(2).removeIf((trade) => trade.getClass() == VillagerTrade)
    // what were they even thinking
    event.removeTrades({firstItem:Ingredient.all,secondItem:Ingredient.all,outputItem:Ingredient.of("minecraft:beacon")})
})

let floralCompostItems =[
'minecraft:wither_rose',
'minecraft:orange_tulip',
'minecraft:rose_bush',
'biomesoplenty:wilted_lily',
'minecraft:cornflower',
'biomesoplenty:jacaranda_leaves',
'minecraft:flowering_azalea_leaves',
'biomesoplenty:pink_hibiscus',
'biomesoplenty:rose',
'biomesoplenty:flowering_oak_leaves',
'biomesoplenty:goldenrod',
'minecraft:blue_orchid',
'minecraft:white_tulip',
'minecraft:cherry_leaves',
'minecraft:lily_of_the_valley',
'biomesoplenty:icy_iris',
'biomesoplenty:snowblossom_leaves',
'minecraft:pitcher_plant',
'minecraft:allium',
'biomesoplenty:blue_hydrangea',
'biomesoplenty:orange_cosmos',
'biomesoplenty:burning_blossom',
'biomesoplenty:tall_lavender',
'minecraft:flowering_azalea',
'minecraft:pink_petals',
'minecraft:azure_bluet',
'minecraft:poppy',
'minecraft:torchflower',
'biomesoplenty:pink_daffodil',
'biomesoplenty:lavender',
'minecraft:mangrove_propagule',
'minecraft:red_tulip',
'biomesoplenty:violet',
'biomesoplenty:glowflower',
'minecraft:peony',
'minecraft:sunflower',
'biomesoplenty:white_petals',
'biomesoplenty:wildflower',
'minecraft:dandelion',
'minecraft:pink_tulip',
'minecraft:oxeye_daisy',
'minecraft:lilac']
let mulchItems = Ingredient.of("minecraft:saplings").getItemIds()
let coralCompostItems = Ingredient.of("#minecraft:flowers").getItemIds()
let organicCompostItems = Ingredient.of("#forge:crops").getItemIds()
ServerEvents.recipes((event) => {
    event.forEachRecipe({mod: "botanytrees", type: "botanypots:crop"}, (recipe) => {
      recipe.json.add("categories",["dirt", "mulch"])
    })
    function notCategories(element, categories) {
      let out = true
      element.getAsJsonArray("categories").forEach((cat) => {
        if (categories.includes(cat.getAsString())) {
          out = false
        }
      })
      return out
    }
    event.forEachRecipe({mod: "botanypots", type: "botanypots:crop"}, (recipe) => {
      let seed = recipe.json.get("seed")
      if (seed.isJsonObject()) {
        if (floralCompostItems.includes(seed.getAsJsonObject().get("item").getAsString())) {
          recipe.json.getAsJsonArray("categories")["add(java.lang.String)"]("floral")
          return
        }
        else {
          if (notCategories(recipe.json, ["water","end","nether","log","wood","jungle_wood"])) {
            recipe.json.getAsJsonArray("categories")["add(java.lang.String)"]("organic")
          }
          return
        }
      }
      if (seed.isJsonArray()) {
        seed.getAsJsonArray().forEach((element) => {
          if (element.isJsonObject()) {
            if (floralCompostItems.includes(element.getAsJsonObject().get("item").getAsString())) {
              recipe.json.getAsJsonArray("categories")["add(java.lang.String)"]("floral")
              return
            }
            else {
              if (notCategories(recipe.json, ["water","end","nether","log","wood","jungle_wood"])) {
                recipe.json.getAsJsonArray("categories")["add(java.lang.String)"]("organic")
              }
              return
            }
          }
        })
      }
    })
    
    for (let tierName in Tier) {
        let tier = Tier[tierName]
        for (let materialName in tier.materials) {
            let materialValue = tier.materials[materialName]
            registerBotanyCrop(event, tier.substrate, materialValue, Materials[materialName])
        }
    }
    for (let substrateName in Substrate) {
        let substrate = Substrate[substrateName]
        registerBotanySoil(event, substrate)
    }
    event.custom({
      type: "botanypots:soil",
      input:{
        item: Blocks.COMPOST_MULCH.getIdentifier()
      },
      display: {
        block: Blocks.COMPOST_MULCH.getIdentifier()
      },
      categories: [
        "log",
        "wood",
        "mushroom",
        "mulch"
      ],
      growthModifier: 4
    })
    event.custom({
      type: "botanypots:soil",
      input:{
        item: Blocks.COMPOST_CORAL.getIdentifier()
      },
      display: {
        block: Blocks.COMPOST_CORAL.getIdentifier()
      },
      categories: [
        "water"
      ],
      growthModifier: 4
    })
    event.custom({
      type: "botanypots:soil",
      input:{
        item: Blocks.COMPOST_FLORAL.getIdentifier()
      },
      display: {
        block: Blocks.COMPOST_FLORAL.getIdentifier()
      },
      categories: [
        "floral"
      ],
      growthModifier: 4
    })
    event.custom({
      type: "botanypots:soil",
      input:{
        item: Blocks.COMPOST_ORGANIC.getIdentifier()
      },
      display: {
        block: Blocks.COMPOST_ORGANIC.getIdentifier()
      },
      categories: [
        "organic"
      ],
      growthModifier: 4
    })
})
