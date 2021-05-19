/**
 * @description 上标
 * @author yanghao
 */

import Editor from '../../editor'
import $ from '../../utils/dom-core'
import BtnMenu from '../menu-constructors/BtnMenu'
import { MenuActive } from '../menu-constructors/Menu'
class Sup extends BtnMenu implements MenuActive {
  constructor(editor: Editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="上标">
      <span>X<sup>2</sup></span>
             </div>`
    )
    super($elem, editor)
  }

  /**
   * 点击事件
   */
  public clickHandler(): void {
    const editor = this.editor
    const isSelectEmpty = editor.selection.isSelectionEmpty()

    if (isSelectEmpty) {
      // 选区范围是空的，插入并选中一个“空白”
      editor.selection.createEmptyRange()
    }

    // 执行 superscript 命令
    editor.cmd.do('superscript')

    if (isSelectEmpty) {
      // 需要将选区范围折叠起来
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }

  /**
   * 尝试修改菜单激活状态
   */
  public tryChangeActive(): void {
    const editor = this.editor
    if (editor.cmd.queryCommandState('superscript')) {
      this.active()
    } else {
      this.unActive()
    }
  }
}


export default Sup