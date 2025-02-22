const path = require('path')

  module.exports.loadAddon = function loadAddon(addonName, extraPaths = []) {
  const triesPaths = Array()
  const tryRequire = (filePath) => {
   try {
    return require(filePath);
   } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
   triesPaths.push(filePath);
   return null;
   }
  };
  // Try extra paths first
  for (const extraPath of extraPaths) {
  const addon = tryRequire(path.join(extraPath, addonName));
  if (addon){
   return addon;
  }
  }

  // Try loading from build/Release
  if (1) {
   const addon= tryRequire(path.join(__dirname, 'build', 'Release', addonName));
   if (addon) return addon;
  }
  // Try loading from the same directory as the main script
  if (require?.main?.filename) {
   const addon = tryRequire(path.join(path.dirname(require.main.filename), addonName));
   if (addon) return addon;
  }
  // Try loading from the same directory as this script
  if (1) {
  const  addon = tryRequire(path.join(__dirname, addonName));
 if (addon) return addon;
  }
  throw new Error(`Failed to load tinyfiledialogs addon. Tried paths:\n${triesPaths.join("\n")}`);
}






