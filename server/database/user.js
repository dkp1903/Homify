const connection = require('./connection');

exports.findUser = async(email) => {
	const query = {
		text: 'SELECT * FROM users WHERE email=$1',
		values: [email],
	}
	const result =  await connection.query(query);
	return result;
}

exports.findUserViaId = async(userId) => {
	const query = {
		text: 'SELECT * FROM users WHERE user_id=$1',
		values: [userId],
	}
	const result =  await connection.query(query);
	return result;
}

exports.createUser = async (email, password, firstName, lastName) => {
	const query = {
		text: 'INSERT into users(email,password,first_name,last_name) values($1,$2,$3,$4)',
		values: [email, password, firstName, lastName]
	}
	try{
		await connection.query(query)
		const newUser = await this.findUser(email)
		return newUser.rows[0]
	}
	catch(e){
		const query = {
			text: 'DELETE from users where email = $1',
			values: [email]
		}
		await connection.query(query)
		console.log(e)
	}	
}

exports.setEmailVerified = async (user_id) => {
	const query = {
		text: 'UPDATE users SET is_verified=true where user_id= $1',
		values: [user_id]
	}
	await connection.query(query)
	return ;
}

exports.resetPassword = async (user_id, newPassword) => {
	const query = {
		text: 'UPDATE users SET password=$2 where user_id= $1',
		values: [user_id, newPassword]
	}
	await connection.query(query)
	return ;
}