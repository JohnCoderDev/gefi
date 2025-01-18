export class RulesEngine {
    static rules: Array<any> = [];

    static applyRules(...e: any): void {
        this.rules.forEach(rule => { if (rule.matches(...e)) rule.apply(...e); })
    }
}
