import React, { useEffect, useState } from "react";


//include images into your bundle


//create your first component
const Home = () => {

const [task, setTask] = useState ('')
const url = 'https://playground.4geeks.com/todo'
const [username, setUsername] = useState('antonio')
const [userData, setUserData] = useState({})


const getDataAsync = async (e) => {
	try {
		const resp = await fetch(url + '/users/' + username);
		if(resp.status===404) createUser()
		if(!resp.ok) throw new Error ('something went wrong')
		const data = await resp.json();
		console.log(data)
		setUserData(data)
	} catch (error) {
		console.error(error)
	}
}
const getTask = async () => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try{
		const response = await fetch(url + '/users/' + username, options);
		if(!response.ok){
			console.log('datos no extraidos')
		}
		const data = await response.json()
		console.log('estas son mis tareas', data)
		setUserData(data)
	}catch (error)
	{console.error(error)}
}

const handleSumbmit = async (e)  => {
	e.preventDefault();
	try {
		const resp = await fetch(url + '/todos/' + username, {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: task,
  				is_done: false
			})
		});
		if(!resp.ok) throw new Error ('something went wrong')
		const data = await resp.json();
		console.log(data)
		getDataAsync();
		setTask('')
	} catch (error) {
		console.error(error)
	}
}

const createUser = async () => {
	try {
		const resp = await fetch(url + '/users/' + username, {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
		});
		if(!resp.ok) throw new Error ('something went wrong')
		const data = await resp.jason();
		console.log(data)
		getDataAsync();
	} catch (error) {
		console.error(error)
	}
}

const handleDelete = async (todo_id) => {
	try {
		const resp = await fetch(url + '/todos/' + todo_id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				is_done: true
			})

		});
		if(!resp.ok) throw new Error ('something went wrong')
		getTask();
	} catch (error) {
		console.error(error)
	}
}
const handleReset = async (todo_id) => {
	try {
		const resp = await fetch(url + '/todos/' + todo_id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				is_done: false
			})

		});
		if(!resp.ok) throw new Error ('something went wrong')
		getTask();
	} catch (error) {
		console.error(error)
	}
}

const handleEnd = async (todo_id) => {
	try {
		const resp = await fetch(url + '/todos/' + todo_id, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'
			},
		});
		if(!resp.ok) throw new Error ('something went wrong')
		getTask();
	} catch (error) {
		console.error(error)
	}
}



useEffect(() => {
	getDataAsync()
	getTask()
}, [])

return (
	<div className="text-center">

		<label className="home__title fs-5">ToDo List With Fetch</label>
		<form onSubmit={getDataAsync}>
			<input className="" type="text" value={username} onChange={e=>setUsername(e.target.value)} />
		</form>
		<form onSubmit={handleSumbmit}>
			<input className="home__input" type="text" placeholder="what needs to be done?" onChange={e => setTask(e.target.value)} value={task}/>
			<input
                    type="submit"
                    value="Add"
                    className="home__input home__inputbutton"
                />
		</form>

	<ul className="p-0 me-2">
		{userData.todos?.map(el => <li className="my-2 d-flex justify-content-between" key={el.id} style={{
			textDecoration: el.is_done ? 'line-through': 'none',
			color: el.is_done ? 'grey' : 'black'
		}}>{el.label} 
		<button className='btn btn-danger ms-4' onClick={() => handleDelete(el.id)}>Cross</button>
		<button className="btn btn-success ms-4" onClick={() => handleReset(el.id)}>Reset</button>
		<button className="btn btn-primary ms-4" onClick={() => handleEnd(el.id)}>Delete</button>
		</li>)}	
	</ul>	
	</div>
	
)

};

export default Home;
