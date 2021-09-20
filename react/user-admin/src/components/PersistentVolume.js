import React, { Component } from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';

class PersistentVolume extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3080/api/storage')
            .then(response => {
                console.log(response)
                this.setState({ posts: response.data.items })
                console.log('#### response ####')
            })
            .catch(error => {
                console.log(error)
                this.setState({ errorMsg: '#### Error retrieving data ####' })
            })
    }

    render() {
        const { posts, errorMsg } = this.state
        return (
            <div>
                <div class="neo-widget__header neo-icon-customer">
                    Persistent Volume
                </div>

                <div>
                    <div className="neo-widget__content neo-widget__content--indented">
                        <div className="row">
                            <Paper>
                                <table
                                    id="neo-sort-example"
                                    class="neo-table neo-table--sortable">
                                    <tr>
                                        <th>name</th>
                                        <th>apiVersion</th>
                                        <th>storage</th>
                                        <th>ready</th>
                                        <th>phase</th>
                                        
                                    </tr>

                                    {
                                        posts.length ?
                                            posts.map(posts =>
                                                <tr>
                                                    <td>{posts.metadata.name}</td>
                                                    <td>{posts.spec.claimRef.apiVersion}</td>
                                                    <td>{posts.spec.capacity.storage}</td>
                                                    <td></td>
                                                    <td>{posts.status.phase}</td>
                                                </tr>
                                            ) :
                                            null
                                    }
                                </table>
                            </Paper>
                        </div>
                    </div>
                </div>
                { errorMsg ? <div>{errorMsg}</div> : null}
                {}
            </div>

        )
    }
}

export default PersistentVolume


