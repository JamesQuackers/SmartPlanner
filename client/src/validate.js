export class Validate {

    async validateIngredient(ingredient) {
        let errors = {
            fields: [],
            messages: []
        };
        if (ingredient.name === "") {
            errors.fields.push("name");
            errors.messages.push("Name cannot be empty!");
        }

        if (ingredient.price < 0.01) {
            errors.fields.push("price");
            errors.messages.push("Price cannot be less than $0.01!")
        }

        if (ingredient.totalWeight <= 0) {
            errors.fields.push("totalWeight");
            errors.messages.push("Weight cannot be less than 0g!")
        }

        if (ingredient.servingSize <= 0) {
            errors.fields.push("servingSize");
            errors.messages.push("Serving Size cannot be less than 0g!")
        }

        if (ingredient.servingSize < ingredient.totalWeight) {
            errors.fields.push("servingSize");
            errors.fields.push("totalWeight");
            errors.messages.push("Serving Size cannot be exceed the total weight!");
            errors.messages.push("Serving Size cannot be exceed the total weight!");
        }


        return errors;

    }
}
