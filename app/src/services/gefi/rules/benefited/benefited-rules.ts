import { Benefited } from "../../definitions/benefited";
import { Rule } from "../rule";
import { RulesEngine } from "../rules-engine";

class BenefitedNameMustNotBeEmpty implements Rule {
    matches(benefited: Benefited): boolean {
        return (benefited.name === "") || (benefited.name === null);
    }
    apply(_: Benefited): void {
        throw new Error('benefited name must not be null');
    }
}

export class BenefitedRules extends RulesEngine {
    static override rules = [
        new BenefitedNameMustNotBeEmpty()
    ]
}
