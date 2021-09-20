import React, { Component } from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';


class ConfigMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

   
    componentDidMount() {
        axios.get('http://localhost:3080/api/config-map')
            .then(response => {
                console.log(response)
                this.setState({ posts: response.data.items })
                console.log('#### Config Map data received ####')
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
                    Config Map
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
                                    </tr>
                                   
                                    {
                                        posts.map(posts => 
                                            <tr style={{wordBreak: 'break-all'}}>
                                                <td>{JSON.stringify(posts, null, '\n')}</td>
                                            </tr>)
                                    }

                                    
                                </table>
                            </Paper>
                        </div>
                    </div>
                </div>
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div>

        )
    }
}

export default ConfigMap


