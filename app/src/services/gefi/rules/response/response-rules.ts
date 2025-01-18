import { HttpErrorResponse } from "@angular/common/http";
import { Rule } from "../rule";
import { RulesEngine } from "../rules-engine"

class ResponseBodyMustNotBeEmpty implements Rule {
    matches(response: any, _: string): boolean {
        return (response.body?.length === 0) && (response.body !== undefined);
    }
    apply(response: any, objectType: string): void {
        throw new HttpErrorResponse({
            status: 404,
            statusText: "object not found",
            error: `could not find object '${objectType}' with passed parameters`,
            url: response.url
        })
    }
}
export class ResponseRules extends RulesEngine {
    static override rules = [
        new ResponseBodyMustNotBeEmpty()
    ];
}
