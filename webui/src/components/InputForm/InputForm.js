import React from 'react';
import PropTypes from 'prop-types';


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter a few words to start your Plot here.',
            resp: 'Enter a prompt and submit. Another thing to say.',
            actPrompts: [],
            awaitPrompts: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAndThen = this.handleAndThen.bind(this);
    }

    async nextLine(s) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seed: s })
        };
        var resp = await fetch('https://e88ff614.us-south.apigw.appdomain.cloud/startrek_plots/v1', requestOptions)
            .then(response => response.json())
            .then(data => {return data.output[0][1]; })//this.setState({ resp: data.output[0][1]}));
        console.log("nextLine", resp)
        return resp;
    }

    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
        // alert('An essay was submitted: ' + this.state.value);
        this.setState({resp: "Waiting on plot.", awaitPrompts: true})
        // Simple POST request with a JSON body using fetch
        this.nextLine(this.state.value).then(e => {
            console.log('submit', e)
            this.setState({resp: e})
            }
        )
        event.preventDefault();
    }

    async andThen(text) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        };
        const splitSentances = await fetch('https://e88ff614.us-south.apigw.appdomain.cloud/startrek_plots/sent_split', requestOptions)
            .then(response => response.json())
            .then(data => {return data.output});

        console.log('data', splitSentances);
        var acts = splitSentances
        // data.output.forEach((e, i)=> {
        var i = 1
        for (const e of splitSentances) {
            console.log(e)
            await this.nextLine(e).then(d => {
                console.log("handlAndThen",d)
                acts[i] = "Act " + i.toString() + ": " + d
                console.log(acts[i]);
            })
            i += 1
        }
        console.log(acts)
        return acts

    }
    handleAndThen(event) {
        var textToExpand = this.state.resp
        this.setState({resp: "And thennnn."})
        // Simple POST request with a JSON body using fetch
        this.andThen(textToExpand).then(actsArray => {
            this.setState({resp: actsArray.toString()})
                        })

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Prompt:
                        <textarea value={this.state.value} onChange={this.handleChange} />        </label>
                    <input type="submit" value="Submit" />
                </form>
                <p/>
                <p>{this.state.resp}</p>
                <button onClick={this.handleAndThen}>And then</button>
            </div>
        );
    }
}


export default InputForm;
