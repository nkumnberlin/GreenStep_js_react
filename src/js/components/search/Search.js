import React from 'react'
import { Button, Form, Label, Segment } from 'semantic-ui-react'

const Search = () => (
<Segment stacked>
    <Form>
        <Form.Group unstackable widths={2}>
            <Form.Input label='Departure' placeholder='Departure' />

        </Form.Group>
        <Form.Group widths={2}>
            <Form.Input label='Destination' placeholder='Destination' />

        </Form.Group>
        <Button type='submit'>Search</Button>
    </Form>
</Segment>
)

const test = {
    ready1: {
        key: "value"
    }
};

export default Search