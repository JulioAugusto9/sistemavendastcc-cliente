export default function formatReal(valor) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}