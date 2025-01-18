export interface Rule {
    matches(...e: any): boolean;
    apply(...e: any): void;
}
