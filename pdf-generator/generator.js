const Jimp = require('jimp');
const fs = require('fs');
const pdf = require('html-pdf');
const randomstring = require("randomstring");
const randomName = require('node-random-name');
const randomColor = require('randomcolor');
const randomFont = require('random-font');
const {PDFDocument} = require('pdf-lib');
const faker = require('faker');
const now = require("performance-now");


const blockTags = ['div', 'span'];
const tags = [
    'div',
    'span',
    'p',
    'b',
    'big',
    'small',
    'i',
    's',
    'strike',
    'u',
    'tt',
    'ruby',
    'rt',
    'rp',
    'rb',
];

let links = getLinks();
let images = getImages();

async function generatePdf() {
    const amount = 100;
    let pdfsNames = [];
    let c = 1;
    let start = new Date().getTime();
    while (c < amount) {
        console.log(c);

        //start[1]
        let fileName = randomstring.generate(15);
        pdfsNames.push(fileName);
        let imageData = await getRandomImage();

        //end[1] 1000ms


        const options = {
            height: `${imageData.height + 10}px`,
            width: `${imageData.width}px`,
            format: 'Letter',
            timeout: 30000,
            border: '0px',
        };


        //start[2]
        const html = await createHTML(imageData);
        //end[2] 37ms

        //start[3]
        pdf.create(html, options).toBuffer(async function (err, res) {
            if (err) return console.log(err);
            const pdfDoc = await PDFDocument.load(res);
            pdfDoc.setAuthor(faker.name.findName());
            pdfDoc.setCreator(faker.name.findName());
            pdfDoc.setProducer(faker.name.findName());
            pdfDoc.setTitle(randomstring.generate(getRandomInt(100, 200)));
            pdfDoc.setSubject(randomstring.generate(getRandomInt(100, 200)));
            pdfDoc.setKeywords(getRandomStringArray(getRandomInt(10, 50), getRandomInt(10, 20)));
            const pdfBytes = await pdfDoc.save();
            fs.writeFile(`results/${fileName}.pdf`, pdfBytes, () => {
                //end[3] 1500ms
            });
        });
        c++;

    }
    let total = (new Date().getTime() - start) / 1000;
    writeNamesToFile(pdfsNames);
    console.log(`${amount} pdfs generated: ${total} seconds`);
}

function writeNamesToFile(names) {
    let file = fs.createWriteStream('file-names.txt');
    names.forEach(name => (file.write(name + '.pdf' + '\n')));
}

function getLinks() {
    let text = fs.readFileSync('links.txt', 'utf-8');
    return text.split('\n');
}

async function createHTML(imageData) {
    let styles = [
        `background-color: ${getRandomColor()};`,
        `width: ${imageData.width}px;`,
        `height: ${imageData.height}px;`,
    ];
    mix(styles);
    const url = getRandomUrl();
    const head = generateRandomHead();
    const body = generateRandomBody(url, imageData.img);
    const start = `<html style="${styles}">`;
    const end = '</html>';
    return start + head + body + end;
}

function generateRandomBody(url, imgContent) {
    let blocks = generateRandomBlocks();
    let styles = [
        'display; block;',
        'top: 0;',
        'left: 0;',
        'width: 100%;',
        `z-index: ${getRandomInt(100, 10000)};`,
        'margin-left: auto;',
    ];
    mix(styles);
    const image = `<a style="${styles}" href="${url}">
                        <img style="width: 100%" src="${imgContent}"/>
                  </a>`;
    blocks.push(image);
    mix(blocks);
    mix(blocks);
    return blocks.reduce((a, b) => a + b, '<body>') + '</body>';
}

