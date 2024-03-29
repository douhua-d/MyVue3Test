import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';


// global variable
let requestThreadStartIndex = 0;
let currentSelectedThread;
let currentLoginPassword;

//login-register-page
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerLink').addEventListener('click', function(event) {
        event.preventDefault(); 
        window.location.hash = '#/register'; 
        showRegistrationForm(); 
    });

    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault(); 
        window.location.hash = '#/login'; 
        showLoginForm();
    });

    if (window.location.hash === '#/register') {
        showRegistrationForm();
    } else {
        showLoginForm();
    }

    function showRegistrationForm() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registrationForm').style.display = 'block';
    }

    function showLoginForm() {
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }
});

//---login function---
function fetchUserDetails (userId, token) {
    return fetch(`http://localhost:5005/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error('Failed to fetch user details');
        });
}

function login (event) {
    clearThreadContainer();
    event.preventDefault();
    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;
    currentLoginPassword = password;

    //---if email,password is none
    if (!email) {
        alert('Please enter your email.');
        return;
    }

    if (!password) {
        alert('Please enter your password.');
        return;
    }
    const data = {
        email,
        password
    };

    fetch('http://localhost:5005/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Login failed.');
            }
            return res.json();
        })
        .then(data => {
            console.log('login success: ', data);
            // login successful, load dashboard
            window.location.hash = '#/dashboard';
            const { token } = data;
            window.localStorage.setItem('token', token);
            const { userId } = data;
            window.localStorage.setItem('userId', userId.toString());
            

            // 调用 fetchUserDetails 函数获取用户详情
            fetchUserDetails(userId, token)
                .then(user => {
                    console.log('current user details:', user);
                    // 将当前用户详细信息存储到本地存储
                    window.localStorage.setItem('currentUser', JSON.stringify(user));
                    // 在此处处理用户信息
                    window.location.reload();
                })
                .catch(error => {
                    alert('Failed to fetch user details');
                });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        });
}

document.addEventListener('DOMContentLoaded', function() { 
    showUserName();
     
});
function showUserName(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameSpan = document.getElementById('username-placeholder');
    if (currentUser && currentUser.name) {
        usernameSpan.textContent = currentUser.name;
    } else {
        usernameSpan.textContent = 'Guest';
    }
   
}

//---login button
const loginBtn = document.getElementById('login-button');
loginBtn.addEventListener('click', login);

//---register function---
function register(event) {
    event.preventDefault();
    const emailInput = document.getElementById('regEmail');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address. Example: example@email.com');
        emailInput.focus(); 
        return;
    }
    const nameInput = document.getElementById('username');
    const name = nameInput.value.trim();
    if (!name) { 
        alert('Please enter your name.');
        nameInput.focus();
        return;
    }
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password.length < 6) {
        alert('Password must be at least six characters long.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    const data = {
        email,
        name,
        password,
        confirmPassword
    };
    fetch('http://localhost:5005/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            if (res.status === 400) {
                throw new Error('Email already exists.');
            } else {
                throw new Error('Registration failed.');
            }
        }
        return res.json();
    })
    .then(data => {
        console.log('Registration success: ', data);
        alert('Registration successful! You can now log in with your email and password.');
        emailInput.value = '';
        nameInput.value = ''; 
        document.getElementById('regPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        window.location.hash = '#/login'; 
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.message === 'Email already exists.') {
            alert('Email already exists. Please use a different email address.');
        } else {
            alert('Registration failed. Please try again.');
        }
    });
}

//---register button---
const registerBtn = document.getElementById('register-button');
registerBtn.addEventListener('click', register);


//---logout function---
function logout() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
        localStorage.clear();
        window.location.hash = '#/login';
    }
}

//---logout button---
document.getElementById('logout-button').addEventListener('click', logout);

//---logout function end---


//----get thread function---
const threadListContainer = document.getElementById('feed-page');
function getThreads (startIndex = 0) {
    if (startIndex === 0) {
        moreButtonDom.style.display = 'block';
    }
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('Token not found in localStorage');
        return;
    }

    fetch(`http://localhost:5005/threads?start=${startIndex}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(threadIds => {
            console.log('Threads:', threadIds);
            
            //more
            requestThreadStartIndex = startIndex + 5;
            if (!threadIds.length) {
                window.alert('no more data');
                moreButtonDom.style.display = 'none';
            }

            const threadContentPromises = threadIds.map(threadId => {
                return fetch(`http://localhost:5005/thread?id=${threadId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
            });
            return Promise.all(threadContentPromises);
        })
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(threadContents => {
            console.log('Thread content:', threadContents);
            localStorage.setItem('threadContents', JSON.stringify(threadContents));
            const creatorIds = threadContents.map(thread => thread.creatorId);
            const userDetailPromises = creatorIds.map(creatorId => {
                return fetch(`http://localhost:5005/user?userId=${creatorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response => response.json());
            });
            return Promise.all(userDetailPromises)
                .then(userDetails => ({ threadContents, userDetails }));
        })
        .then(({ threadContents, userDetails }) => {
            console.log('User Details:', userDetails);

            const userDetailMap = userDetails.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, {});
            threadContents.forEach((thread) => {
                thread.creator = userDetailMap[thread.creatorId];
            });
            console.log(threadContents);
            renderThreads(threadContents, userDetails);
            selectFirstThread();
        })
        .catch(error => {
            console.error('Error loading threads:', error);
        });
}


// function renderThreads(threads) {
//     threads.forEach(thread => {
//         const threadElement = document.createElement('div');
//         threadElement.classList.add('thread');
//         threadElement.dataset.threadid = thread.id;

//         const titleElement = document.createElement('h3');
//         titleElement.textContent = `${thread.title}`;

