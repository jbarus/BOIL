import { useParams } from "react-router-dom"
import { Group, TextInput, MultiSelect, Button } from '@mantine/core';


export const CpmForm = () => {
    //const{id}=useParams();

    return <div>

        <Group>
        <TextInput
            placeholder="Nazwa"
            style={{ width: '10%' }} // Apply inline styles to make it full width
        // or
        // className="full-width-text-input" // Apply a custom CSS class for styling
        />

        <TextInput
            placeholder="Czas trwania"
            style={{ width: '10%' }} // Apply inline styles to make it full width
        // or
        // className="full-width-text-input" // Apply a custom CSS class for styling
        />

<MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
</Group>

<Button variant="gradient" gradient={{ from: 'red', to: 'teal', deg: 263 }} >Potwierdź</Button>



    </div>



}