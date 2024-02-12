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

let floralCompostItems = Ingredient.of("#minecraft:flowers").getItemIds()
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
        if (KItem.of(seed.getAsJsonObject().get("item").getAsString()).hasTag("minecraft:flowers")) {
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
            element.getAsJsonObject().get("item").getAsString()
            if (KItem.of(element.getAsJsonObject().get("item").getAsString()).hasTag("minecraft:flowers")) {
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