//         const authorElement = document.createElement('h4');
//         authorElement.textContent = `Author: ${thread.creator.name}`;

//         const createdAt = new Date(thread.createdAt);
//         const formattedDate = createdAt.toLocaleString();
//         const dateElement = document.createElement('p');
//         dateElement.textContent = `Date: ${formattedDate}`;

//         const likesElement = document.createElement('p');
//         likesElement.textContent = `Likes: ${thread.likes.length}`;

//         threadElement.appendChild(titleElement);
//         threadElement.appendChild(authorElement);
//         threadElement.appendChild(dateElement);
//         threadElement.appendChild(likesElement);

//         threadListContainer.appendChild(threadElement);

//         threadElement.addEventListener('click', () => {
//             const allThreads = document.querySelectorAll('.thread');
//             allThreads.forEach(item => {
//                 item.classList.remove('selected');
//             });

//             threadElement.classList.add('selected');
//             currentSelectedThread = thread.id;
//             showThreadDetail(thread.id); 

//         });
//         const separator = document.createElement('hr');
//         threadListContainer.appendChild(separator);

//     });
// }

function renderThreads(threads) {
    threads.forEach(thread => {
        const threadElement = document.createElement('div');
        threadElement.classList.add('thread');
        threadElement.dataset.threadid = thread.id;

        const titleElement = document.createElement('h3');
        titleElement.textContent = `${thread.title}`;

        const authorElement = document.createElement('h4');
        authorElement.textContent = `Author: ${thread.creator.name}`;
        authorElement.classList.add('user-link');
        authorElement.addEventListener('mouseover', () => {
            authorElement.style.color = 'blue'; // 鼠标移入时变色
            authorElement.style.cursor = 'pointer'; // 鼠标移入时显示手型
        });
        authorElement.addEventListener('mouseout', () => {
            authorElement.style.color = 'black'; // 鼠标移出时恢复原色
        });
        authorElement.addEventListener('click', () => {
            getUserProfile(); // 点击执行getUserProfile()
        });

        const createdAt = new Date(thread.createdAt);
        const formattedDate = createdAt.toLocaleString();
        const dateElement = document.createElement('p');
        dateElement.textContent = `Date: ${formattedDate}`;

        const likesElement = document.createElement('p');
        likesElement.textContent = `Likes: ${thread.likes.length}`;

        threadElement.appendChild(titleElement);
        threadElement.appendChild(authorElement);
        threadElement.appendChild(dateElement);
        threadElement.appendChild(likesElement);

        threadListContainer.appendChild(threadElement);

        threadElement.addEventListener('click', () => {
            const allThreads = document.querySelectorAll('.thread');
            allThreads.forEach(item => {
                item.classList.remove('selected');
            });

            threadElement.classList.add('selected');
            currentSelectedThread = thread.id;
            showThreadDetail(thread.id); 

        });
        const separator = document.createElement('hr');
        threadListContainer.appendChild(separator);

    });
}



function showThreadDetail (threadId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    fetch(`http://localhost:5005/thread?id=${threadId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(thread => {
            console.log('threadDetail', thread);
            if (!thread.creator) {
                return fetch(`http://localhost:5005/user?userId=${thread.creatorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(creator => {
                    thread.creator = creator;
                    window.localStorage.setItem('threadDetail', JSON.stringify(thread));

                    return thread;
                });
            } else {
                return thread;
            }
        })
        .then(thread => {
            renderThreadDetail(thread);
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log('user detail:', currentUser); 
            console.log('current id', currentUser.id);
            console.log('thread creator id', thread.creatorId);

            if (currentUser.id === thread.creatorId || currentUser.admin) {
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.id = 'edit-button';
                editButton.classList.remove('hidden'); 

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.id = 'delete-button';
                deleteButton.classList.remove('hidden');

                const threadPage = document.getElementById('thread-page');
                threadPage.appendChild(editButton);
                threadPage.appendChild(deleteButton);

                editButton.addEventListener('click', () => {
                    window.location.hash = '#/edit-thread';
                    fillEditForm(thread);
                });
                deleteButton.addEventListener('click', () => {
                    const confirmDelete = confirm('Are you sure you want to delete this thread?');
                    if (confirmDelete) {
                        deleteThread(thread.id);
                    }
                });

            }

            //---like button---
            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.id = 'like-button';
            const threadPage = document.getElementById('thread-page');
            threadPage.appendChild(likeButton);
            if (thread.likes.includes(currentUser.id)) {
                likeButton.textContent = 'Unlike';
                likeButton.classList.add('liked');
            }

            likeButton.addEventListener('click', () => {
                toggleLikeThread(threadId);
            });

            //---watch button---
            const watchButton = document.createElement('button');
            watchButton.textContent = 'Watch';
            watchButton.id = 'watch-button';
            threadPage.appendChild(watchButton);

            if (thread.watchees.includes(currentUser.id)) {
                watchButton.textContent = 'Unwatched';
                watchButton.classList.add('watched');
            }

            watchButton.addEventListener('click', () => {
                toggleWatchThread(threadId);
            });

            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            commentSection.setAttribute('id', 'comment-section');
            threadPage.appendChild(commentSection);

            const newCommentInput = document.createElement('textarea');
            newCommentInput.placeholder = 'Add a new comment';
            newCommentInput.id = 'newCommentInput';
            commentSection.appendChild(newCommentInput);

            const commentButton = document.createElement('button');
            commentButton.textContent = 'Comment';
            commentSection.appendChild(commentButton);
            commentButton.addEventListener('click', () => {
                const commentContent = document.getElementById('newCommentInput').value;
                if (commentContent !== '') {
                    postComment(thread.id); 
                    newCommentInput.value = ''; 
                }
            });
            getThreadComments(threadId);
        })
        .catch(error => {
            console.error('Error loading threads:', error);
        });
}


