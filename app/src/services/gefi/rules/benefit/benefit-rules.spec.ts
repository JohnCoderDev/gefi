import { Benefit } from "../../benefit";
import { BenefitRules } from "./benefit-rules";

describe('BenefitRules', () => {
  it('empty string must raise an error', () => {
    const benefit = <Benefit>{ name: "" };
    expect(new BenefitRules(benefit)).toThrow();
  })
});
