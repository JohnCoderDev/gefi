export enum BenefitCategory {
    product = 1,
    service = 2,
}

export type Benefit = {
    id?: number,
    name: string,
    benefit_category: BenefitCategory,
    benefited?: string,
    movimentation_categories: Array<number>,
}