function getRandomStyle() {
    const dimensions = ['rem', 'px'];
    const displayNone = 'display: none; ';
    let styles = [
        `color:${getRandomColor()}; `,
        `margin: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `margin-top: ${getRandomInt(-1000, 0)}${getRandomValueFromList(dimensions)}; `,
        `margin-left: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `margin-right: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `margin-bottom: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `padding: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `padding-top: ${getRandomInt(-600, 0)}${getRandomValueFromList(dimensions)}; `,
        `padding-left: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `padding-right: ${getRandomInt(0, 600)}${getRandomValueFromList(dimensions)}; `,
        `padding-bottom: ${getRandomInt(-600, 0)}${getRandomValueFromList(dimensions)}; `,
        `font-size: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `font-weight: ${getRandomInt(0, 700)}; `,
        `font: ${randomFont()}; `,
        `letter-spacing: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `width: ${getRandomInt(0, 50)}; `,
        `height: ${getRandomInt(0, 1)}; `,
        `background-color: ${getRandomColor()}; `,
        `top: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `left: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `right: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `bottom: ${getRandomInt(0, 100)}${getRandomValueFromList(dimensions)}; `,
        `z-index: ${getRandomInt(-10000, 0)}; `,
    ];
    mix(styles);
    mix(styles);
    styles.splice(3, 7);
    styles.push(displayNone);
    return styles.reduce(((a, b) => a + b), '');
}

function generateRandomBlocks() {
    const amount = getRandomInt(10, 20);
    let blocks = [];
    for (let i = 0; i < amount; i++) {
        blocks.push(generateRandomBlock());
    }
    for (let i = 0; i < amount; i++) {
        blocks.push(generateRandomEmptyBlock());
    }
    return blocks;
}

function getImages() {
    return fs.readdirSync('images/');
}

function generateRandomEmptyBlock() {
    const tag = getRandomValueFromList(blockTags);
    return `<${tag} style="${getRandomStyle()}"></${tag}>`;
}

function generateRandomBlock() {
    const tag = getRandomValueFromList(blockTags);
    const html = generateDeepHtmlBlock();
    return `<${tag} style="${getRandomStyle()}">${html}</${tag}>`;
}

function generateDeepHtmlBlock() {
    let block = '';
    const deep = getRandomInt(1, 10);
    let addedTags = [];
    let deepBlockStyles = ['position: fixed;', 'top: 0;', 'left: 0;', 'height: 0;', 'display: none;'];
    mix(deepBlockStyles);
    for (let i = 0; i < deep; i++) {
        let tag = getRandomValueFromList(tags);
        addedTags.push(tag);
        block += `<${tag} style="${deepBlockStyles}">`;
        if (Math.random() >= 0.5) {
            block += generateSimpleHtmlBlocks(getRandomInt(1, 10));
        }
    }
    addedTags.reverse().forEach(tag => block += `</${tag}>`);
    return block;
}

function generateSimpleHtmlBlocks(amount) {
    let blocks = '';
    for (let i = 0; i < amount; i++) {
        blocks += generateSimpleBlock();
    }
    return blocks;
}

function generateSimpleBlock() {
    const tag = getRandomValueFromList(tags);
    return `<${tag} style="${getRandomStyle()}">${randomstring.generate(getRandomInt(1, 2))}</${tag}>`;
}

function getRandomValueFromList(list) {
    return list[Math.floor(Math.random() * list.length)]
}

async function getRandomImage() {
    const imageSource = getRandomImageSource();
    let image = await Jimp.read(imageSource);
    let resizeDelta = getRandomInt(-100, 100);
    let height = image.bitmap.height + resizeDelta;
    let width = image.bitmap.width + resizeDelta;
    await image
        .resize(width, height)
        .quality(getRandomInt(80, 100))
        .brightness(getRandomFloat(-0.15, 0.15))
        .contrast(getRandomFloat(-0.15, 0.15))
        .dither565()
        .fade(getRandomFloat(0, 0.1))
        .opacity(getRandomFloat(0.9, 1))
        .opaque();
    let base64Image = await image.getBase64Async(Jimp.AUTO);
    return {img: base64Image, height, width};
}

function getRandomUrl() {
    return getRandomValueFromList(links);
}

function generateRandomHead() {
    const metaCharSet = '<meta charset="utf-8"/>';
    const title = generateRandomTitle();
    const metaDescription = generateRandomMetaDescription();
    const author = generateRandomAuthor();
    const creator = generateRandomCreator();
    const refresh = generateRandomRefresh();

    let elements = [metaCharSet, title, metaDescription, author, refresh, creator];
    mix(elements);
    return elements.reduce((a, b) => a + b, '<head>') + '</head>';
}

function mix(array) {
    array.sort(() => Math.random() - 0.5);
}

function generateRandomAuthor() {
    return `<meta name="author" content="${randomName()}"/>`;
}

function generateRandomCreator() {
    return `<meta name="creator" content="${randomName()}"/>`;
}

function generateRandomRefresh() {
    return `<meta http-equiv="refresh" content="${getRandomInt(30, 10000)}"/>`
}

function generateRandomMetaDescription() {
    return `<meta name="description" content="${randomstring.generate(getRandomInt(50, 160))}"/>`
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomTitle() {
    return `<title>${randomstring.generate(getRandomInt(50, 80))}</title>`;
}

function getRandomImageSource() {
    return `images/${getRandomValueFromList(images)}`;
}

function getRandomColor() {
    return randomColor({
        luminosity: 'random',
        hue: 'random'
    });
}

function getRandomStringArray(length, stringMaxLength) {
    return Array.apply(null, Array(length)).map(function () {
        return randomstring.generate(stringMaxLength);
    });
}

generatePdf();
