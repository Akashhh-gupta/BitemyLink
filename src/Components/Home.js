import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function Home() {

    const [link, setLink] = useState()
    const [show, setShow] = useState(false)

    const onchange = (e) => {
        setLink(e.target.value)
    }

    const shortlink = async () => {
        console.log("Shortening your Link");
        const token = "a21e2524cbb0bcac84b0a7c73ab684229d9c68c2"
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "long_url": `${link}`, "domain": "bit.ly" })
        });
        const result = await response.json();
        setLink(result.link);
        setShow(true);
    }


    return (
        <div id='hometab'>
            <input type="text" id='link' placeholder='Paste your Link...' onChange={onchange} name='pasteLink' required />
            <input type="button" value="Generate" id='btn' onClick={shortlink} />
            <div id='flex_container'>
                <input type="text" id='link1' name='cpyLink' value={show ? link : ""} disabled />
                <CopyToClipboard text={show ? link : ""}>
                    <i className="fa-solid fa-copy" id='copybtn'></i>
                </CopyToClipboard>
            </div>
        </div >
    )
}

export default Home