function getThreadComments (threadId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }
    fetch(`http://localhost:5005/comments?threadId=${threadId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            const allComments = comments;
            comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            comments = comments.filter(item => !item.parentCommentId);
            console.log('comments', comments);
            comments.forEach(comment => {
                console.log('comment id', comment);
                const currentCommentChildren = allComments.filter(item => item.parentCommentId === comment.id);

                const commentListContainer = document.createElement('div');
                commentListContainer.setAttribute('id', 'comment-list-container');

                const commentSection = document.getElementById('comment-section');
                commentSection.appendChild(commentListContainer);

                const commentDetail = document.createElement('div');
                commentDetail.classList.add('commentDetail');
                commentDetail.setAttribute('id', comment.id);
                const commentAutor = document.createElement('p');
                commentAutor.style.cssText = 'font-size: 16px;font-weight: 900;';
                getCreatorName(comment.creatorId)
                    .then(user => {
                        commentAutor.textContent = user;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });


                const commentContent = document.createElement('p');
                commentContent.style.color = '#9297a1';
                commentContent.setAttribute('id', `comment-content-${comment.id}`);
                commentContent.textContent = comment.content;

                const createdAtSpan = document.createElement('span');
                createdAtSpan.setAttribute('id', `comment-createdAt-${comment.id}`);
                createdAtSpan.textContent = calculateTimeAgo(comment.createdAt);

                const commentLikeNum = document.createElement('p');
                commentLikeNum.textContent = `Likes:${comment.likes.length}`;

                commentDetail.appendChild(commentAutor);
                commentDetail.appendChild(commentContent);
                commentDetail.appendChild(createdAtSpan);
                commentDetail.appendChild(commentLikeNum);
                commentListContainer.appendChild(commentDetail);

                const commentLikeBtn = document.createElement('button');
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                commentLikeBtn.textContent = 'Like';
                commentLikeBtn.classList.add('commentLikeBtn');
                commentLikeBtn.setAttribute('id', `like${comment.id}`);
                commentDetail.appendChild(commentLikeBtn);
                if (comment.likes.includes(currentUser.id)) {
                    commentLikeBtn.textContent = 'Unlike';
                    commentLikeBtn.classList.add('liked');
                }

                const commentLikeBtns = document.querySelectorAll('.commentLikeBtn');
                commentLikeBtns.forEach(btn => {
                    if (!btn.hasEventListener) {
                        btn.hasEventListener = true;
                        btn.addEventListener('click', function () {
                            const commentId = parseInt(btn.id.slice(4));
                            const commetLike = comment.likes;
                            likeComment(threadId, commentId, commetLike);
                        });
                    }
                });

                const editCommentBtn = document.createElement('button');
                editCommentBtn.textContent = 'edit';
                editCommentBtn.classList.add('form');
                editCommentBtn.classList.add('hidden');
                editCommentBtn.classList.add('editCommentBtn');
                editCommentBtn.setAttribute('id', `edit${comment.id}`);
                commentDetail.appendChild(editCommentBtn);

                const editCommentBtns = document.querySelectorAll('.editCommentBtn');
                editCommentBtns.forEach(btn => {
                    if (!btn.hasEventListener) {
                        btn.hasEventListener = true;
                        btn.addEventListener('click', function () {
                            const commentId = parseInt(btn.id.slice(4));
                            const commentContent = comment.content;
                            editComment(threadId, commentId, commentContent);
                        });
                    }
                });

                const deleteCommentBtn = document.createElement('button');
                deleteCommentBtn.textContent = 'Delete';
                deleteCommentBtn.classList.add('form');
                deleteCommentBtn.classList.add('hidden');
                deleteCommentBtn.classList.add('deleteCommentBtn');
                deleteCommentBtn.setAttribute('id', `del${comment.id}`);
                commentDetail.appendChild(deleteCommentBtn);

                const deleteCommentBtns = document.querySelectorAll('.deleteCommentBtn');
                deleteCommentBtns.forEach(btn => {
                    if (!btn.hasEventListener) {
                        btn.hasEventListener = true;
                        btn.addEventListener('click', function () {
                            const commentId = parseInt(btn.id.slice(3));

                            // 显示确认框
                            const confirmed = confirm('Are you sure you want to delete this comment?');
                            if (confirmed) {
                                deleteComment(threadId, commentId);
                            } else {
                                console.log('Deletion canceled by user.');
                            }
                        });
                    }
                });

                renderCommentChildren(currentCommentChildren, commentDetail);


                const commentForCommentBtn = document.createElement('button');
                commentForCommentBtn.textContent = 'Comment';
                commentForCommentBtn.dataset.commentid = comment.id;
                commentForCommentBtn.setAttribute('id', 'commentForCommentBtn');
                commentDetail.appendChild(commentForCommentBtn);
                commentForCommentBtn.addEventListener('click', () => {
                    handleCommentForComment(threadId, comment.id, commentDetail, commentForCommentBtn);
                });

                if (comment.creatorId.toString() === localStorage.userId || localStorage.currentUser.admin === 'true') {
                    deleteCommentBtn.classList.remove('hidden');
                    editCommentBtn.classList.remove('hidden');
                }

                
            });
        }).catch(error => {
        console.error('Error loading threads:', error);
    });
}

// for comment children 
function renderCommentChildren (currentCommentChildren, parentCommentDetail) {
    currentCommentChildren.forEach(comment => {
        const commentListContainer = document.createElement('div');
        commentListContainer.setAttribute('id', 'comment-list-container');

        const commentDetail = document.createElement('div');
        commentDetail.classList.add('commentDetail');
        commentDetail.setAttribute('id', comment.id);

        const commentAutor = document.createElement('p');
        commentAutor.style.cssText = 'font-size:16px; font-weight: 900;';
        getCreatorName(comment.creatorId).then(user => {
            commentAutor.textContent = user;
        }).catch(error => {
            console.error('Error:', error);
        });

        const commentContent = document.createElement('p');
        commentContent.style.color = '#9297a1';
        commentContent.setAttribute('id', `comment-content-${comment.id}`);
        commentContent.textContent = comment.content;

        const createdAtSpan = document.createElement('span');
        createdAtSpan.setAttribute('id', `comment-createdAt-${comment.id}`);
        createdAtSpan.textContent = calculateTimeAgo(comment.createdAt);
        commentDetail.appendChild(commentAutor);
        commentDetail.appendChild(commentContent);
        commentDetail.appendChild(createdAtSpan);
        // commentDetail.appendChild(commentLikeNum);
        commentListContainer.appendChild(commentDetail);
        commentListContainer.style.marginLeft = '30px';

        parentCommentDetail.appendChild(commentListContainer);
    });

}

function handleCommentForComment(threadId, parentCommentId, commentDetail, commentForCommentBtn) {
    const cloneCommentForCommentBtn = commentForCommentBtn.cloneNode(true);

    const commentContainer = document.createElement('div');
    commentContainer.style.display = 'flex';

    const newCommentInput = document.createElement('textarea');
    newCommentInput.placeholder = 'Add a new comment';
    newCommentInput.style.marginRight = '10px';
    commentContainer.appendChild(newCommentInput);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'confirmAdd';
    confirmButton.style.marginRight = '10px';
    confirmButton.addEventListener('click', () => {
        postComment(threadId, newCommentInput.value, parentCommentId);
        setTimeout(() => {
            confirmButton.parentNode.replaceChild(cloneCommentForCommentBtn, confirmButton);
            commentContainer.parentNode.removeChild(commentContainer);
        });
    });
    commentContainer.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'cancel';
    cancelButton.style.marginRight = '10px';
    cancelButton.addEventListener('click', () => {
        // 移除输入框和按钮
        commentContainer.parentNode.removeChild(commentContainer);
        // 将原始的“回复评论”按钮恢复显示
        commentForCommentBtn.style.display = 'inline-block';
    });
    commentContainer.appendChild(cancelButton);

    commentDetail.appendChild(commentContainer);

    // 隐藏原始的“回复评论”按钮
    commentForCommentBtn.style.display = 'none';
}

function getCreatorName (creatorId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return Promise.resolve(null); 
    }
    return fetch(`http://localhost:5005/user?userId=${creatorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(userData => {
            return userData.name;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null; 
        });
}


