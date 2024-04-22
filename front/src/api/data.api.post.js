const URL0 = 'http://localhost:3001/employeers';            // responce[0]
const URL1 = 'http://localhost:3001/education';             // responce[1]
const URL2 = 'http://localhost:3001/sex';                   // responce[2]
const URL3 = 'http://localhost:3001/positions';             // responce[3]
const URL4 = 'http://localhost:3001/department';            // responce[4]
const URL5 = 'http://localhost:3001/domains';               // responce[5]
const URL6 = 'http://localhost:3001/work-experience';       // responce[6]
const URL7 = 'http://localhost:3001/military-appearance';   // responce[7]
const URL8 = 'http://localhost:3001/family';                // responce[8]
const URL9 = 'http://localhost:3001/family-status';         // responce[9]
const URL10 = 'http://localhost:3001/lang';                 // responce[10]
const URL11 = 'http://localhost:3001/personal-info';        // responce[11]
const URL12 = 'http://localhost:3001/achieve';              // responce[12]
const URL13 = 'http://localhost:3001/fired';                // responce[13]

export const postDataToTable = async(formData) => {
    try{
        const requests = [
            fetch(URL1, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL2, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL3, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL4, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL5, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL6, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL7, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL8, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL9, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL0, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL10, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL11, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL12, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
            fetch(URL13, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(formData) }),
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