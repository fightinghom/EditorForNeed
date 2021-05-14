import { DomElement } from '../../utils/dom-core'
import Editor from '../../editor/index'
import paragraphOptions from './paragraphOptions'

function operateElement($node: DomElement, options: paragraphOptions, editor: Editor): void {
  const $elem = $node.getNodeTop(editor)
  const reg = /^P$/i
  // ----------------------增加对H标签的过滤 yanghao----------------------------
  const regH = /^H\d$/i
  if (reg.test($elem.getNodeName()) || regH.test($elem.getNodeName())) {
    $elem
      .css('margin-top', options.marginTop || '')
      .css('margin-right', options.marginRight || '')
      .css('margin-bottom', options.marginBottom || '')
      .css('margin-left', options.marginLeft || '')
      .css('padding-top', options.paddingTop || '')
      .css('padding-right', options.paddingRight || '')
      .css('padding-bottom', options.paddingBottom || '')
      .css('padding-left', options.paddingLeft || '')
      .css('border-width', options.borderWidth || '')
      .css('border-color', options.borderColor || '')
      .css('background-color', options.backgroundColor || '')
    if (options.borderWidth) {
      $elem.css('border-style', 'solid')
    } else {
      $elem.css('border-style', '')
    }
  }
}

export default operateElement