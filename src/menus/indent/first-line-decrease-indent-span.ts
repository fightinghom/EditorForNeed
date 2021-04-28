/**
 * @description 减少首行缩进
 * @author tonghan
 */

import { DomElement } from '../../utils/dom-core'

function decreaseIndentSpan($node: DomElement): void {
  const $elem = $node.elems[0]
  const spanIndentList = $elem.getElementsByClassName('2em-intent-span')
  if (spanIndentList.length > 0) {
    spanIndentList[0].remove()
  }
}

export default decreaseIndentSpan
