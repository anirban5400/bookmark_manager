const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
const dir = path.join(__dirname, 'component-library', 'assets', 'fonts', 'poppins');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    }
};

https.get(url, options, (res) => {
    let css = '';
    res.on('data', d => css += d);
    res.on('end', async () => {
        const matches = [...css.matchAll(/url\((https:\/\/[^)]+)\)/g)];
        let localCss = css;
        
        for (let i = 0; i < matches.length; i++) {
            const fontUrl = matches[i][1];
            const fileName = fontUrl.split('/').pop(); // e.g. pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2
            const localPath = path.join(dir, fileName);
            
            console.log(`Downloading: ${fileName}`);
            await new Promise((resolve, reject) => {
                https.get(fontUrl, (res2) => {
                    const file = fs.createWriteStream(localPath);
                    res2.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                }).on('error', reject);
            });
            
            localCss = localCss.replace(fontUrl, `./${fileName}`);
        }
        
        fs.writeFileSync(path.join(dir, 'poppins.css'), localCss);
        console.log('All fonts downloaded and poppins.css created successfully!');
    });
}).on('error', err => console.error(err));
