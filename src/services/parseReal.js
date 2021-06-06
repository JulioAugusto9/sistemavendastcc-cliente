export default function parseReal(valor) {
    return (valor.indexOf(',') === -1 ? valor : valor.replace('.', '')).replace(',', '.')
}