function deleteComment (threadId, commentId) {
    console.log('commentId', commentId);
    const token = localStorage.getItem('token');
    fetch('http://localhost:5005/comment', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ 'id': commentId })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Comment deleted successfully');
            showThreadDetail(threadId);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function likeComment (threadId, commentId, commentLikes) {
    console.log('commentId', commentId);
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const isLiked = commentLikes.includes(currentUser.id);
    const likeButton = document.getElementById(`like${commentId}`);

    fetch(`http://localhost:5005/comment/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ id: commentId, turnon: !isLiked })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!isLiked) {
                likeButton.textContent = 'like';
                likeButton.classList.remove('liked');
            } else {
                likeButton.textContent = 'unLike';
                likeButton.classList.add('liked');
            }
            showThreadDetail(threadId);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function postEditComment (data) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }
    return fetch(`http://localhost:5005/comment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        showThreadDetail(currentSelectedThread);
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function editComment (threadId, commentId, commentContent) {
    const commentContentDom = document.getElementById(`comment-content-${commentId}`);
    const commentCreatedAtDom = document.getElementById(`comment-createdAt-${commentId}`);

    const editCommentInput = document.createElement('textarea');
    editCommentInput.placeholder = 'Edit a new comment';
    editCommentInput.id = 'editCommentInput';
    editCommentInput.value = commentContent;
    commentContentDom.parentNode.replaceChild(editCommentInput, commentContentDom);

    const confirmEditButton = document.createElement('button');
    confirmEditButton.textContent = 'confirmEdit';
    confirmEditButton.setAttribute('id', `comment-edit-confirm-btn-${commentId}`);
    commentCreatedAtDom.parentNode.replaceChild(confirmEditButton, commentCreatedAtDom);
    confirmEditButton.addEventListener('click', () => {
        postEditComment({ id: commentId, content: editCommentInput.value });
    });

}

//---render thread detail---
function renderThreadDetail (thread) {
    const threadPage = document.getElementById('thread-page');

    while (threadPage.firstChild) {
        threadPage.removeChild(threadPage.firstChild);
    }

    const threadElement = document.createElement('div');
    threadElement.classList.add('thread-detail');

    const titleElement = document.createElement('h1');
    titleElement.textContent = `${thread.title}`;
    threadElement.appendChild(titleElement);

    const infoElement = document.createElement('p');
    const createdAt = new Date(thread.createdAt);
    const formattedDate = createdAt.toLocaleString();
    infoElement.textContent = `Author: ${thread.creator.name}  ${formattedDate}`;
    threadElement.appendChild(infoElement);

    const contentElement = document.createElement('p');
    contentElement.textContent = thread.content;
    threadElement.appendChild(contentElement);

    const likesElement = document.createElement('p');
    likesElement.textContent = `Likes: ${thread.likes.length}`;
    threadElement.appendChild(likesElement);

    threadPage.appendChild(threadElement);
}

// clear thread container
function clearThreadContainer () {
    const threadContainer = document.getElementById('feed-page');
    while (threadContainer.firstChild) {
        threadContainer.removeChild(threadContainer.firstChild);
    }
}

// clear thread detail container
function clearThreadDetailContainer () {
    const threadDetailContainer = document.getElementById('thread-page');
    while (threadDetailContainer.firstChild) {
        threadDetailContainer.removeChild(threadDetailContainer.firstChild);
    }
}

//--------create thread-----------
//---create button---
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', function () {
    window.location.hash = '#/create-thread';
});

