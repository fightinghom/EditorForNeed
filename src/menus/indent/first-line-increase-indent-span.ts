/**
 * @description 增加首行缩进
 * @author yanghao
 */

import { DomElement } from '../../utils/dom-core'

function increaseIndentSpan($node: DomElement): void {
  // 这里获取的是一个P标签，暂时不处理H标签
  const $elem = $node.elems[0]
  // 防止创建的span换行，需要设置父元素word-break: break-all
  $elem.style.wordBreak = 'break-word'
  // 创建放在最前面的表示首行缩进的span
  let indentSpan = document.createElement('span')
  indentSpan.classList.add('2em-intent-span')
  indentSpan.style.display = 'inline-block'
  indentSpan.style.width = '2em'
  // 将首行缩进的span添加到最前面
  const firstChild = $elem.firstChild
  $elem.insertBefore(indentSpan, firstChild)
}

export default increaseIndentSpan
