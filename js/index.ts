import {loadAddon} from "./loadAddon";

const addonName = `tinyfiledialogs-node-${process.platform}-${process.arch}.node`
const mod = loadAddon(addonName, [__dirname])

function pickFile(filters, allowMultiple) {
	if (Array.isArray(filters)) {
		filters = filters.filter(x => typeof x == 'string')
		.map(f => f.startsWith('*.') ? f : `*.${f}`)
	}
	return mod.pickFile(filters, allowMultiple)
}

function popup(title: string, msg: string) {
	mod.popup(title || 'Alert', String(msg || 'Empty'));
}

const {pickFolder, inputBox, saveFileDialog} = mod
export {pickFolder, inputBox, saveFileDialog, pickFile, popup}
