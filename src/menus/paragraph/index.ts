/**
 * @description 链接 菜单
 * @author wangfupeng
 */

import PanelMenu from '../menu-constructors/PanelMenu'
import Editor from '../../editor/index'
import $ from '../../utils/dom-core'
import { MenuActive } from '../menu-constructors/Menu'
import isActive from './is-active'
import createPanelConf from './create-panel-conf'
import Panel from '../menu-constructors/Panel'

class Paragraph extends PanelMenu implements MenuActive {
	constructor(editor: Editor) {
		const $elem = $('<div class="w-e-menu" data-title="段落">段落</div>')
		super($elem, editor)
	}
	public clickHandler(): void {
		// const editor = this.editor
		// let $topElement
		// $topElement = editor.selection.getSelectionRangeTopNodes()
		this.createPanel()
	}
	/**
	 * 创建 panel
	 * @param text 文本
	 * @param link 链接
	 */
	private createPanel(): void {
		const conf = createPanelConf(this.editor)
		const panel = new Panel(this, conf)
		panel.create()
	}
	/**
	 * 尝试修改菜单 active 状态
	 */
	public tryChangeActive() {
		const editor = this.editor
		if (isActive(editor)) {
			this.active()
		} else {
			this.unActive()
		}
	}
}

export default Paragraph
