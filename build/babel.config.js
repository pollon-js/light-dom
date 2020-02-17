export default {
    exclude: 'node_modules/**',
    
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'false',
                targets: {
                    browsers: '> 1%, IE 11, not op_mini all, not dead'
                }
            }
        ]
    ]
}