// #1
function expo(num, sqr, cb) {
    if (isNaN(num) || isNaN(sqr)){
        return false;
    } else {
        const result = num ** sqr;
        return cb(result)
    }
}

console.log(expo(2, 4, (result) => result))

// #2

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(res => console.log(res))

function createPostEach(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
  
    const titleElement = document.createElement('h2');
    titleElement.classList.add('post-title');
    titleElement.textContent = post.title;
  
    const contentElement = document.createElement('p');
    contentElement.classList.add('post-content');
    contentElement.textContent = post.body;
  
    const authorElement = document.createElement('p');
    authorElement.classList.add('post-author');
    authorElement.textContent = 'Posted by User: ' + post.userId

    const idElement = document.createElement('p');
    idElement.classList.add('post-id');
    idElement.textContent = 'Id:' + post.id
  
    postElement.append(titleElement, contentElement, authorElement, idElement);
  
    return postElement;
  
}

async function fetchData() {
    try {
        const rawData = await fetch('https://jsonplaceholder.typicode.com/posts');

        if(!rawData.ok) {
            throw Error('Not good request');
        }
        const data = await rawData.json();
        const postContainer = document.querySelector('.posts');

        data.forEach(post => {
            const postCreate = createPostEach(post);
            postContainer.append(postCreate);
        });
    } catch (error) {
        console.error(error.message);
    }
}
fetchData()

// #3

const userObj = {
    name: "Kingsley",
    age: 28,
    job: "Web Developer",
    location: {
      city: "Lagos",
    }
}

async function deepCopy(obj) {
    try {
        const copy = JSON.parse(JSON.stringify(obj));
        return copy;
    } catch (error) {
        throw Error('Error');
    }
}

async function executeDeepCopy(obj) {
    try {
        const userCopy = await deepCopy(userObj);
        console.log(userCopy)
        return userCopy;
    } catch (error) {
        throw Error('Error')
    }
}
executeDeepCopy()

// #4

let objTypeTrueFalse = true;

async function deepCopyResRej(obj) {
    return new Promise((resolve, reject) => {
        if(typeof obj == 'object') {
            const copyAgain = JSON.parse(JSON.stringify(obj));
            resolve(copyAgain)
        } else {
            objTypeTrueFalse = false;
            reject(new Error('Invalid data type'))

        }
    })
}

async function executeDeepCopyResRej(obj) {
    return new Promise((resolve, reject) => {
        if(objTypeTrueFalse) {
            const objCopyOnceAgainEverybody = deepCopyResRej(userObj)
            resolve(objCopyOnceAgainEverybody)
        } else {
            reject(new Error('Invalid data type'))
        }
    })
}
executeDeepCopyResRej(userObj)
    .then(copy => {
        console.log(copy);
    })
    .catch(error => {
        console.error(error);
    });
