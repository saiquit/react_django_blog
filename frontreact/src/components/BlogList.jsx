import React from 'react'
import SingleCard from './SingleCard'
const BlogList = ({blogs}) => {
    return (
        <div>
            {blogs && blogs.map((blog, i) => <SingleCard blog={blog} key={i} />)}
        </div>
    )
}

export default BlogList
