export enum BenefitedType {
    physicalPerson = 1,
    juridicPerson = 2,
};

export enum BenefitedCategory {
    client = 1,
    supplier = 2,
    both = 3,
}

export type Benefited = {
    name: string,
    benefited_type?: BenefitedType,
    benefited_category: BenefitedCategory,
    movimentation_categories: Array<number>;
}