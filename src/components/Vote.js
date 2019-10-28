import React, { Fragment, Component } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { message, Button, Row, Col, Layout, Empty, Avatar, Icon } from 'antd'
import { Link } from "react-router-dom";



class Vote extends Component {
    constructor(props) {
        super(props)
        this.getCandidates = this.getCandidates.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.state = { candidates: [] }
    }


    getCandidates(cb) {
        axios.get('http://localhost:8080/candidates').then(({ data }) => {
            this.setState({ candidates: data.candidates })
            cb()
        }).catch((e) => {
            message.warn('Network Error')
        })
    }

    componentDidMount() {
        this.getCandidates(() => {
            message.info('Successfully Retrieved')
        })
    }

    handleVote(param) {
        axios.post(`http://localhost:8080/vote/${param}`).then(() => {
            message.success("Vote Issued Successfully")
        }).catch(() => {
            message.warn("Error")
        })
    }


    render() {
        const { candidates } = this.state
        const { Content } = Layout
        return (
            <Fragment>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280, textAlign: 'center' }}>
                        {candidates.length !== 0 ? (
                            <h1>
                                <span><Icon type="check" /></span> Vote
                            </h1>
                        ) : (
                                <Empty
                                    description="No Candidates Available"
                                />
                            )}
                        <Row
                            style={{ marginBottom: '50px' }}
                            gutter={[40, 40]}>
                            {candidates && candidates.map((candidate) => {
                                return (
                                    <Col
                                        xs={24}
                                        md={12}
                                        key={candidate._id}>
                                        <div
                                            style={{ border: '1px solid aquamarine', padding: '20px 10px' }}
                                        >

                                            <Avatar shape="square" size={200} icon="user" />
                                            <p>Name: {candidate.FirstName + " " + candidate.LastName} </p>
                                            <p>Email: {candidate.Email} </p>
                                            {/* {candidate.Bio && <p>Bio: {candidate.Bio}</p>} */}
                                            <Button
                                                id={candidate._id}
                                                onClick={(e) => {
                                                    this.handleVote(e.target.id);
                                                }}
                                                type="primary">
                                                Vote For Me!
                                        </Button>
                                            <Button
                                                icon="eye"
                                                id={candidate._id}
                                                type="link"
                                            >
                                                <Link to={`/candidate/${candidate._id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </Content>
            </Fragment>
        )
    }
}


export default Vote