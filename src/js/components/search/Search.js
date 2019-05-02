import React from 'react'
import { Button, Form, Label } from 'semantic-ui-react'

const Search = () => (
    <Form>
        <Form.Group unstackable widths={2}>
            <Form.Input label='Departure' placeholder='Departure' />

        </Form.Group>
        <Form.Group widths={2}>
            <Form.Input label='Destination' placeholder='Destination' />

        </Form.Group>
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Button type='submit'>Submit</Button>
    </Form>
)

const test = {
    ready1: {
        key: "value"
    }
};

export default Search