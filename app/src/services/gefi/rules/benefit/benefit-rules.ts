import { Rule } from "../rule";
import { RulesEngine } from "../rules-engine";
import { Benefit } from "../../definitions/benefit";

class BenefitCannotBeNullOrEmpty implements Rule {
    matches(benefit: Benefit): boolean {
        return benefit.name === "" || benefit.name === null;
    }

    apply(_: Benefit): void {
        throw new Error('name of the benefit cannot be null or empty string');
    }
}

export class BenefitRules extends RulesEngine {
    static override rules = [
        new BenefitCannotBeNullOrEmpty()
    ]
}
