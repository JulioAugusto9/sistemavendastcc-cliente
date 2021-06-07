export default function stringarCampos(campos) {
    let str = ""
    campos.forEach(campo => {
        if (campo !== null && campo !== "")
            str += campo + ' '
    });
    return str
}