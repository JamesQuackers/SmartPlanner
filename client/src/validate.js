export class Validate {

    async validateIngredientName(name, errors) {
        if (name === "") {
            errors.fields.push("name");
            errors.messages.push("Name cannot be empty!");
        }
    }

    async validateIngredientPrice(price, errors) {
        if (price < 0.01) {
            errors.fields.push("price");
            errors.messages.push("Price cannot be less than $0.01!")
        }
        if (isNaN(price)) {
            errors.fields.push("price");
            errors.messages.push("Price must be a number!")
        }
    }

    async validateIngredientWeight(totalWeight, errors) {
        if (totalWeight <= 0) {
            errors.fields.push("totalWeight");
            errors.messages.push("Weight cannot be less than 0g!")
        }
        if (isNaN(totalWeight)) {
            errors.fields.push("totalWeight");
            errors.messages.push("Weight must be a number!")
        }
    }

    async validateIngredientServingSize(servingSize, totalWeight, errors) {
        if (servingSize !== undefined) {

            if (servingSize <= 0) {
                errors.fields.push("servingSize");
                errors.messages.push("Serving Size cannot be less than 0g!")
            }
            if (isNaN(servingSize)) {
                errors.fields.push("servingSize");
                errors.messages.push("Serving Size must be a number!")
            }
            if (totalWeight !== undefined) {
                if (servingSize > totalWeight) {
                    errors.fields.push("servingSize");
                    errors.fields.push("totalWeight");
                    errors.messages.push("Serving Size cannot be exceed the total weight!");
                    errors.messages.push("Serving Size cannot be exceed the total weight!");
                }
            }
        }
    }

    async validateIngredientCategories(categories, errors) {
        if (categories.length > 5) {
            errors.fields.push("categories");
            errors.messages.push("Maximum of 5 categories allowed.");
        }
    }

    async validateIngredient(ingredient) {
        let errors = {
            fields: [],
            messages: []
        };
        this.validateIngredientName(ingredient.name, errors);
        this.validateIngredientPrice(ingredient.price, errors);
        this.validateIngredientWeight(ingredient.totalWeight, errors);
        this.validateIngredientCategories(ingredient.categories, errors);
        return errors;

    }
}
