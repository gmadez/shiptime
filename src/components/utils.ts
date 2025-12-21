export const CADollar = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
});

export const fomartCADollar = (amountInCents: number): string => {
    return CADollar.format(amountInCents / 100);
}
