// check console
console.log(document.documentElement.outerHTML);

// content.js
window.addEventListener('load', () => {
    const urls = [
        'https://item.gmarket.co.kr/Item1',
        'https://example.com/',
        'https://example2.com'
    ];
    const type = [
        'Gmarket',
        'Auction',
        'Coupang'
    ];

    let urlidx = -1;
    
    urls.forEach((part, index) => {
        if (window.location.href.includes(part)) {
            urlidx = index;
        }
    });
    
    let platform = type[urlidx]

    if (urlidx !== -1) {
        alert(platform);
        fetch(chrome.runtime.getURL('popup_template.html'))
            .then(response => response.text())
            .then(data => {
                //load html
                let html = document.documentElement.outerHTML;

                let popup = document.createElement('div');
                popup.innerHTML = data;
                document.body.appendChild(popup);
                
                let message = popup.querySelector('#message');
                message.textContent = `Current URL: ${window.location.href}`;
                
                let closeButton = popup.querySelector('#close-button');
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(popup);
                });

                // Set the image source
                let image = popup.querySelector('#popup-image');
                if (image) {
                    image.src = chrome.runtime.getURL('images/icon.png');
                }
            });
    }
});
