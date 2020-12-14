import React from 'react'
import { Row, Spinner } from 'reactstrap'

const SpinnerComp = () => {
    return (
        <Row className="w-100 m-0 p-0 d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}} >
            <Spinner />
        </Row>
    )
}

export default SpinnerComp
