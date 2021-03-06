/**
 * @description link 菜单 panel tab 配置
 * @author wangfupeng
 */

import Editor from '../../editor/index'
import { PanelConf } from '../menu-constructors/Panel'
import { getRandom } from '../../utils/util'
import $, { DomElement } from '../../utils/dom-core'
import isActive, { getParentNodeA, EXTRA_TAG } from './is-active'
import { insertHtml } from './util'
import { getATag } from '../../utils/byYanghao/getTagA'
import xss from 'xss'
export default function (editor: Editor, text: string, link: string): PanelConf {
    // panel 中需要用到的id
    const inputLinkId = getRandom('input-link')
    // ----------------------将获取的linkInputId注册到editor上 yanghao-------------------------
    editor.$inputLinkId = inputLinkId
    // ---------------------------------------------------------------------------------------
    const inputTextId = getRandom('input-text')
    const btnOkId = getRandom('btn-ok')
    const btnDelId = getRandom('btn-del')

    // 是否显示“取消链接”
    const delBtnDisplay = isActive(editor) ? 'inline-block' : 'none'

    let $selectedLink: DomElement

    /**
     * 选中整个链接元素
     */
    function selectLinkElem(): void {
        if (!isActive(editor)) return

        const $linkElem = editor.selection.getSelectionContainerElem()
        if (!$linkElem) return
        editor.selection.createRangeByElem($linkElem)
        editor.selection.restoreSelection()

        $selectedLink = $linkElem // 赋值给函数内全局变量
    }

    /**
     * 插入链接
     * @param text 文字
     * @param link 链接
     */
    function insertLink(text: string, link: string): void {
        // if (isActive(editor)) {
        //     // 选区处于链接中，则选中整个菜单，再执行 insertHTML
        //     selectLinkElem()
        //     editor.cmd.do('insertHTML', `<a href="${link}" target="_blank">${text}</a>`)
        // } else {
        //     // 选区未处于链接中，直接插入即可
        //     editor.cmd.do('insertHTML', `<a href="${link}" target="_blank">${text}</a>`)
        // }
        // ----------------------将链接的json串放到data-json属性上 yanghao-------------------------
        // fix: 修复列表下无法设置超链接的问题(替换选中文字中的标签)

        // const TagRegExp = new RegExp(/(<\/?ul>)|(<\/?li>)|(<\/?ol>)/g)

        // const resultText = text.replace(TagRegExp, '')

        /**
         * fix: 插入链接后再修改链接地址问题，会导致页面链接有问题
         *
         * 同上，列表无法插入链接的原因，是因为在insertLink, 处理text时有问题。
         */
        const resultText = xss(text) // Link xss
        const xssLink = xss(link)
        const $elem: DomElement = $(
            `<a class="editor-link" target="_blank" ${
                editor.config.hrefToDataJson ? 'data-json' : 'href'
            }="${xssLink}"></a>`
        )
        const linkDom = $elem.elems[0] as HTMLAnchorElement
        // fix: 字符转义问题，https://xxx.org?bar=1&macro=2 => https://xxx.org?bar=1¯o=2
        linkDom.innerHTML = resultText

        // 避免拼接字符串，带来的字符串嵌套问题：如: <a href=""><img src=1 xx />"> 造成xss攻击
        // linkDom.href = link

        if (isActive(editor)) {
            // 选区处于链接中，则选中整个菜单，再执行 insertHTML
            selectLinkElem()
            editor.cmd.do('insertElem', $elem)
        } else {
            // 选区未处于链接中，直接插入即可
            editor.cmd.do('insertElem', $elem)
        }
        // ----------------------------------------------------------------------------------------
    }

    /**
     * 取消链接
     */
    function delLink(): void {
        if (!isActive(editor)) {
            return
        }
        // 选中整个链接
        selectLinkElem()
        // 用文本替换链接
        // --------------------------获取A标签的内部html-----------------------
        // const selectionText = $selectedLink.text()
        // editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>')
        const tagA = getATag($selectedLink)
        if (tagA) {
            const htmlInTagA = tagA.html()
            editor.cmd.do('insertHTML', '<span>' + htmlInTagA + '</span>')
        }
        // -------------------------------------------------------------------
    }

    /**
     * 校验链接是否合法
     * @param link 链接
     */
    function checkLink(text: string, link: string): boolean {
        //查看开发者自定义配置的返回值
        const check = editor.config.linkCheck(text, link)
        if (check === undefined) {
            //用户未能通过开发者的校验，且开发者不希望编辑器提示用户
        } else if (check === true) {
            //用户通过了开发者的校验
            return true
        } else {
            //用户未能通过开发者的校验，开发者希望我们提示这一字符串
            editor.config.customAlert(check, 'warning')
        }
        return false
    }

    const conf = {
        width: 300,
        height: 0,

        // 拼接字符串的：xss 攻击：
        //    如值为："><img src=1 onerror=alert(/xss/)>， 插入后：value=""><img src=1 onerror=alert(/xss/)>", 插入一个img元素

        // panel 中可包含多个 tab
        tabs: [
            {
                // tab 的标题
                title: editor.i18next.t('menus.panelMenus.link.链接'),
                // 模板
                tpl: `<div>
                        <input
                            id="${inputTextId}"
                            disabled="disabled"
                            type="text"
                            class="block"
                            placeholder="${editor.i18next.t('menus.panelMenus.link.链接文字')}"/>
                        </td>
                        <input
                            id="${inputLinkId}"
                            type="text"
														${link ? 'disabled="disabled"' : ''}
                            class="block"
                            value="${link}"
                            placeholder="${editor.config.linkPlaceholder || '请点击此处选择链接'}"/>
                        </td>
                        <div class="w-e-button-container">
														${
                                                            !link
                                                                ? `<button type="button" id="${btnOkId}" class="right"> ${editor.i18next.t(
                                                                      '插入'
                                                                  )} </button>`
                                                                : ''
                                                        }
                            <button type="button" id="${btnDelId}" class="gray right" style="display:${delBtnDisplay}">
                                ${editor.i18next.t('menus.panelMenus.link.取消链接')}
                            </button>
                        </div>
                    </div>`,
                // 事件绑定
                events: [
                    // 插入链接
                    {
                        selector: '#' + btnOkId,
                        type: 'click',
                        fn: () => {
                            // 获取链接区间的顶层元素
                            const $selectionContainerElem = editor.selection.getSelectionContainerElem()!
                            const $elem = $selectionContainerElem?.elems[0]

                            // 获取选取
                            editor.selection.restoreSelection()
                            const topNode = editor.selection
                                .getSelectionRangeTopNodes()[0]
                                .getNode()
                            const selection = window.getSelection()
                            // 执行插入链接
                            const $link = $('#' + inputLinkId)
                            const $text = $('#' + inputTextId)
                            let link = $link.val().trim()
                            let text = $text.val().trim()

                            let html: string = ''
                            // if (selection && !selection?.isCollapsed)
                            //     html = insertHtml(selection, topNode)?.trim()
                            // -------------------------------匹配图片 yanghao------------------------------------
                            let isImg: boolean = false
                            if (selection && !selection?.isCollapsed) {
                                let imgReg = /<img.*?(?:>|\/>)/gi
                                // @ts-ignore：暂时无法解决
                                if (imgReg.test(selection?.anchorNode.outerHTML)) {
                                    const selectionRange = selection.getRangeAt(0)
                                    const startOffset = selectionRange.startOffset
                                    const container = selectionRange.startContainer
                                    const selectImg = container.childNodes[startOffset]
                                    // @ts-ignore：暂时无法解决
                                    html = selectImg.outerHTML
                                    isImg = true
                                } else {
                                    html = insertHtml(selection, topNode)?.trim()
                                }
                            }
                            if (!isImg) {
                                // 去除html的tag标签
                                let htmlText = html?.replace(/<.*?>/g, '')
                                let htmlTextLen = htmlText?.length ?? 0
                                // 当input中的text的长度大于等于选区的文字时
                                // 需要判断两者相同的长度的text内容是否相同
                                // 相同则只需把多余的部分添加上去即可，否则使用input中的内容
                                if (htmlTextLen <= text.length) {
                                    let startText = text.substring(0, htmlTextLen)
                                    let endText = text.substring(htmlTextLen)
                                    if (htmlText === startText) {
                                        text = html + endText
                                    }
                                }
                            } else {
                                // const end4Str = html.slice(html.length - 4)
                                // text = end4Str === '<br>' ? html.slice(0, html.length - 4) : html
                                text = html
                                console.log('text', text)
                            }
                            // ----------------------------------------------------------------------------------
                            // 链接为空，则不插入
                            if (!link) return
                            // 文本为空，则用链接代替
                            if (!text) text = link
                            // 校验链接是否满足用户的规则，若不满足则不插入
                            if (!checkLink(text, link)) return

                            /**
                             * 插入链接
                             * 1、针对首次插入链接，利用选区插入a标签即可
                             * 1、针对：<a><b>xxxx</b></a> 情况，用户操作修改或者替换链接时，编辑得到a，修改已有a标签的href
                             * 2、针对：<b><a>xxxx</a></b> 情况, 用户操作修改或者替换链接时，只要修改已有a标签的href
                             */

                            // 选区范围是a标签，直接替换href链接即可
                            if ($elem?.nodeName === 'A') {
                                $elem.setAttribute('href', link)
                                $elem.innerText = text

                                return true
                            }

                            // 不是a标签，并且为特殊元素, 需要检查是不是首次设置链接，还是已经设置过链接。
                            if ($elem?.nodeName !== 'A' && EXTRA_TAG.includes($elem.nodeName)) {
                                const nodeA = getParentNodeA($selectionContainerElem)

                                // 防止第一次设置就为特殊元素，这种情况应该为首次设置链接
                                if (nodeA) {
                                    // 链接设置a
                                    nodeA.setAttribute('href', link)

                                    // 文案还是要设置刚开始的元素内的文字，比如加粗的元素，不然会将加粗替代
                                    $elem.innerText = text

                                    return true
                                }
                            }

                            // 首次插入链接
                            insertLink(text, link)

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        },
                        bindEnter: true,
                    },
                    // 取消链接
                    {
                        selector: '#' + btnDelId,
                        type: 'click',
                        fn: () => {
                            // 执行取消链接
                            delLink()

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        },
                    },
                ],
            }, // tab end
        ], // tabs end
        /**
         * 设置input的值，分别为文案和链接地址设置值
         *
         * 利用dom 设置链接文案的值，防止回填拼接引号问题, 出现xss攻击
         *
         * @param $container 对应上面生成的dom容器
         * @param type text | link
         */
        setLinkValue($container: DomElement, type: string) {
            let inputId = ''
            let inputValue = ''
            let inputDom

            // 设置链接文案
            if (type === 'text') {
                inputId = `#${inputTextId}`
                inputValue = text
            }

            // 这只链接地址
            if (type === 'link') {
                inputId = `#${inputLinkId}`
                inputValue = link
            }

            inputDom = $container.find(inputId).elems[0] as HTMLInputElement

            inputDom.value = inputValue
        },
    }

    return conf
}
