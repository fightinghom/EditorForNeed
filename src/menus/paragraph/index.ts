/**
 * @description 段落 菜单
 * @author yanghao
 */

import PanelMenu from '../menu-constructors/PanelMenu'
import Editor from '../../editor/index'
import $ from '../../utils/dom-core'
import { MenuActive } from '../menu-constructors/Menu'
import isActive from './is-active'
import createPanelConf from './create-panel-conf'
import Panel from '../menu-constructors/Panel'
import paragraphOptions from './paragraphOptions'
import { rgbToHex } from '../../utils/util'

class Paragraph extends PanelMenu implements MenuActive {
	constructor(editor: Editor) {
		const $elem = $('<div class="w-e-menu" data-title="段落"><span style="font-weight: bold;font-size: 20px">P</span></div>')
		super($elem, editor)
	}
	public clickHandler(): void {
		const editor = this.editor
		let $topElement
		$topElement = editor.selection.getSelectionRangeTopNodes()[0].getNodeTop(editor).elems[0]
		const options = {
			marginTop: $topElement.style['marginTop'],
			marginRight: $topElement.style['marginRight'],
			marginBottom: $topElement.style['marginBottom'],
			marginLeft: $topElement.style['marginLeft'],
			paddingTop: $topElement.style['paddingTop'],
			paddingRight: $topElement.style['paddingRight'],
			paddingBottom: $topElement.style['paddingBottom'],
			paddingLeft: $topElement.style['paddingLeft'],
			borderWidth: $topElement.style['borderWidth'],
			borderColor: $topElement.style['borderColor'] ? rgbToHex($topElement.style['borderColor']) : '#FFFFFF',
			backgroundColor: $topElement.style['backgroundColor'] ? rgbToHex($topElement.style['backgroundColor']) : '#FFFFFF',
		}
		console.log(options)
		this.createPanel(options)
	}
	/**
	 * 创建 panel
	 * @param options 段落样式
	 */
	private createPanel(options: paragraphOptions): void {
		const conf = createPanelConf(this.editor, options)
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
