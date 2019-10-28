import React, { Component } from 'react'
import { message, Row, Col, PageHeader, Layout, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const { Content } = Layout;


class Candidate extends Component {
    constructor(props) {
        super(props)
        this.getProfile = this.getProfile.bind(this)
        this.state = { profile: {} }

    }

    getProfile() {
        axios.get(`http://localhost:8080/candidates/${this.props.match.params.id}`).then(({ data }) => {
            this.setState({ profile: data })
            message.success('Profile successfully retrieved')
        }).catch((e) => {
            console.log(e);
            message.error('Network error')
        })
    }


    componentDidMount() {
        this.getProfile()
    }


    render() {

        const { profile } = this.state

        return (<Content>
            <div style={{ background: '#fff', padding: 24, minHeight: 280, textAlign: 'center' }}>
                <PageHeader
                    ghost
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    onBack={() => window.history.back()
                    }
                    title="Candidate Profile"
                    subTitle=""
                />



                <Row gutter={[40, 40]} style={{ marginTop: '30px' }}>
                    <Col
                        span={24}>
                        <Avatar shape="square" size={200} icon="user" />
                        <h1>{`${profile.FirstName} ${profile.LastName}`}</h1>
                        <p style={{ color: 'blue' }} > {profile.Email} </p>
                        {profile.Bio && <p> {profile.Bio}</p>}
                        {/* <Text > Votes: {votingResults && votingResults[candidate._id]} </Text> */}
                    </Col>
                </Row>
            </div>
        </Content>)
    }
}


export default withRouter(Candidate)