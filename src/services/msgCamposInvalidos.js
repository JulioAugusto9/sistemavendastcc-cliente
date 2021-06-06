export default function msgCamposInvalidos(err) {
    const res = err.response.data
    let msg = res.titulo
    if (res.campos !== undefined) {
        res.campos.forEach(campo => {
            msg += '\n' + campo.nome + ': ' + campo.mensagem
        });
    }
    return msg
}