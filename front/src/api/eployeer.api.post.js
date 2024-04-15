const BASE_URL = 'http://localhost:3001/employeers';

export const PostEmployeerDataTable = async(formData) => {
    try{
        const responce = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if(!responce.ok){
            throw new Error('Failed to submit data to table employeers', formData);
        }

        return await responce.json();
    } catch (error) {
        console.error('Error submitting data to table employeers', error);
        throw error;
    }
};