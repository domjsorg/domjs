
import pkg from 'gulp';
const { series, src, dest, parallel, watch } = pkg;
import processhtml from 'gulp-processhtml';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import writeheader from 'gulp-header';
import fs from 'fs';
import config from './config.cjs';
import { createServer } from 'http';

function demos() {
    const components = [];
    const toolsDir = fs.readdirSync(`../${config.SRC_TOOLS}`);
    let write_demo = '';
    const component_model = {
        alias: '',
        component: '',
        custom: '',
        description: '',
        name: '',
        script: '',
    }
    
    toolsDir.forEach(tool => {
        
        let component_values = {...component_model};
         
        // Check if file is a directory
        let component = `../${config.SRC_TOOLS}/${tool}`;

        if (fs.lstatSync(component).isDirectory()) {

            fs.readdirSync(component).forEach(demof => {

                let demo = `${component}/${demof}`;

                if (fs.lstatSync(demo).isDirectory()) {

                    fs.readdirSync(demo).forEach(file => {

                        let filepath = `${demo}/${file}`;

                        if (filepath.endsWith(".js")) {

                            let alias = file.replace('.js', '');
                            
                            const scriptContent = getScript(filepath);
                            
                            component_values.alias = alias;
                            component_values.code = scriptContent.code;
                            component_values.custom = `demo-${alias}`;
                            component_values.name = tool;
                            component_values.script = scriptContent.fullcontent;
                        }
                        if (filepath.endsWith(".md")) {
                            component_values.description = getScript(filepath).fullcontent;
                        }

                    })

                } else {
                    component_values.component = demof;
                }

            })

        }

        if (component_values.alias) {
            components.push(component_values);
        }

    })

    write_demo = `
        window.demodom = {};
        window.demodom.components = ${JSON.stringify(components)};
        `;
    
    return src('demos_base.js')
        .pipe(sourcemaps.init())
        .pipe(concat(`index.js`))
        .pipe(writeheader(write_demo))
        .pipe(writeheader(getScript('reload.js').fullcontent))
        .pipe(terser())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(`../${config.OUTPUT_DIR}/js/demos`))
}


function html() {
    return src(`../${config.SRC_DIR}/index.html`)
        .pipe(processhtml())
        .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, minifyCSS: true }))
        .pipe(dest(`../${config.OUTPUT_DIR}`))
}

const clients = [];

function watchChanges() {
    

    const watcher = watch(`../src/**/*`, parallel(html, demos));
    watcher.on('all', (path, stats) => {
        console.log(`Gulp: ${path} - ${stats}`);
    })

    const changed = watch(`../demo/**/*`, parallel(demoDistribution));
    changed.on('all', (path, stats) => {
        console.log(`Complete: ${path} - ${stats}`);
    })

    createServer((req, res) => {
        return clients.push(
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
        }),
        );
    }).listen(config.PORT_RELOAD);
}

function demoDistribution(cb) {
    clients.forEach((res) => res.write("data: update\n\n"));
    clients.length = 0;
    console.log(`Gulp: demo changed`);
    cb();
}

function getScript(file) {
    
    const object = {
        content: '',
        fullcontent: fs.readFileSync(file, 'utf8'),
        code: null
    }

    if (file.endsWith(".js")) {
        object.content = object.fullcontent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
        
        const codeList = object.fullcontent.match(/\/\/\:([\s\S]*?)\/\/\!/gm);

        if (null !== codeList) {
            object.code = codeList.map(code => {
                return {
                    comment: code.match(/(?<=\/\/\:)(.*)/gm)[0].trim(),
                    script: code.match(/(?<=\/\/\@)([\s\S]*?)(?=\/\/\!)/gm)[0]
                }
            });
        }

    }
    
    return object;
}

export { demos, html, watchChanges };