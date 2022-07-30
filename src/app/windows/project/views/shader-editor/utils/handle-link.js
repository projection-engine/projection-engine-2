export default function handleLink(src, target, isExecution, links, setLinks) {
    let c = [...links]
    const existing = c.filter(c => (c.target.id === target.id && c.target.attribute.key === target.attribute.key) || (isExecution && c.source.id === src.id && c.source.attribute.key === src.attribute.key))
    c = c.filter(cc => !existing.find(e => e === cc))
    if (!target.attribute.componentRequired || src.attribute.components.includes(target.attribute.componentRequired)) {

        c.push({
            source: src,
            target: target
        })
    } else
        alert.pushAlert("Missing component-editor on entity", "error")
    setLinks(c)
}