import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Header, Icon, Divider, Confirm } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeNews } from './actions'
import { ParseArticle } from './RenderNews'

const ModerateNews = ({ news }) => {

    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedNews, setSelectedNews] = useState(null)

    const destroyNews = (news) => {
        deleteRequest(`news/${news.id}`).then((response) => {
            if (response.status === 200) {
                removeNews(news)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (<>
        <Header as="h3">News</Header>
        <div>
            {news.map((item, key) =>
                <div key={key}>
                    <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                        setOpenConfirm(true)
                        setSelectedNews(item)
                    }}></Icon>
                    <Confirm
                        open={openConfrim}
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={() => {
                            destroyNews(selectedNews)
                            setOpenConfirm(false)
                        }}
                    />
                    <ParseArticle item={item} showComments={false} />
                    <Divider />
                </ div>)}
        </ div>
    </>)
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
    }
}

const ConnectedModerateNews = connect(mapStateToProps)(ModerateNews)

export default ConnectedModerateNews
