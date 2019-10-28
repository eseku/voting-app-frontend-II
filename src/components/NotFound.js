import React, { Fragment } from 'react'
import 'antd/dist/antd.css'
import { Empty, Button } from 'antd'
import { Link } from 'react-router-dom'


const NotFound = () => (
    <Fragment>
        <div style={{
            position: 'fixed',
            width: '500px',
            height: '200px',
            marginTop: '-100px',
            marginLeft: '-250px',
            top: '50%',
            left: '50%'
        }}>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <div
                        style={{ marginTop: '20px' }}
                    >
                        <h1>404 Not Found</h1>
                        <Button>
                            <Link to="/">Go Home</Link>
                        </Button>
                    </div>
                }
            />
        </div>
    </Fragment>
)

export default NotFound