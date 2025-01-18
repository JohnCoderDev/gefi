import { Rule } from "../rule";
import { RulesEngine } from "../rules-engine";
import { MovimentationCategory } from "../../definitions/movimentation-category";

class MovimentationCategoryNameMustNotBeNullOrEmpty implements Rule {
    matches(category: MovimentationCategory): boolean {
        return category.name === "" || category.name === null;
    }

    apply(_: MovimentationCategory): void {
        throw new Error('movimentation category name must not be null or empty');
    }
}

class MovimentationCategorySignalMustBeOneOrMinusOne implements Rule {
    matches(category: MovimentationCategory): boolean {
        return category.signal !== 1 && category.signal !== -1;
    }

    apply(_: MovimentationCategory): void {
        throw new Error('movimentation category signal can only be 1 or -1');
    }
}

export class MovimentationCategoryRules extends RulesEngine {
    static override rules = [
        new MovimentationCategoryNameMustNotBeNullOrEmpty(),
        new MovimentationCategorySignalMustBeOneOrMinusOne()
    ]
}
