import { Rule } from "../rule";
import { RulesEngine } from "../rules-engine";
import { PaymentMethod } from "../../definitions/payment-method";

class PaymentMethodNameMustNotBeNullOrEmpty implements Rule {
    matches(paymentMethod: PaymentMethod): boolean {
        return paymentMethod.name === "" || paymentMethod.name === null;
    }

    apply(_: PaymentMethod): void {
        throw new Error('payment method name must not be null');
    }
}

export class PaymentMethodRules extends RulesEngine {
    static override rules = [
        new PaymentMethodNameMustNotBeNullOrEmpty(),
    ]
}
