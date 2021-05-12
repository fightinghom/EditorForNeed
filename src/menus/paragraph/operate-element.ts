import { DomElement } from '../../utils/dom-core'
import Editor from '../../editor/index'

class paragraphOptions extends Object {
  public marginTop: string | null | undefined;
  public marginRight: string | null | undefined;
  public marginBottom: string | null | undefined;
  public marginLeft: string | null | undefined;
  public paddingTop: string | null | undefined;
  public paddingRight: string | null | undefined;
  public paddingBottom: string | null | undefined;
  public paddingLeft: string | null | undefined;
  public borderWidth: string | null | undefined;
  public borderColor: string | null | undefined;
  public backgroundColor: string | null | undefined;
}

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
  }
}

export default operateElement