//---create function---
function createThread (data) {
    if (!data.title || data.title.trim() === '') {
        alert('Title cannot be empty.');
        return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    fetch('http://localhost:5005/thread', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Thread created success:', data);
            document.getElementById('title').value = ''; 
            document.getElementById('content').value = ''; 
            document.getElementById('isPublic').checked = false; 

            window.location.href = '#/dashboard';
            getThreads();
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

//---create & cancel button---
document.getElementById('submit-thread-button').addEventListener('click', function (event) {

    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const isPublic = document.getElementById('isPublic').checked; 

    const threadData = {
        title: title,
        isPublic: isPublic,
        content: content
    };

    createThread(threadData);

});
const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function () {
    clearThreadContainer();
    window.location.hash = '#/dashboard';
});


//----edit thread---
function fillEditForm (thread) {
    document.getElementById('edit-title').value = thread.title;
    document.getElementById('edit-content').value = thread.content;
    document.getElementById('edit-isPublic').checked = thread.isPublic;
}

//----clear fill edit form function---
function clearFillEditForm (thread) {
    document.getElementById('edit-title').value = '';
    document.getElementById('edit-content').value = '';
    document.getElementById('edit-isPublic').checked = true;
}

function updateThread (threadId, updatedData) {
    clearThreadContainer();
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const token = localStorage.getItem('token');

    console.log('token', token);
    console.log('thread', thread);
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const requestBody = {
        id: threadId,
        title: updatedData.title,
        content: updatedData.content,
        isPublic: updatedData.isPublic,
        lock: thread.lock 
    };

    fetch(`http://localhost:5005/thread?id=${threadId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestBody) 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Thread updated successfully:', data);
            showThreadDetail(threadId);

            setTimeout(() => {
                window.location.hash = '#/dashboard'; 
            }, 100);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.getElementById('edit-thread-button').addEventListener('click', function (event) {
    event.preventDefault(); 

    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const threadId = thread.id; 

    const updatedData = {
        title: document.getElementById('edit-title').value,
        content: document.getElementById('edit-content').value,
        isPublic: document.getElementById('edit-isPublic').checked
    };

    updateThread(threadId, updatedData);
});

document.getElementById('edit-cancel-button').addEventListener('click', function () {
    clearThreadContainer();
    clearFillEditForm();
    setTimeout(function () {
        window.location.hash = '#/dashboard';
    }, 100); 
});
//----edit funtion end---

//----delete thread function---
function deleteThread (threadId) {
    clearThreadContainer();
    clearThreadDetailContainer();
    console.log('show', threadId);
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5005/thread?id=${threadId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: threadId }) 
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '#/dashboard';
                getThreads();
                // 在获取线程列表后，显示第一个线程的内容
                setTimeout(() => {
                    const threads = JSON.parse(localStorage.getItem('threadContents'));
                    console.log('thread给我看看', threads);
                    if (threads && threads.length > 0) {
                        const latestThreadId = threads[0].id; 
                        showThreadDetail(latestThreadId); 
                    }
                }, 500); 


            } else {
                console.error('Failed to delete thread');
            }
        })
        .catch(error => {
            console.error('Error deleting thread:', error);
        });
}

// refresh then show the first thread
function selectFirstThread () {
    const allThreads = document.querySelectorAll('.thread');
    allThreads.forEach(item => {
        item.classList.remove('selected');
    });
    const firstElement = allThreads[0];
    firstElement.classList.add('selected');
    const threadId = firstElement.dataset.threadid;
    currentSelectedThread = threadId;
    showThreadDetail(threadId);
}

function handleGetMoreThreads () {
    getThreads(requestThreadStartIndex);
}

const moreButtonDom = document.getElementById('more-button');
moreButtonDom.addEventListener('click', handleGetMoreThreads);

//----thread like ----

function toggleLikeThread (threadId) {
    clearThreadContainer();

    const token = localStorage.getItem('token');
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log('thread 1', thread.likes);
    console.log('currentUser', currentUser.id);

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    fetch(`http://localhost:5005/thread/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ id: threadId, turnon: !thread.likes.includes(currentUser.id) })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('liked111:', thread);
            const likeButton = document.getElementById('like-button');

            if (thread.likes.includes(currentUser.id)) {
                // Unlike thread
                const index = thread.likes.indexOf(currentUser.id);
                if (index > -1) {
                    thread.likes.splice(index, 1);
                }
                likeButton.textContent = 'Like';
                likeButton.classList.remove('liked');
            } else {
                // Like thread
                thread.likes.push(currentUser.id);
                likeButton.textContent = 'Unlike';
                likeButton.classList.add('liked');
            }

            console.log('liked:', thread.likes);
            localStorage.setItem('threadDetail', JSON.stringify(thread)); // Update thread detail in localStorage
            return response.json();
        })
        .then(data => {
            // After receiving response, update thread page and get latest threads
            getThreads();
            showThreadDetail(threadId);
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//----thread watch ----

function toggleWatchThread (threadId) {
    clearThreadContainer();

    const token = localStorage.getItem('token');
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log('thread 1', thread.watchees);
    console.log('currentUser', currentUser.id);

    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    fetch(`http://localhost:5005/thread/watch`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ id: threadId, turnon: !thread.watchees.includes(currentUser.id) })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('liked:', thread);
            const watchButton = document.getElementById('watch-button');

            if (thread.watchees.includes(currentUser.id)) {
                // Unwatch thread
                const index = thread.watchees.indexOf(currentUser.id);
                if (index > -1) {
                    thread.watchees.splice(index, 1);
                }
                watchButton.textContent = 'Watch';
                watchButton.classList.remove('watched');
            } else {
                // Watch thread
                thread.watchees.push(currentUser.id);
                watchButton.textContent = 'Unwatch';
                watchButton.classList.add('watched');
            }

            console.log('watched:', thread.watchees);
            localStorage.setItem('threadDetail', JSON.stringify(thread)); // Update thread detail in localStorage
            return response.json();
        })
        .then(data => {
            // After receiving response, update thread page and get latest threads
            getThreads();
            showThreadDetail(threadId);
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//---comment function 

//----post comment fuction ----
function postComment (threadId, content, parentCommentId = null) {
    const commentContent = document.getElementById('newCommentInput').value;
    const commentData = {
        'content': commentContent,
        'threadId': threadId,
        'parentCommentId': null
    };

    // 评论的评论内容
    if (content) {
        commentData.content = content;
    }
    if (parentCommentId) {
        commentData.parentCommentId = parentCommentId;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }
    fetch('http://localhost:5005/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(commentData) 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Comment posted successfully');
            document.getElementById('newCommentInput').value = '';
            showThreadDetail(threadId);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//----calculate Time Ago fuction ----
function calculateTimeAgo (timestamp) {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = now - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}


// user part
document.getElementById('person-button').addEventListener('click', function() {
    getUserProfile();
});

// function getUserProfile(){
//     const token = localStorage.getItem('token');
//     const storedUserId = window.localStorage.getItem("userId");
//     if (!token || !storedUserId) {
//         console.error('Token or userId not found in localStorage');
//         return Promise.resolve(null); // 返回一个解决的 promise，表示没有数据
//     }
//     // 发送请求获取用户个人资料信息
//     fetch(`http://localhost:5005/user?userId=${storedUserId}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': 'Bearer ' + token, 
//         }
//     })
//     .then(response => response.json())
//     .then(profileData => {
//         moreButtonDom.style.display = 'none'
        
//         // 隐藏feed-page和thread-page
//         document.getElementById('feed-page').classList.add('hidden');
//         document.getElementById('thread-page').classList.add('hidden');

//         // 显示user-own-page
//         const userOwnPage = document.getElementById('user-own-page');
//         const userThreadPage = document.getElementById('user-thread-page');
//         userOwnPage.classList.remove('hidden');
//         userThreadPage.classList.remove('hidden');

//         // 清空user-own-page中的内容
//         while (userOwnPage.firstChild) {
//             userOwnPage.removeChild(userOwnPage.firstChild);
//         }

//         // 创建user-own-page中的各个元素
//         const profileTitle = document.createElement('h2');
//         profileTitle.id = 'profileTitle';
//         profileTitle.textContent = 'User Detail';
//         userOwnPage.appendChild(profileTitle);

//         const emailLabel = document.createElement('p');
//         emailLabel.id = 'emailLabel';
//         userOwnPage.appendChild(emailLabel);

//         const usernameLabel = document.createElement('p');
//         usernameLabel.id = 'usernameLabel';
//         userOwnPage.appendChild(usernameLabel);

//         // 创建一个 <img> 元素
//         const userImageLabel = document.createElement('img');
//         userImageLabel.src = profileData.image;
//         userImageLabel.id = 'userImageLabel';
//         userOwnPage.appendChild(userImageLabel);

//         const adminLabel = document.createElement('p');
//         adminLabel.id = 'adminLabel';
//         userOwnPage.appendChild(adminLabel);

//         // 添加更新个人资料按钮
//         const updateProfileBtn = document.createElement('button');
//         updateProfileBtn.textContent = 'Update Profile';
//         updateProfileBtn.id = 'updateProfileBtn';
//         updateProfileBtn.addEventListener('click', function() {
//             // 执行更新个人资料的操作
//             showUpdateProfileDialog(profileData);
//         });
//         userOwnPage.appendChild(updateProfileBtn);

//         // 添加关闭按钮
//         const closeButton = document.createElement('button');
//         closeButton.textContent = 'Back';
//         closeButton.classList.add('close-button');
//         closeButton.addEventListener('click', function() {
//             // 隐藏user-own-page
//             userOwnPage.classList.add('hidden');
//             userThreadPage.classList.add('hidden');
//             // 显示feed-page和thread-page
//             document.getElementById('feed-page').classList.remove('hidden');
//             document.getElementById('thread-page').classList.remove('hidden');
//             moreButtonDom.style.display = 'block';
//         });
//         userOwnPage.appendChild(closeButton);
        

//         // 设置个人资料信息
//         emailLabel.textContent = 'Email:' + profileData.email;
//         usernameLabel.textContent = 'Name:' + profileData.name;
//         userImageLabel.textContent = 'Image:' + profileData.image;
//         adminLabel.textContent = 'Admin:' + profileData.admin;

//         //get user thread
//         console.log("storedUserId", storedUserId)
//         getUserThreads(storedUserId);
       
//     })
//     .catch(error => {
//         console.error('获取用户个人资料失败:', error);
//     });
// }

function getUserProfile(){
    const token = localStorage.getItem('token');
    const storedUserId = window.localStorage.getItem("userId");
    if (!token || !storedUserId) {
        console.error('Token or userId not found in localStorage');
        return Promise.resolve(null); // 返回一个解决的 promise，表示没有数据
    }
    // 发送请求获取用户个人资料信息
    fetch(`http://localhost:5005/user?userId=${storedUserId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token, 
        }
    })
    .then(response => response.json())
    .then(profileData => {
        moreButtonDom.style.display = 'none'
        console.log('??', profileData);
        // 隐藏feed-page和thread-page
        document.getElementById('feed-page').classList.add('hidden');
        document.getElementById('thread-page').classList.add('hidden');

        // 显示user-own-page
        const userOwnPage = document.getElementById('user-own-page');
        const userThreadPage = document.getElementById('user-thread-page');
        userOwnPage.classList.remove('hidden');
        userThreadPage.classList.remove('hidden');

        // 清空user-own-page中的内容
        while (userOwnPage.firstChild) {
            userOwnPage.removeChild(userOwnPage.firstChild);
        }

        // 创建user-own-page中的各个元素
        const profileTitle = document.createElement('h2');
        profileTitle.id = 'profileTitle';
        profileTitle.textContent = 'User Detail';
        userOwnPage.appendChild(profileTitle);

        const emailLabel = document.createElement('p');
        emailLabel.id = 'emailLabel';
        userOwnPage.appendChild(emailLabel);

        const usernameLabel = document.createElement('p');
        usernameLabel.id = 'usernameLabel';
        userOwnPage.appendChild(usernameLabel);

        // 创建一个 <img> 元素
        const userImageLabel = document.createElement('img');
        userImageLabel.src = profileData.image;
        userImageLabel.id = 'userImageLabel';
        userOwnPage.appendChild(userImageLabel);

        const adminLabel = document.createElement('p');
        adminLabel.id = 'adminLabel';
        userOwnPage.appendChild(adminLabel);

        console.log(storedUserId)
        console.log(profileData.id)
        // 添加更新个人资料按钮
        if (Number(storedUserId) === Number(profileData.id)) {
            const updateProfileBtn = document.createElement('button');
            updateProfileBtn.textContent = 'Update Profile';
            updateProfileBtn.id = 'updateProfileBtn';
            updateProfileBtn.addEventListener('click', function() {
                // 执行更新个人资料的操作
                showUpdateProfileDialog(profileData);
            });
            userOwnPage.appendChild(updateProfileBtn);
        }

        // 添加关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Back';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
            // 隐藏user-own-page
            userOwnPage.classList.add('hidden');
            userThreadPage.classList.add('hidden');
            // 显示feed-page和thread-page
            document.getElementById('feed-page').classList.remove('hidden');
            document.getElementById('thread-page').classList.remove('hidden');
            moreButtonDom.style.display = 'block';
        });
        userOwnPage.appendChild(closeButton);
        

        // 设置个人资料信息
        emailLabel.textContent = 'Email:' + profileData.email;
        usernameLabel.textContent = 'Name:' + profileData.name;
        userImageLabel.textContent = 'Image:' + profileData.image;
        adminLabel.textContent = 'Admin:' + profileData.admin;

        //get user thread
        console.log("storedUserId", storedUserId)
        getUserThreads(storedUserId);
       
    })
    .catch(error => {
        console.error('获取用户个人资料失败:', error);
    });
}



// 创建弹窗的HTML结构  
function createModal (title, profileData, message) {
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.overflow = 'auto';
    modal.tabIndex = -1; // 允许聚焦模态框

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.borderRadius = '5px';
    modalContent.style.padding = '20px';
    modalContent.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';

    // 创建标题元素  
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    modalContent.appendChild(titleElement);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'cancel';
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'finish';
    confirmButton.addEventListener('click', () => {
        alert('Are you sure modify ?');
        console.log(imageInput.files[0]);
        if (imageInput.files[0]) {
            // 创建文件读取器
            const reader = new FileReader();
            let base64;
            // 读取文件并转为base64
            reader.onload = function (e) {
                base64 = e.target.result;
                console.log(base64);
                const updateData = {
                    email: emailInput.value,
                    password: passwordInput.value,
                    name: nameInput.value,
                    image: base64
                };
                updateUserProfile(updateData).then(() => {
                    modal.remove();
                    getUserProfile();
                });
            };
            // 开始读取文件
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const updateData = {
                email: emailInput.value,
                password: passwordInput.value,
                name: nameInput.value,
                image: ''
            };
            updateUserProfile(updateData).then(() => {
                modal.remove();
                getUserProfile();
            });
        }
    });


    // 创建表单元素
    const form = document.createElement('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止默认提交行为
    });

    // 创建电子邮件地址输入框
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.value = profileData.email;
    let br = document.createElement('br');
    form.appendChild(emailInput);
    form.appendChild(br);

    // 创建姓名输入框
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.value = profileData.name;
    let br2 = document.createElement('br');
    form.appendChild(nameInput);
    form.appendChild(br2);

    // 创建密码输入框
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.value = currentLoginPassword;
    let br3 = document.createElement('br');
    form.appendChild(passwordInput);
    form.appendChild(br3);

    // 创建图像上传输入框
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.name = 'image';
    let br4 = document.createElement('br');
    form.appendChild(imageInput);
    form.appendChild(br4);


    // modalContent.appendChild(messageElement);
    modalContent.appendChild(form);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.focus(); // 将焦点设置在模态框上，确保Esc键可以关闭它  
}

function showUpdateProfileDialog (profileData) {
    console.log({ profileData });
    const message = 'pop';
    createModal('Modify user information', profileData, message);
}


// 更新用户个人资料的函数
function updateUserProfile(userData) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return Promise.resolve(null);
    }
    return fetch(`http://localhost:5005/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // 确保请求体是 JSON 格式
            'Authorization': 'Bearer ' + token // 包含正确的授权信息
        },
        body: JSON.stringify(userData) // 包含要更新的用户数据
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user profile');
                
            }
            getUserProfile();
            console.log('User profile updated successfully');
            
            return response.json();
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
            throw error;
        });
}



// get user thread detail
// const userThreadContainer = document.getElementById('user-thread-page');

// function getUserThreads(storedUserId) {
//     const token = localStorage.getItem('token');
//     console.log('storedUserId', storedUserId);
    
//     fetch(`http://localhost:5005/thread?creatorId=${storedUserId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Failed to fetch user threads');
//         }
//     })
//     .then(data => {
//         console.log('User threads:', data);
//         // 在这里处理获取到的用户线程数据
//         renderUserThreads(data); // 调用渲染线程的函数
//     })
//     .catch(error => {
//         console.error('Error fetching user threads:', error);
//         // 在这里处理错误
//     });
// }

// function getUserThreads(storedUserId) {
//     const token = localStorage.getItem('token');
//     console.log('storedUserId', storedUserId);
    
//     fetch(`http://localhost:5005/thread?creatorId=${storedUserId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Failed to fetch user threads');
//         }
//     })
//     .then(data => {
//         console.log('User threads:', data);
//         // 在这里处理获取到的用户线程数据
//         renderUserThreads(data); // 调用渲染线程的函数
//     })
//     .catch(error => {
//         console.error('Error fetching user threads:', error);
//         // 在这里处理错误
//     });
// }

// function renderUserThreads(data) {
//     const userThreadsContainer = document.getElementById('userThreadContainer');
//     // 清空之前的内容
//     while (userThreadsContainer.firstChild) {
//         userThreadsContainer.removeChild(userThreadsContainer.firstChild);
//     }

//     data.forEach(thread => {
//         // 创建线程容器
//         const threadElement = document.createElement('div');
//         threadElement.classList.add('user-thread');

//         // 创建用于显示线程信息的元素
//         const titleElement = document.createElement('h2');
//         titleElement.textContent = `标题：${thread.title}`;

//         const contentElement = document.createElement('p');
//         contentElement.textContent = `内容：${thread.content}`;

//         const likesCountElement = document.createElement('span');
//         likesCountElement.textContent = `点赞数：${thread.likes}`;

//         const commentsCountElement = document.createElement('span');
//         commentsCountElement.textContent = `评论数：${thread.comments.length}`;

//         // 将元素添加到线程容器中
//         threadElement.appendChild(titleElement);
//         threadElement.appendChild(contentElement);
//         threadElement.appendChild(likesCountElement);
//         threadElement.appendChild(commentsCountElement);

//         // 将线程容器添加到用户线程容器中
//         userThreadContainer.appendChild(threadElement);
//     });
// }



//const userThreadContainer = document.getElementById('user-thread-page');


function renderUserThreads(threads) {
    const userThreadContainer = document.getElementById('user-thread-page');
    while (userThreadContainer.firstChild) {
        userThreadContainer.removeChild(userThreadContainer.firstChild);
    }

    const titleElement = document.createElement('h1');
    titleElement.textContent = 'Personal Thread List';
    userThreadContainer.appendChild(titleElement);

    threads.forEach(thread => {
        const threadItem = document.createElement('div');
        threadItem.classList.add('thread-item');
        threadItem.style.border = '1px solid #ccc'; // 添加边框样式

        const titleElement = document.createElement('h2');
        titleElement.textContent = thread.title;
        threadItem.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = thread.content;
        threadItem.appendChild(contentElement);

        const likesCountElement = document.createElement('p');
        likesCountElement.textContent = `Likes: ${thread.likes.length}`;
        threadItem.appendChild(likesCountElement);

        userThreadContainer.appendChild(threadItem);
    });
}



function getUserThreads(storedUserId) {
    const token = localStorage.getItem('token');
    const creatorId = storedUserId;
    console.log('creatorId', creatorId);
    
    fetch(`http://localhost:5005/threads?start=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch user threads');
        }
    })
    .then(threadIds => {
        console.log('User threads:', threadIds);
        const threadContentPromises = threadIds.map(threadId => {
            return fetch(`http://localhost:5005/thread?id=${threadId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch thread content');
                }
            });
        });
        return Promise.all(threadContentPromises);
    })
    .then(userThreadContents => {
        console.log('userThreadContents', userThreadContents);
        console.log('storedUserId', storedUserId);
        
        // 过滤出 creatorId 等于 storedUserId 的内容
        const filteredContents = userThreadContents.filter(content => {
            return Number(content.creatorId) === Number(storedUserId);
        });

        console.log('filteredContents', filteredContents);
        
        renderUserThreads(filteredContents);
        
        // 处理过滤后的内容
        //localStorage.setItem('threadContents', JSON.stringify(filteredContents));
    })
    .catch(error => {
        console.error('Error fetching user threads:', error);

    });
}




