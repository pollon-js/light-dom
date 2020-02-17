import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { name, version, homepage, author, license } from '../package.json'
import babelConfig from './babel.config.js'


const nameToFilename = ( name ) =>{
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    name = name.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    
    if( 0 == name.indexOf('pollon-') ){
        return name.substring('pollon-'.length)
    }
    return name
}


const preamble = `/* ${name} - v${version}
* ${homepage}
* ${new Date().getFullYear()} ${author}. Licensed ${license} */`

export default {
    input: './src/index.js',
    output: [
        {
            file: `./dist/${nameToFilename(name)}.amd.js`,
            format: 'amd'
        },
        {
            file: `./dist/${nameToFilename(name)}.system.js`,
            format: 'system'
        }
    ],
    plugins: [
        resolve({ browser: true }),
        babel(babelConfig),
        terser({ output: { preamble } })
    ]
}