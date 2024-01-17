// priority: 9
function registerChemicalDissolutionRecipe(event, output, gasInput, itemInput) {
    event.custom({
        type: "mekanism:dissolution",
        itemInput: itemInput,
        gasInput: gasInput,
        output: output
    })
}
function registerChemicalInfusionRecipe(event, output, leftInput, rightInput) {
    event.custom({
        type: "mekanism:chemical_infusing",
        leftInput: leftInput,
        rightInput: rightInput,
        output: output
    })
}
function registerItemToGas(event, output, input) {
    event.custom({
        "type": "mekanism:gas_conversion",
        "input": {
          "ingredient": {
            "tag": input
          }
        },
        "output": output
      })
}
function registerCrystallizing(event, output, input) {
    event.custom({
        "type": "mekanism:crystallizing",
        "chemicalType": "gas",
        "input": input,
        "output": {
            item: output
        }
      })
}
