import React, { Component } from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';

class Deployments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3080/api/deployments')
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

    myChangeHandler = (event) => {
        const { posts, errorMsg } = this.state;
        if(event.key === "Enter") {
            
            alert("user input: " + event.target.value);
            let namespace = posts.map(posts => (posts.metadata.namespace));
            let name = posts.map(posts => (posts.metadata.name));
            let value = parseInt(event.target.value); // User input

            console.log("Namespace: " , namespace);
            console.log("Name: " , name);
            console.log("Value: " , value);
           
            let data = {
                "namespace":namespace,
                "name":name,
                "replicas": value
            }
            console.log("#### data ####" + data)
           
            axios.post('http://localhost:3080/api/update-replica', data )
              .then((response) => {
                console.log(response);
                console.log('#### axios.post response ####')
              }, (error) => {
                console.log(error);
              });
        }
    }

    render() {
        const { posts, errorMsg } = this.state
        return (
            <div>
                <div class="neo-widget__header neo-icon-customer">
                    Deployments
                </div>
             
                <div>
                    <div className="neo-widget__content neo-widget__content--indented">
                        <div className="row">
                            <Paper>
                                <table
                                    id="neo-sort-example"
                                    class="neo-table neo-table--sortable">
                                    <tr>
                                        <th>NAME</th>
                                        <th>READY</th>
                                        <th>UP-TO-DATE</th>
                                        <th>AVAILABLE</th>
                                        <th>AGE</th>
                                        <th>REPLICAS</th>
                                    </tr>

                                    {
                                        posts.length ?
                                            posts.map(posts =>
                                                <tr>
                                                    <td>{posts.metadata.name}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{posts.metadata.availableReplicas}</td>
                                                    <td>{posts.metadata.creationTimestamp}</td>
                                                    <td>
                                                        <form>
                                                            <input
                                                                type="text" pattern="[0-9]*"
                                                                onKeyPress={this.myChangeHandler}
                                                            />
                                                        </form>
                                                    </td>
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

export default Deployments

