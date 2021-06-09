/**
 * @description 用于方便自己
 * @author yanghao
 */
// -------------------------查找最上方的A标签 yanghao------------------------
const getATag = function (elem: any): any {
    if (elem.getNodeName() === 'A') {
        return elem
    } else if (elem.getNodeName() === 'DIV' && (elem.attr('id') || '').indexOf('text-elem') >= 0) {
        return null
    } else {
        return getATag(elem.parent())
    }
}
// -------------------------------------------------------------------------
export { getATag }
