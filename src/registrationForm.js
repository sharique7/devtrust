import React,{useState} from 'react';
import axios from 'axios';


const RegistrationForm= ()=>{
    const [name,setName] =useState('');
    const[email,setEmail]=useState('');
    const[dob,setDob]=useState('');
    const[gender,setGender]=useState('');
    const[idFile,setidFile]=useState(null);
    const[error,setError]=useState('');
    
    const handlefileChange= (event)=>{
        // eslint-disable-next-line no-undef
        setidFile(file);
    };

    const handleSubmit= async (event)=>{
        event.preventDefault();
        
        const formData=new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('idFile', idFile);

        try{
            await axios.post('/api/register', formData,{
                headers:{
                    'Content-Type': "multipart/form-data"
                },
            });
            console.log('Registration Successful')
        } catch (error){
            setError('Registration failed');
            console.error(error);
        }
    };

    return(
        <div>
            <h2>User Registration</h2>
            {error && <p style={{color: 'red'}}></p>}
            <form onSubmit={handleSubmit}>
                <input 
                 type="text"
                 placeholder='Name'
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                 required/>
                 <input 
                 type="email"
                 placeholder='Email'
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 required/>
                 <input 
                 type="date"
                 placeholder='Date of Birth'
                 value={dob}
                 onChange={(e)=> setDob(e.target.value)}
                 required/>
                 <select 
                 
                 value={gender}
                 onChange={(e)=> setGender(e.target.value)}
                 required>
                    <option value="">Select Gender</option>
                    <option value="male"> Male</option>
                    <option value= "female">Female</option>
                    <option value="other">Other</option>
                 </select>
                 <input
                 type="file"
                 accept=".pdf"
                 onChange={handlefileChange}
                 required
                 />

                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
            </form>
        </div>
    );
   
};

export default RegistrationForm;