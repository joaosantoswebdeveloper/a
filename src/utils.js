export default function formatCurrency (value) {
    return (Math.round(100*value)/100).toFixed(2) + "€";
}