import React, { useEffect, useState } from 'react'
import { Card, Image, Container, Button, Row, Col } from 'react-bootstrap'
import { Liff } from './liff'

const ProfileDisplay = (props) => {
    const { pictureUrl, userId, displayName, token } = props
    return (
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={pictureUrl} />
            <Card.Body>
                <Card.Title>{userId}: {displayName}</Card.Title>
                <Card.Text>
                    {token}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

const LineProfile = () => {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState('unknow token')

    const Profile = () => {
        Liff.getProfile().then(res => {
            setProfile(res)
        })
    }

    const Logout = () => {
        Liff.logout()
        setProfile({})
    }

    const Login = () => {
        Liff.login()
    }
    const Token = () => {
        const accessToken = Liff.getAccessToken()
        setToken(accessToken)
    }

    const scanCode = () => {
        Liff.scanCode().then(result => {
            const stringifiedResult = JSON.stringify(result);
            alert(stringifiedResult);
        })
    }

    const sendMessgae = () => {
        const text = document.getElementsByName('message')[0].value
        console.log(text)
        Liff.sendMessages([
            {
                type: 'text',
                text,
            }
        ]).then(e => {
            close()
        })
    }

    const close = () => {
        Liff.closeWindow()
    }

    useEffect(() => {
        if (!Liff.isLoggedIn()) {
            // Liff.login()
        } else {
            Profile()

        }
    }, [])

    const getOS = () => {
        alert(Liff.getOS())
    }

    const getLanguage = () => {
        alert(Liff.getLanguage())
    }


    const openWindow = () => {
        Liff.openWindow({
            url: 'https://line.me',
            external: true
        });
    }
    
    const isInClient = () => {
        alert(Liff.isInClient())
    }

    return (
        <Row>
            <Col>
                {
                    Liff.isLoggedIn() && (
                        <ProfileDisplay {...profile} token={token} />
                    )
                }
            </Col>
            <Col>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <input name='message' />
                    </Col>
                    <Col colspan={2}>
                        <Button block variant="primary" onClick={sendMessgae}>send Message</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="primary" onClick={openWindow}>Open Window</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="primary" onClick={isInClient}>Is in Client</Button>
                    </Col>
                </Row>

                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="primary" onClick={Profile}>Get Profile</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="success" onClick={Token}>Get Token</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="success" onClick={getOS}>Get OS</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="success" onClick={getLanguage}>Get Language</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="success" onClick={scanCode}>ScanCode</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        <Button block variant="success" onClick={close}>Close</Button>
                    </Col>
                </Row>
                <Row style={{ margin: 10 }}>
                    <Col>
                        {
                            Liff.isLoggedIn() ?
                                <Button block variant="danger" onClick={Logout}>Logout</Button> :
                                <Button block variant="warning" onClick={Login}>Login</Button>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LineProfile