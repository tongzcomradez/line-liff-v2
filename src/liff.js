export const Liff = window.liff

export const close = () => {
    Liff.closeWindow()
}

export const sendMessgae = async () => {
    const text = document.getElementsByName('message')[0].value
    const body = [
        {
            type: 'text',
            text,
        },
        {
            type: 'text',
            text: 'Hello'
        },
    ]

    try {
        await Liff.sendMessages(body)
        close()
    } catch (e) {
        console.log(e)
    }
}

export const isInClient = () => {
    if (Liff.isInClient()) {
        alert(`ตอนนี้ Online อยู่บน Line Mobile Application`)
    } else {
        alert(`ตอนนี้ Online อยู่บน Web Browser`)
    }
}

export const getOS = () => {
    alert(`ระบบที่คุณใช้อยู่ตอนนี้คือ ${Liff.getOS()}`)
}

export const login = () => {
    Liff.login()
}

export const scanCode = async () => {
    const result = await Liff.scanCode()
    const stringifiedResult = JSON.stringify(result)
    alert(stringifiedResult)
}

export const getProfile = async () => {
    return Liff.getProfile()
}

export const logout = () => {
    Liff.logout()
}

export const getLanguage = () => {
    alert(`ภาษาที่ใช้คือ ${Liff.getLanguage()}`)
}

export const openWindow = () => {
    Liff.openWindow({
        url: 'https://line.me',
        external: true
    });
}
