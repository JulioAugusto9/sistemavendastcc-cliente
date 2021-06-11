export default function parseReal(valor) {
    if (valor === '' || valor === null || valor === undefined) return 0
    return (valor.indexOf(',') === -1 ? valor : valor.replace('.', '')).replace(',', '.')
}