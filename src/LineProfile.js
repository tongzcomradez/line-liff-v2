import React, { Fragment, useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import {
    Liff,
    login,
    getOS,
    isInClient,
    sendMessgae,
    close,
    scanCode,
    getProfile,
    getLanguage,
    logout,
    openWindow,
} from './liff'

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

const LineActions = (props) => {
    const {
        handleLogout,
        handleGetProfile,
        handleGetToken,
    } = props

    return (
        <Fragment>
            <Row style={{ margin: 10 }}>
                <Col>
                    <input name='message' />
                </Col>
                <Col colspan={2}>
                    <Button block variant="primary" onClick={sendMessgae}>Send Message</Button>
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
                    <Button block variant="primary" onClick={handleGetProfile}>Get Profile</Button>
                </Col>
            </Row>
            <Row style={{ margin: 10 }}>
                <Col>
                    <Button block variant="success" onClick={handleGetToken}>Get Token</Button>
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
                            <Button block variant="danger" onClick={handleLogout}>Logout</Button> :
                            <Button block variant="warning" onClick={login}>Login</Button>
                    }
                </Col>
            </Row>

        </Fragment>
    )
}

const LineProfile = () => {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState('unknow token')

    const handleGetProfile = async () => {
        const profile = await getProfile()
        setProfile(profile)
    }

    const handleGetToken = () => {
        const accessToken = Liff.getAccessToken()
        setToken(accessToken)
    }

    const handleLogout = () => {
        logout()
        setProfile({})
    }

    useEffect(() => {
        if (Liff.isLoggedIn()) {
            handleGetProfile()
        }
    }, [])

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
                <LineActions
                    handleGetProfile={handleGetProfile}
                    handleGetToken={handleGetToken}
                    handleLogout={handleLogout}
                />
            </Col>
        </Row>
    )
}

export default LineProfile