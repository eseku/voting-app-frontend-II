import React, { Fragment, Component } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { message, Row, Col, Typography, Layout, Empty, Avatar, Icon, Alert } from 'antd'

class Results extends Component {
    constructor(props) {
        super(props)
        this.getVotes = this.getVotes.bind(this)
        this.state = { votes: [], candidates: [] }
    }


    getVotes() {
        axios.get('http://localhost:8080/results').then(({ data }) => {
            this.setState({ candidates: data.candidates, votes: data.votes })
            message.success("Vote data retrieved succcessfully");
            this.collateResults()
        }).catch((e) => {
            message.warn('Network Error')
        })
    }


    collateResults() {
        const { votes, candidates } = this.state
        const votingResults = {}


        for (const candidate of candidates) {
            const candidate_id = candidate._id
            let totalVotesForCandidate = 0


            for (const vote of votes) {
                if (vote.candidate === candidate_id) totalVotesForCandidate++
            }


            votingResults[candidate._id] = totalVotesForCandidate
        }

        const entries = Object.entries(votingResults)
        let largest = 0
        let least = entries[0][1]
        // console.log(entries[0][1]);

        entries.forEach((entry) => {
            if (entry[1] > largest) {
                largest = entry[1]
            }

            if (entry[1] <= least) {
                least = entry[1]
            }
        })

        // console.log(least, 'least');

        this.setState({ winner: largest, least })

        // let winner = entries.filter((entry) => {
        //     return entry[1] === largest
        // });




        // this.setState({ winner })
        // this.setState((prevState) => (
        //     { winner: prevState[0][0] }
        // ))
        this.setState({ votingResults })
    }


    componentDidMount() {
        this.getVotes()
    }


    render() {
        const { votingResults, candidates, winner, least } = this.state
        const { Content } = Layout;
        const { Text } = Typography


        return (
            <Fragment>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280, textAlign: 'center' }}>
                        {candidates.length === 0 ? (
                            <Empty
                                description="No Candidates Available"
                            />
                        ) : (
                                <h1>
                                    <span>
                                        <Icon type="container" />
                                    </span>
                                    Results
                                </h1>
                            )}
                        <Row
                            style={{ marginBottom: '50px' }}
                            gutter={[40, 40]}>
                            {candidates.map((candidate) => (
                                <Col
                                    xs={24}
                                    md={12}
                                    key={candidate._id}>
                                    <div
                                        style={{ border: '1px solid aquamarine', padding: '20px 10px' }}
                                    >
                                        {votingResults && votingResults[candidate._id] === winner &&
                                            <Alert style={{ marginBottom: '5px' }}
                                                message="Winner!"
                                                type="success"
                                                closable
                                            />}
                                        {votingResults && votingResults[candidate._id] === least &&
                                            <Alert style={{ marginBottom: '5px' }}
                                                message="Loser"
                                                type="error"
                                                closable
                                            />}
                                        <Avatar shape="square" size={200} icon="user" />
                                        <p>{`${candidate.FirstName} ${candidate.LastName}`}</p>
                                        <p> {candidate.Email} </p>
                                        <Text > Votes: {votingResults && votingResults[candidate._id]} </Text>
                                    </div>
                                </Col>
                            ))}

                        </Row>
                    </div>
                </Content>

            </Fragment>
        )
    }
}

export default Results