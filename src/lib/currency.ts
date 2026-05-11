export type Currency = "KES" | "USD" | "EUR" | "GBP";

export const currencyRates: Record<Currency, number> = {
    KES: 1,
    USD: 0.0073,
    EUR: 0.0061,
    GBP: 0.0052,
};

export const currencySymbols: Record<Currency, string> = {
    KES: "KES ",
    USD: "$",
    EUR: "€",
    GBP: "£",
};

export const currencyOptions: Array<{ label: string; value: Currency }> = [
    { label: "KES", value: "KES" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
];

export function formatCurrency(amountKES: number, currency: Currency) {
    const rate = currencyRates[currency] ?? 1;
    const value = amountKES * rate;
    const symbol = currencySymbols[currency] ?? "";

    if (currency === "KES") {
        return `${symbol}${value.toFixed(2)}`;
    }

    return `${symbol}${value.toFixed(2)} ${currency}`;
}
