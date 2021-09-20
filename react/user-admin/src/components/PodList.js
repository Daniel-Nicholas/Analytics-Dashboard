import React, { Component } from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';

class PodList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
         axios.get('http://localhost:3080/api/pods')
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

  
    deletePod(name, namespace) {
        console.log("Name: ", name, "namespace: ", namespace);
            axios.delete(`http://localhost:3080/api/pods/${ name }/${ namespace }`)
            .then((response) => {
                console.log('#### axios.delete response: ', response);
            }, (error) => {
                console.log(error);
            });
        }


    render() {
        const { posts, errorMsg } = this.state
        return (
            <Paper>
            <div>
                <div class="neo-widget__header neo-icon-customer">
                    Pods
                </div>

                <div>
                    <div className="neo-widget__content neo-widget__content--indented">
                        <div className="row">
                            {/* <Paper> */}
                                <table
                                    id="neo-sort-example"
                                    class="neo-table neo-table--sortable">
                                    <tr>
                                        <th>name</th>
                                        <th>nameSpace</th>
                                        <th>creationTimestamp</th>
                                        <th>ready</th>
                                        <th>restartCount</th>
                                        <th>phase</th>
                                        <th>Actions</th>
                                    </tr>

                                    {
                                        posts.length ?
                                            posts.map(posts =>
                                                <tr>
                                                    <td>{posts.metadata.name}</td>
                                                    <td>{posts.metadata.namespace}</td>
                                                    <td>{posts.metadata.creationTimestamp}</td>
                                                    {posts.status.containerStatuses.ready = true ? <td style={{backgroundColor: 'green'}}>Ready</td> : <td style={{backgroundColor: 'red'}}>Not Ready</td>}
                                                    <td>{posts.status.containerStatuses.restartCount}</td>
                                                    <td>{posts.status.phase} </td>
                                                    <td><button  class="neo-btn neo-btn--warning neo-icon-trash" onClick={() => this.deletePod(posts.metadata.name, posts.metadata.namespace)}></button></td> 
                                                </tr>
                                            ) :
                                            null
                                    }
                                </table>
                            {/* </Paper> */}
                        </div>
                    </div>
                </div>
                { errorMsg ? <div>{errorMsg}</div> : null}
                {}
            </div>
            </Paper>
        )
    }
}

export default PodList

