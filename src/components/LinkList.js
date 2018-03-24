import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// 1
export const FEED_QUERY = gql`
  # 2
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {result => {
          if (result.loading) return <div>Loading</div>
          if (result.error) return <div>Error</div>

          const { data } = result
          const linksToRender = data.feed.links

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link
                  key={link.id}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                  index={index}
                  link={link}
                />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }

  _updateCacheAfterVote = (store, createVote, linkId) => {
    // 1
    const data = store.readQuery({ query: FEED_QUERY })

    // 2
    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    // 3
    store.writeQuery({ query: FEED_QUERY, data })
  }
}

export default LinkList
