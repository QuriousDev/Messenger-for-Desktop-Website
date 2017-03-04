const slug = 'aluxian/Messenger-for-Desktop';
let getJSON = (url, successHandler, errorHandler) => {
    let xhr = new window.XMLHttpRequest()
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        let status;
        let data;
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

getJSON(`https://api.github.com/repos/${slug}/releases/latest`, (release) => {
    let latestVersion = release.tag_name.replace(/v/g, '');
    let releaseUrl = `https://github.com/${slug}/releases`;
    let assetList = window.assetList = {
        dmg: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-osx.dmg`,
        exe: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-win32-setup.exe`,
        deb32: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-linux-i386.deb`,
        deb64: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-linux-amd64.deb`,
        rpm32: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-linux-i386.rpm`,
        rpm64: `${releaseUrl}/download/v${latestVersion}/messengerfordesktop-${latestVersion}-linux-x86_64.rpm`
    }
}, (err) => {
    console.error(err);
});

let getAsset = window.getAsset = ((extension) => {
    location.href = window.assetList[extension];
});
