const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')

let manifestVersions = [2, 3]
if (process.argv[2] && manifestVersions.includes(Number(process.argv[2]))) {
  manifestVersions = [Number(process.argv[2])]
}

for (let manifestVersion of manifestVersions) {
  console.log(`\nBuilding MV${manifestVersion} version`)
  let manifestFile = `manifest.mv${manifestVersion}.json`
  let manifestData = require(`../${manifestFile}`)
  fs.copyFileSync(`./${manifestFile}`, './manifest.json')
  let filename = `control_panel_for_twitter-${manifestData['version']}.mv${manifestVersion}.zip`
  execSync(`web-ext build --filename ${filename} --overwrite-dest`, {stdio: 'inherit'})
  console.log('Built:', path.resolve('./web-ext-artifacts', filename))
  fs.rmSync('./manifest.json')
}
