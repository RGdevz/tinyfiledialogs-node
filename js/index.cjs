const {loadAddon} = require('./loadAddon.cjs')

const addonName = `tinyfiledialogs-node-${process.platform}-${process.arch}.node`
const mod = loadAddon(addonName, [__dirname])

function pickFile(filters, allowMultiple) {
	if (Array.isArray(filters)) {
	filters = filters.filter(x => typeof x == 'string')
	.map(f => f.startsWith('*.') ? f : `*.${f}`)
	}
	return mod.pickFile(filters, allowMultiple)
}

function popup(title, msg) {
	mod.popup(title || 'Alert', String(msg || 'Empty'));
}

module.exports = {
	pickFolder : mod.pickFolder,
	inputBox : mod.inputBox,
	saveFileDialog:mod.saveFileDialog,
	pickFile,
	popup

}
