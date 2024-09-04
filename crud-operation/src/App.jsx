import { useState } from 'react';
import { EmployeeData } from './content/EmployeeData';
import './App.css';
import { useEffect } from 'react';

function App() {

   // Load from localStorage or use EmployeeData if no saved data is found
   const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('employeeData');
    return savedData ? JSON.parse(savedData) : EmployeeData;
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState(0);
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [isupdate, setIsUpdate] = useState(false);


   // Load data from localStorage on component mount
   useEffect(() => {
    const savedData = localStorage.getItem('employeeData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('employeeData', JSON.stringify(data));
  }, [data]);



  

  const handleEdit = (id) => {
    const dt = data.filter(item=> item.ID === id)
    if(dt !== undefined){
      setIsUpdate(true);
      setId(id)
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setEmail(dt[0].email);
      setCompany(dt[0].company);
      setCountry(dt[0].country);
    }
  }
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter(item => item.ID !== id);
        setData(dt);
      }
    }
  }

  const handleClear = () => {
    setIsUpdate(false);
      setId(0);
      setFirstName('');
      setLastName('');
      setEmail('');
      setCompany('');
      setCountry('');
  }

  const handleUpdate = () => {
    const index = data.map((item)=>{
      return(item.ID);
    }).indexOf(id)

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].email = email;
    dt[index].company = company;
    dt[index].country = country;

    setData(dt);
    handleClear();

  }

  const handleSave = (e) => {
    e.preventDefault(); 

    let error = "";
    if (firstName === '') {
        error += "First Name is required. ";
    }
    if (lastName === '') {
        error += "Last Name is required. ";
    }
    if (company === '') {
        error += "Company name is required. ";
    }
    if (email === '') {
        error += "Email is required. ";
    }
    if (country === '') {
        error += "Country is required. ";
    }

    if (error !== "") {
        alert('All field is mandatory'); 
    } else {
        
        const maxId = data.length > 0 ? Math.max(...data.map(item => item.ID)) : 0;
        const newPerson = {
            ID: maxId + 1, 
            firstName: firstName,
            lastName: lastName,
            company: company,
            email: email,
            country: country
        };

        const dt = [...data, newPerson];
        setData(dt);
        handleClear();
    }
};
  return (
    <>
      <h4 className='text-center text-4xl font-bold mt-5'>CRUD Operation</h4>
      <div className='flex justify-center mt-10 space-x-2'>
        <label>
          <input type="text" placeholder='Enter your First Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"/>
          </label>
        <label>
          <input type="text" placeholder='Enter your Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"/>
          </label>
        <label>
          <input type="text" placeholder='Company' value={company} onChange={(e)=> setCompany(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"/>
          </label>
        <label>
          <input type="email" placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"/>
          </label>
        <label>
          <input type="email" placeholder='Country' value={country} onChange={(e)=> setCountry(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"/>
          </label>
          <div>
            {
              !isupdate ?  <button onClick={handleSave} className='py-1 px-4 bg-blue-500 rounded-lg text-black font-semibold mr-2'>Save</button> :
              <button onClick={handleUpdate} className='py-1 px-4 bg-green-400 rounded-lg text-black font-semibold mr-2'>Update</button>
            }
             <button onClick={handleClear} className='py-1 px-4 bg-cyan-500 rounded-lg text-black font-semibold'>Clear</button>
           
                  
          </div>
          
          
      </div>

      <div className="flex justify-center mt-8">
        <table className="table-auto  border-collapse border border-gray-300 w-11/12">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Country</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='bg-gray-200'>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.company}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.country}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={()=> handleEdit(item.ID)} className='py-1 px-4 bg-green-700 rounded-lg text-black font-semibold mr-2'>Edit</button>
                  <button onClick={()=>handleDelete(item.ID)} className='py-1 px-4 bg-red-500 rounded-lg text-black font-semibold'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
