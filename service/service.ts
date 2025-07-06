import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const API_BASE_URL = "https://randomuser.me/api";

export const fetchUsers = async (results: number = 50): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/?results=${results}`);

  console.log("fetching users");
  return response.data.results.map((user: any, index: number) => ({
    id: index + 1,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    username: user.login.username,
  }));
};

export const fetchUserById = async (id: number): Promise<User> => {
  const users = await fetchUsers();

  console.log("fetching user by id", id);
  console.log(users.find((user) => user.id === id));
  return users.find((user) => user.id === id) as User;
};
