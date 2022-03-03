import React from 'react';
import PropTypes from 'prop-types';


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter a seed to start your Plot here.',
            resp: Array('Enter a prompt and submit.'),
            actPrompts: [],

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
            .then(data => {
                if ('output' in data) {
                    return data.output[0][1];
                } else { return s}})
            .catch(e => {
                console.error("Err ln 29: ", e)
            })
        return resp;
    }

    handleChange(event) {    this.setState({value: event.target.value});  }

    handleSubmit(event) {
        // alert('An essay was submitted: ' + this.state.value);
        this.setState({resp: ["Plot will appear here."], value: ["Computing new story..."]})
        // Simple POST request with a JSON body using fetch
        this.nextLine(this.state.value).then(e => {
            this.setState({resp: Array(e), value: "Beep. Bop. Beep. Boop. (That's computer for 'still working')."})
            return e
            }
        ).then(e => {
            this.andThen(e).then(s => {
                this.setState({resp: s, value: "All done. Enter another plot here to play again."})
            })
        })
            .catch(e => {
                console.error("Err ln 53: ", e)
            })
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
            .then(data => {return data.output})
            .catch(e => {
                console.error("Err ln 68: ", e)
            });

        const acts = [];
        // data.output.forEach((e, i)=> {
        let i = 1
        for (const e of splitSentances) {
            await this.nextLine(e).then(d => {
                acts[i] = "Act " + i.toString() + ": " + d
            }).catch(e => {
                console.error("Err ln 68: ", e)
            })
            i += 1
        }
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
        let k = 0
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" size="64" value={this.state.value} onChange={this.handleChange} />        </label>
                    <input type="submit" value="Submit" />
                </form>
                <p/>
                <div>
                    <code>{
                        this.state.resp.map((a,i) => {
                            k += 1
                            return(
                                <p key="{k}">{a}</p>
                        )
                        })
                    }</code>
                </div>

            </div>
        );
    }
}


export default InputForm;
