import { User } from 'tweeter-shared';
import { AuthTokenTableDAO } from './AuthTokenTableDAO';
// import { UserTableDAO } from './UserTableDAO';
import { FollowTableDAO } from './FollowTableDAO';

async function createUsers() {
    const authTokenTableDAO = new AuthTokenTableDAO();
    // const userTableDAO = new UserTableDAO();
    const followTableDAO = new FollowTableDAO();

    const user1 = new User('1', '1', '@1', "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg");
    for (let i = 5820; i < 10000; i++) {
        const firstName = `firstName${i}`;
        const lastName = `lastName${i}`;
        const alias = `@zgen${i}`;
        const password = '1'; // replace with a secure, hashed password
        const userImageBytes = new Uint8Array(); // Just the fake image

        try {
            await authTokenTableDAO.register(firstName, lastName, alias, password, userImageBytes);
            console.log(`User ${i} registered`);
            const user = new User(firstName, lastName, alias, "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg");
            // await userTableDAO.follow(user, '@1');
            await followTableDAO.follow(user, user1);
            // console.log(`User ${i} followed @1`);

        } catch (error) {
            console.error(`Error registering user ${i}:`, error);
        }
    }
}

createUsers();