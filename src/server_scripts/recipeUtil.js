//priority: 9
function registerAE2InscriberRecipeTagMiddle(event, out, input) {
    let ingredients = {}
    ingredients.middle = {tag:input[0]}
    if (input[1]) {
        ingredients.top = {item:input[1]}
    }
    if (input[2]) {
        ingredients.bottom = ({item:input[2]})
    }
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": ingredients,
        "result": {
            item: out
        }
    })
}
