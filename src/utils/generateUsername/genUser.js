import fire from '../../config/fire';
const usernameGenerator = require('username-generator');

export const generateUsername = () => {
    const generatedUsername = usernameGenerator.generateUsername();
    let unique = true, errMsg;
    fire.database().ref('usersData').on('value', snapshot => {
        const userObject = {...snapshot.val()};
        console.log(userObject);
        for (let key in userObject) {
            if (userObject[key].displayName === generatedUsername)
                unique = false;
        }
    }, err => {
        errMsg = err.message;
        console.log('Error from firebase tracking genUser: ', errMsg);
    });

    return new Promise((resolve, reject) => {
        if (unique) 
            resolve(generatedUsername);
        else 
            reject(errMsg);
    });
}; 