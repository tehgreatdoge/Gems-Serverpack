// priority: 8
/**
 * A Multistep Crafting Process.
 */
class MultistepProcess {
    /**
     * A constant representing any intermediate item.
     */
    static INTERMEDIATE_ITEM = Symbol.for("Intermediate Item Representation")
    constructor() {
        this.recipes = []
    }
    /**
     * Sets the intermediate item for the process
     * @param item A valid identifier or object with getIdentifier method
     * @returns {this}
     */
    usingItem(item) {
        if (typeof(item) == "string") {
            this.intermediateItem = item
        }
        else if (Object.keys(item).includes("getIdentifier")) {
            this.intermediateItem = item.getIdentifier()
        }
        return this
    }
    /**
     * Add a step to the process
     * @param {MultistepProcessStep} step 
     * @returns {this}
     */
    addStep(step) {
        this.recipes.push(step)
        return this
    }
    /**
     * Register the multistep process and all its sub recipes
     * @param {ServerRecipeEvent} event 
     * @returns {this}
     */
    register(event) {
        if (!this.intermediateItem) {
            throw new Error("Missing Intermediate Item. Did you forget to call .usingItem()?")
        }
        let lastLore
        for (let index = this.recipes.length-1; index >= 0; index--) {
            let recipe = this.recipes[index]
            recipe.register(event, this.intermediateItem, index == 0 ? null : index+1, (index == this.recipes.length-1) ? null :index+2, lastLore)
            lastLore = recipe.getLore(index+1)
        }
    }
    static formatDisplay(step,lore) {
        return {Lore: [`"Step ${step}: ${lore}"`]}
    }
}
class MultistepProcessStep {
    constructor(title) {
        this.title = title
    }
    getLore(step) {
        return MultistepProcess.formatDisplay(step, this.title)
    }
    // stepin and stepin lore are null if the process is the first in the chain
    register(event, intermediate, stepIn, stepOut, stepOutLore) {}
}
class MekanismInjectingStep extends MultistepProcessStep {
    constructor(title,inputChemical, inputItem = MultistepProcess.INTERMEDIATE_ITEM, outputItem = MultistepProcess.INTERMEDIATE_ITEM) {
        super(title)
        this.inputChemical = inputChemical
        this.inputItem = inputItem
        this.outputItem = outputItem
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input
        let output
        if (this.inputItem == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepIn) {
                throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
            }
            input = {
                "ingredient": {
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                }
            }
        }
        else {
            input = parseMekanismIngredient(this.inputItem)
        }
        if (this.outputItem == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepOut) {
                throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
            }
            output = {
                type: "forge:nbt",
                item: intermediate,
                nbt: JSON.stringify({
                    display: stepOutLore,
                    step: stepOut
                })
            }
        }
        else {
            output = parseMekanismIngredient(this.outputItem).ingredient
        }
        event.custom({
          type: "mekanism:injecting",
          chemicalInput: this.inputChemical,
          itemInput: input,
          output: output
        })
    }
}
class MekanismCombiningStep extends MultistepProcessStep {
    constructor(title,{inputItem = MultistepProcess.INTERMEDIATE_ITEM, extraItem = MultistepProcess.INTERMEDIATE_ITEM, outputItem = MultistepProcess.INTERMEDIATE_ITEM}) {
        super(title)
        this.inputItem = inputItem
        this.specialItem = extraItem
        this.outputItem = outputItem
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input
        let special
        let output
        if (this.inputItem == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepIn) {
                throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
            }
            input = {
                "ingredient": {
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                }
            }
        }
        else {
            input = parseMekanismIngredient(this.inputItem)
        }
        if (this.specialItem == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepIn) {
                throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
            }
            special = {
                "ingredient": {
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                }
            }
        }
        else {
            special = parseMekanismIngredient(this.specialItem)
        }
        if (this.outputItem == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepOut) {
                throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
            }
            output = {
                type: "forge:nbt",
                item: intermediate,
                nbt: JSON.stringify({
                    display: stepOutLore,
                    step: stepOut
                })
            }
        }
        else {
            output = parseMekanismIngredient(this.outputItem).ingredient
        }
        event.custom({
          type: "mekanism:combining",
          extraInput: special,
          mainInput: input,
          output: output
        })
    }
}
class MinecraftSmokingStep extends MultistepProcessStep {
    constructor(title, {input = MultistepProcess.INTERMEDIATE_ITEM, output = MultistepProcess.INTERMEDIATE_ITEM, cookingTime = 100, experience = 0.5}) {
        super(title)
        this.input = input
        this.output = output
        this.cookingTime = cookingTime
        this.experience = experience
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input
        let output
        if (this.input == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepIn) {
                throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
            }
            input = {
                type: "forge:nbt",
                item: intermediate,
                nbt: JSON.stringify({
                    display: this.getLore(stepIn),
                    step: stepIn
                })
            }
        }
        else {
            input = parseStack(this.input)
        }
        if (this.output == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepOut) {
                throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
            }
            output = {
                item: intermediate,
                nbt: JSON.stringify({
                    display: stepOutLore,
                    step: stepOut
                })
            }
        }
        else {
            output = parseStack(this.output)
        }
        let recipe = {
            type: "minecraft:smoking",
            category: "food",
            cookingtime: this.cookingTime,
            experience: this.experience,
            ingredient: input,
            result: output
        }
        event.custom(recipe)
    }
}
class CreateDeployingStep extends MultistepProcessStep {
    constructor(title, {input = [MultistepProcess.INTERMEDIATE_ITEM], output = [MultistepProcess.INTERMEDIATE_ITEM]}) {
        super(title)
        this.input = input
        this.output = output
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input = []
        let output = []
        for (let item of this.input) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                input.push({
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                })
            }
            else {
                input.push(parseStack(item))
            }
        }
        for (let item of this.output) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepOut) {
                    throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
                }
                output.push({
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: stepOutLore,
                        step: stepOut
                    })
                })
            }
            else {
                output.push(parseStack(item))
            }
        }
        let recipe = {
            type: "create:deploying",
            ingredients: input,
            results: output
        }
        event.custom(recipe)
    }
}
class CreateMixingStep extends MultistepProcessStep {
    constructor(title, {input = [MultistepProcess.INTERMEDIATE_ITEM], output = [MultistepProcess.INTERMEDIATE_ITEM]}) {
        super(title)
        this.input = input
        this.output = output
        this.heatRequirement = 0
    }
    heated() {
        this.heated = 1
        return this
    }
    superheated() {
        this.heated = 2
        return this
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input = []
        let output = []
        for (let item of this.input) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                input.push({
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                })
            }
            else {
                input.push(parseStack(item))
            }
        }
        for (let item of this.output) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepOut) {
                    throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
                }
                output.push({
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: stepOutLore,
                        step: stepOut
                    })
                })
            }
            else {
                output.push(parseStack(item))
            }
        }
        let recipe = {
            type: "create:mixing",
            ingredients: input,
            results: output
        }
        switch (this.heatRequirement) {
            case 1:
                recipe.heatRequirement = "heated"
                break;
            case 2:
                recipe.heatRequirement = "superheated"
                break;
            default:
                break;
        }
        event.custom(recipe)
    }
}
class CreateFillingStep extends MultistepProcessStep {
    constructor(title, {input = [MultistepProcess.INTERMEDIATE_ITEM], output = [MultistepProcess.INTERMEDIATE_ITEM]}) {
        super(title)
        this.input = input
        this.output = output
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input = []
        let output = []
        for (let item of this.input) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                input.push({
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                })
            }
            else {
                input.push(parseStack(item))
            }
        }
        for (let item of this.output) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepOut) {
                    throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
                }
                output.push({
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: stepOutLore,
                        step: stepOut
                    })
                })
            }
            else {
                output.push(parseStack(item))
            }
        }
        let recipe = {
            type: "create:filling",
            ingredients: input,
            results: output
        }
        event.custom(recipe)
    }
}
class CreateSplashingStep extends MultistepProcessStep {
    constructor(title, {input = [MultistepProcess.INTERMEDIATE_ITEM], output = [MultistepProcess.INTERMEDIATE_ITEM]}) {
        super(title)
        this.input = input
        this.output = output
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let input = []
        let output = []
        for (let item of this.input) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                input.push({
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                })
            }
            else {
                input.push(parseStack(item))
            }
        }
        for (let item of this.output) {
            if (item == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepOut) {
                    throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
                }
                output.push({
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: stepOutLore,
                        step: stepOut
                    })
                })
            }
            else {
                output.push(parseStack(item))
            }
        }
        let recipe = {
            type: "create:splashing",
            ingredients: input,
            results: output
        }
        event.custom(recipe)
    }
}
class Ae2InscribingStep extends MultistepProcessStep {
    constructor(title, {middle = MultistepProcess.INTERMEDIATE_ITEM, top, bottom, output = MultistepProcess.INTERMEDIATE_ITEM}) {
        super(title)
        this.middle = middle
        this.top = top
        this.bottom = bottom
        this.output = output
    }
    register(event, intermediate, stepIn, stepOut, stepOutLore) {
        let output
        let ingredients = {}
        if (this.middle == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepIn) {
                throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
            }
            ingredients.middle = {
                type: "forge:nbt",
                item: intermediate,
                nbt: JSON.stringify({
                    display: this.getLore(stepIn),
                    step: stepIn
                })
            }
        }
        else {
            ingredients.middle = parseMekanismIngredient(this.middle).ingredient
        }
        if (this.top) {
            if (this.top == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                ingredients.top = {
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                }
            }
            else {
                ingredients.top = parseMekanismIngredient(this.top).ingredient
            }
        }
        if (this.bottom) {
            if (this.bottom == MultistepProcess.INTERMEDIATE_ITEM) {
                if (!stepIn) {
                    throw new Error("The first step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an input");
                }
                ingredients.bottom = {
                    type: "forge:nbt",
                    item: intermediate,
                    nbt: JSON.stringify({
                        display: this.getLore(stepIn),
                        step: stepIn
                    })
                }
            }
            else {
                ingredients.bottom = parseMekanismIngredient(this.bottom).ingredient
            }
        }
        if (this.output == MultistepProcess.INTERMEDIATE_ITEM) {
            if (!stepOut) {
                throw new Error("The last step in a MultistepProcess cannot use INTERMEDIATE_ITEM as an output");
            }
            output = {
                type: "forge:nbt",
                item: intermediate,
                nbt: JSON.stringify({
                    display: stepOutLore,
                    step: stepOut
                })
            }
        }
        else {
            output = parseMekanismIngredient(this.outputItem).ingredient
        }
        event.custom({
            type: "ae2:inscriber",
            ingredients: ingredients,
            mode: "inscribe",
            result: output
        })
    }
}
// }
// new MultistepProcess()
//     .addRecipe(new ShapedCraftingStep([
//         "aaa",
//         "d%d",
//         "aaa"
//     ],{
//         a: "minecraft:dirt",
//         d: "minecraft:grass",
//         "%": MultistepProcess.INTERMEDIATE_ITEM
//     }))
//     .usingItem("minecraft:snowball")
//     .withOutput(Item.CONTROL_UNIT)
// step names are what happens next
///Add removal of resist steps here? i think its best if development gets left out
/**
*0: oxide deposition
*1: oxide photoresist for pMOS
*2: oxide photolithography for pMOS
*3: oxide etching for pMOS
*4: n-well photoresist
*4: n-well photolithography
*4: diffuse n-well
*5: oxide photoresist for nMOS
*6: oxide photolithography for nMOS
*7: oxide etching for nMOS
*8: grow oxide
*9: polysilicon deposition
*10: polysilicon photoresist
*11: polysilicon photolithography
*12: polysilicon etching (not certain how this works tbh, but I don't care to find out rn)
*13: p type photoresist
*13: p type photolithography
*14: p type implantation
*15: n type photoresist
*13: n type photolithography
*16: n type implantation
*/
// function makeWaferNBT(step) {
//     let lore = "Error: Unknown fab step"
//     switch (step) {
//         case 0: {
//             lore = "Next Step: Oxide Deposition"
//             break;
//         }
//         case 1: {
//             lore = "Next Step: Apply Photoresist"
//             break;
//         }
//         case 2: {
//             lore = "Next Step: Photolithography"
//             break;
//         }
//         case 3: {
//             lore = "Next Step: Etching"
//             break;
//         }
//         case 4: {
//             lore = "Next Step: Apply Photoresist"
//             break;
//         }
//         default:
//             break;
//     }
//     return(JSON.stringify({"Step":step}))
// }
