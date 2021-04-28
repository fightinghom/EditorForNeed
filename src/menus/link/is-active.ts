/**
 * @description 检查选区是否在链接中，即菜单是否应该 active
 * @author wangfupeng
 */

import Editor from '../../editor/index'

// --------------------需要递归判断是否有a标签 yanghao--------------------
function hasATag(elem: any): any {
	if (elem.getNodeName() === 'A') {
		return true
	} else if (elem.getNodeName() === 'DIV' && (elem.attr('id') || '').indexOf('text-elem') >= 0) {
		return false
	} else {
		return hasATag(elem.parent())
	}
}
// ---------------------------------------------------------------------

function isActive(editor: Editor): boolean {
	const $selectionELem = editor.selection.getSelectionContainerElem()
	if (!$selectionELem?.length) {
		return false
	}
	// if ($selectionELem.getNodeName() === 'A') {
	//     return true
	// } else {
	//     return false
	// }
	// --------------------需要递归判断是否有a标签 yanghao--------------------
	if (hasATag($selectionELem)) {
		return true
	} else {
		return false
	}
	// ---------------------------------------------------------------------
}

export default isActive
