export default function formatDate(date) {
    if (date === undefined) return ''
    const locale = new Date(date + ' 04:00 UTC')
    if (locale === undefined) return ''
    return locale.toLocaleDateString()
}