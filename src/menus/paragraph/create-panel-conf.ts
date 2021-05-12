/**
 * @description link 菜单 panel tab 配置
 * @author wangfupeng
 */

import Editor from '../../editor/index'
import { getRandom } from '../../utils/util'
import operateElement from './operate-element'
import { PanelConf } from '../menu-constructors/Panel'
export default function (editor: Editor): PanelConf {
	// panel 中需要用到的id
	// 外边距
	const mtId = getRandom('margin-top-input')
	const mrId = getRandom('margin-right-input')
	const mbId = getRandom('margin-bottom-input')
	const mlId = getRandom('margin-left-input')
	// 内边距
	const ptId = getRandom('padding-top-input')
	const prId = getRandom('padding-right-input')
	const pbId = getRandom('padding-bottom-input')
	const plId = getRandom('padding-left-input')
	// 边框
	const bwId = getRandom('border-width-input')
	const bcId = getRandom('border-color-input')
	// 背景色
	const bgId = getRandom('background-color-input')
	// 确定按钮
	const btnOkId = getRandom('ok-button')

	const conf = {
		width: 380,
		height: 0,

		// panel 中可包含多个 tab
		tabs: [
			{
				// tab 的标题
				title: '段落',
				// 模板
				tpl: `<div>
								<div class="w-e-flex w-e-mt10">
									<label>外边距：</label>
										<span>
											上
											<input
											id="${mtId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											右
											<input
											id="${mrId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											下
											<input
											id="${mbId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											左
											<input
											id="${mlId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
								</div>
								<div class="w-e-flex w-e-mt10">
									<label>内边距：</label>
										<span>
											上
											<input
											id="${ptId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											右
											<input
											id="${prId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											下
											<input
											id="${pbId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											左
											<input
											id="${plId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
								</div>
								<div class="w-e-flex w-e-mt10">
									<label style="padding-left: 1em">边框：</label>
										<span>
											宽度
											<input
											id="${bwId}"
											type="text"
											class="w-e-w50"
											value="">
										</span>
										<span>
											颜色
											<input
											id="${bcId}"
											type="color"
											class="w-e-w50"
											value="">
										</span>
								</div>
								<div class="w-e-flex w-e-mt10">
									<label>背景色：</label>
										<span>
											<input
											id="${bgId}"
											type="color"
											class="w-e-w50"
											value="">
										</span>
								</div>
								<div class="w-e-button-container">
									<button id="${btnOkId}" type="button" class="right"> 确定 </button>
                </div>
              </div>`,
				// 事件绑定
				events: [
					{
						selector: '#' + btnOkId,
						type: 'click',
						fn: () => {
							editor.selection.restoreSelection()
							const $selectionElem = editor.selection.getSelectionRangeTopNodes()
							const options = {
								marginTop: document.getElementById(mtId)?.nodeValue,
								marginRight: document.getElementById(mrId)?.nodeValue,
								marginBottom: document.getElementById(mbId)?.nodeValue,
								marginLeft: document.getElementById(mlId)?.nodeValue,
								paddingTop: document.getElementById(ptId)?.nodeValue,
								paddingRight: document.getElementById(prId)?.nodeValue,
								paddingBottom: document.getElementById(pbId)?.nodeValue,
								paddingLeft: document.getElementById(plId)?.nodeValue,
								borderWidth: document.getElementById(bwId)?.nodeValue,
								borderColor: document.getElementById(bcId)?.nodeValue,
								backgroundColor: document.getElementById(bgId)?.nodeValue,
							}
							console.log('options', options)
							if ($selectionElem.length > 0) {
								$selectionElem.forEach((item: any) => {
									operateElement(item, options, editor)
								})
							}
						},
					},
				],
			}, // tab end
		], // tabs end
	}

	return conf
}
