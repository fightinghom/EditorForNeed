/**
 * @description 操作元素
 * @author yanghao
 */
import { DomElement } from '../../utils/dom-core'
import Editor from '../../editor/index'
import paragraphOptions from './paragraphOptions'

function operateElement($node: DomElement, options: paragraphOptions, editor: Editor): void {
  const $elem = $node.getNodeTop(editor)
  const reg = /^P$/i
  // ----------------------增加对H标签的过滤 yanghao----------------------------
  const regH = /^H\d$/i
  if (reg.test($elem.getNodeName()) || regH.test($elem.getNodeName())) {
    const isIE = navigator.userAgent.indexOf('Trident') > 0
    const emptyValue = isIE ? '0px' : ''
    console.log(options)
    $elem
      .css('margin-top', options.marginTop || emptyValue)
      .css('margin-right', options.marginRight || emptyValue)
      .css('margin-bottom', options.marginBottom || emptyValue)
      .css('margin-left', options.marginLeft || emptyValue)
      .css('padding-top', options.paddingTop || emptyValue)
      .css('padding-right', options.paddingRight || emptyValue)
      .css('padding-bottom', options.paddingBottom || emptyValue)
      .css('padding-left', options.paddingLeft || emptyValue)
      .css('border-width', options.borderWidth || emptyValue)
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