function showView () {
    const hash = window.location.hash;
    switch (hash) {
        case '#/login':
            document.getElementById('login-register-page').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('create-thread-page').classList.add('hidden');
            document.getElementById('edit-thread-page').classList.add('hidden');
            break;
        case '#/register':
            document.getElementById('login-register-page').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('create-thread-page').classList.add('hidden');
            document.getElementById('edit-thread-page').classList.add('hidden');
            break;
        case '#/dashboard':
            if (localStorage.getItem('token')) {
                document.getElementById('login-register-page').classList.add('hidden');
                document.getElementById('dashboard').classList.remove('hidden');
                document.getElementById('create-thread-page').classList.add('hidden');
                document.getElementById('edit-thread-page').classList.add('hidden');
                getThreads();
            } else {
                window.location.hash = '#/login'; 
            }
            break;

        case '#/create-thread':
            document.getElementById('login-register-page').classList.add('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('create-thread-page').classList.remove('hidden');
            document.getElementById('edit-thread-page').classList.add('hidden');
            break;
        case '#/edit-thread':
            document.getElementById('login-register-page').classList.add('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('create-thread-page').classList.add('hidden');
            document.getElementById('edit-thread-page').classList.remove('hidden');
            break;
        default:
            window.location.hash = '#/login';
            break;

    }
}

window.addEventListener('load', showView);
window.addEventListener('hashchange', showView);