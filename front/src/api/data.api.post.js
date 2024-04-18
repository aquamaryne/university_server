const URL0 = 'http://localhost:3001/employeers';
const URL1 = 'http://localhost:3001/education';
const URL2 = 'http://localhost:3001/sex';
const URL3 = 'http://localhost:3001/positions';
const URL4 = 'http://localhost:3001/department';
const URL5 = 'http://localhost:3001/domains';
const URL6 = 'http://localhost:3001/work-experience';
const URL7 = 'http://localhost:3001/military-appearance';
const URL8 = 'http://localhost:3001/family';
const URL9 = 'http://localhost:3001/family-status';
const URL10 = 'http://localhost:3001/lang';
const URL11 = 'http://localhost:3001/personal-info';
const URL12 = 'http://localhost:3001/achieve';
const URL13 = 'http://localhost:3001/fired';

export const postDataToTable = async(formData) => {
    try{
        const requests = [
            fetch(URL0, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL1, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL2, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL3, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL4, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL5, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL6, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL7, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL8, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL9, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL10, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL11, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL12, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
            fetch(URL13, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(formData) }),
        ];
        const responce = await Promise.all(requests);
        const responceData = await Promise.all(responce.map(async (responce, index) => {
            if(!responce.ok){
                const errorData = await responce.json();
                throw new Error(`Failed to submit data to ${index} table: ${errorData.message}`)
            }
            return responce.json();
        }));
        return responceData;
    } catch (error) {
        console.error('Error submitting data to table', error);
        throw error;
    }
};