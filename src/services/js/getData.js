

export async function getUsers() {
    try {
        const res = await fetch("http://localhost:3000/users");
        const users = await res.json();
        return users;
    }catch (error){
        console.log(error);
    }
    
}