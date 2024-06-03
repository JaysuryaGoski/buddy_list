let statusOfUser = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};

let users = [
	{
	  "userId": "USR00001",
	  "name": "Andrew Grudde",
	  "profilePicture": "https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
	  "statusMessage": "We become what we think about!",
	  "presence": 1
	},
	{
	  "userId": "USR00002",
	  "name": "Steve Hughes",
	  "profilePicture": "https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
	  "statusMessage": "A positive mindset brings positive things.",
	  "presence": 2
	},
	{
		"userId": "USR00003",
		"name": "Kathy Smiley",
		"profilePicture": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		"statusMessage": "One small positive thought can change your whole day",
		"presence": 3
	  },
	  {
		"userId": "USR00004",
		"name": "Steve Dunk",
		"profilePicture": "https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		"statusMessage": "I am a rock star",
		"presence": 1
	  },
	  {
		"userId": "USR00005",
		"name": "Maria Dropola",
		"profilePicture": "https://hips.hearstapps.com/hmg-prod/images/sansa-daenerys-game-of-thrones-finale-1558480613.jpg?crop=0.497xw:0.993xh;0.503xw,0&resize=640:*",
		"statusMessage": "I am using Gradious messenger",
		"presence": 4
	  }
  ];
  
function display(){
	const userList = document.getElementById('root');
	userList.innerHTML ="";

	for(const user of users){
		const userElement = document.createElement('div');
		userElement.classList.add('user');

		const imgContainer = document.createElement('div');
		imgContainer.classList.add('img-container');
		const img = document.createElement('img');
		img.classList.add('user-image');
		img.src = user.profilePicture;
		img.alt = "user image";
		const presenceCode = user.presence;
    	const presenceClass = statusOfUser[presenceCode];
		img.classList.add(presenceClass);
		imgContainer.appendChild(img);
		userElement.appendChild(imgContainer);

		const userDetail = document.createElement('div');
		userDetail.classList.add('user-detail');
		const userName = document.createElement('p');
		userName.classList.add('user-name');
		userName.textContent = user.name;
		const userMessage = document.createElement('p');
		userMessage.classList.add('user-message');
		userMessage.textContent = user.statusMessage;
		userDetail.appendChild(userName);
		userDetail.appendChild(userMessage);
		userElement.appendChild(userDetail);

		const threeBtn = document.createElement('div');
        threeBtn.classList.add('three-btn');
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');
        const dropdownToggle = document.createElement('a');
        dropdownToggle.href = "#";
        dropdownToggle.role = "button";
        dropdownToggle.dataset.bsToggle = "dropdown";
        dropdownToggle.ariaExpanded = "false";
        dropdownToggle.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.classList.add('dropdown-menu');
        const deleteItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.id = user.userId;
        deleteButton.classList.add('dropdown-item');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem("${user.userId}")`);
        deleteItem.appendChild(deleteButton);
        const updateItem = document.createElement('li');
        const updateButton = document.createElement('button');
        updateButton.id = `update-${user.userId}`;
        updateButton.classList.add('dropdown-item');
        updateButton.textContent = 'Update';
        updateButton.setAttribute('onclick', `updateItem("${user.userId}")`);
        updateItem.appendChild(updateButton);
        dropdownMenu.appendChild(deleteItem);
        dropdownMenu.appendChild(updateItem);
        dropdown.appendChild(dropdownToggle);
        dropdown.appendChild(dropdownMenu);
        threeBtn.appendChild(dropdown);
        userElement.appendChild(threeBtn);
		
		userList.appendChild(userElement);
	}
}

window.onload = function(){
	display();
}

function addUser(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const statusMessageInput = document.getElementById('statusMessage');
    const profileLinkInput = document.getElementById('profilePicLink');
    const presenceInput = document.getElementById('presence');
    const addUserButton = document.getElementById('addUserButton');

    const name = nameInput.value;
    const statusMessage = statusMessageInput.value;
    const profileLink = profileLinkInput.value;
    const presenceCode = presenceInput.value;

    if (!name || !statusMessage || !profileLink) {
        alert('Please fill in all the required fields.');
        return;
    }

    if (currentUserId) {
        const userIndex = users.findIndex(user => user.userId === currentUserId);
        if (userIndex !== -1) {
            users[userIndex].name = name;
            users[userIndex].statusMessage = statusMessage;
            users[userIndex].profilePicture = profileLink;
            users[userIndex].presence = presenceCode;
            currentUserId = null;
            addUserButton.textContent = 'Add User';
        }
    } else {
        const newUser = {
            userId: `USR${String(users.length + 1).padStart(5, '0')}`,
            name,
            statusMessage,
            profilePicture: profileLink,
            presence: presenceCode,
        };

        users.unshift(newUser);
    }

    display();

    nameInput.value = "";
    statusMessageInput.value = "";
    profileLinkInput.value = "";
    presenceInput.value = "1";
}

const addUserButton = document.getElementById('addUserButton');
addUserButton.addEventListener('click', addUser);


let currentUserId = null;

function updateUser(user) {
    const nameInput = document.getElementById('name');
    const statusMessageInput = document.getElementById('statusMessage');
    const profileLinkInput = document.getElementById('profilePicLink');
    const presenceInput = document.getElementById('presence');
    const addUserButton = document.getElementById('addUserButton');

    nameInput.value = user.name;
    statusMessageInput.value = user.statusMessage;
    profileLinkInput.value = user.profilePicture;
    presenceInput.value = user.presence;
    currentUserId = user.userId;

    addUserButton.textContent = 'Update Detail';
}

function updateItem(userId) {
    const user = users.find(u => u.userId === userId);
    if (user) {
        updateUser(user);
    }
}

function saveUserDetails(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const statusMessageInput = document.getElementById('statusMessage');
    const profileLinkInput = document.getElementById('profilePicLink');
    const presenceInput = document.getElementById('presence');

    const name = nameInput.value;
    const statusMessage = statusMessageInput.value;
    const profileLink = profileLinkInput.value;
    const presenceCode = presenceInput.value;

    if (!name || !statusMessage || !profileLink) {
        alert('Please fill in all the required fields.');
        return;
    }

    if (currentUserId) {
        const user = users.find(u => u.userId === currentUserId);
        if (user) {
            user.name = name;
            user.statusMessage = statusMessage;
            user.profilePicture = profileLink;
            user.presence = presenceCode;
        }
        currentUserId = null;
        document.getElementById('addUserButton').textContent = 'Add User';
    } else {
        const newUser = {
            userId: `USR${String(users.length + 1).padStart(5, '0')}`,
            name,
            statusMessage,
            profilePicture: profileLink,
            presence: presenceCode,
        };

        users.unshift(newUser);
    }

    display();

    nameInput.value = "";
    statusMessageInput.value = "";
    profileLinkInput.value = "";
    presenceInput.value = "1";
}


function deleteUser(userId) {
    const index = users.findIndex(user => user.userId === userId);
    if (index !== -1) {
        users.splice(index, 1);
        display();
    }
}
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('dropdown-item')) {
        const userId = event.target.id;
        deleteUser(userId);
    }
});