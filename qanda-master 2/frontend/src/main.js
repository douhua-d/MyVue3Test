import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';


// global variable
let requestThreadStartIndex = 0;

//login-register-page
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerLink").addEventListener("click", showRegistrationForm);
    document.getElementById("loginLink").addEventListener("click", showLoginForm);

    function showRegistrationForm(event) {
        event.preventDefault();
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registrationForm").style.display = "block";
    }

    function showLoginForm(event) {
        event.preventDefault();
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    }
});


//---login function---
function fetchUserDetails(userId, token) {
    return fetch(`http://localhost:5005/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token, 
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

function login(event) {
    clearThreadContainer();
    
    event.preventDefault();
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    
    //---if email,password is none
    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (!password) {
        alert("Please enter your password.");
        return;
    }
    
    const data = {
        email,
        password,
    };
    
    fetch("http://localhost:5005/auth/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Login failed.");
        }
        return res.json();
    })
    .then(data => {
        console.log('login success: ', data);
        // login successful, load dashboard
        window.location.hash = "#/dashboard";
        const { token } = data;
        window.localStorage.setItem("token", token);
        const { userId } = data;
        window.localStorage.setItem("userId", userId.toString());
        
        // 调用 fetchUserDetails 函数获取用户详情
        fetchUserDetails(userId, token)
            .then(user => {
                console.log('current user details:', user);
                // 将当前用户详细信息存储到本地存储
                window.localStorage.setItem("currentUser", JSON.stringify(user));
                // 在此处处理用户信息
            })
            .catch(error => {
                alert('Failed to fetch user details');
            });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
    });
}

//---login button
const loginBtn = document.getElementById("login-button");
loginBtn.addEventListener('click', login);

//---register function---
function register(event) {
    event.preventDefault();
    const email = document.getElementById("regEmail").value;
    const name = document.getElementById("username").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // 检查密码是否匹配
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // 构造请求体数据
    const data = {
        email,
        name,
        password,
        confirmPassword,
    };

    // 发送 POST 请求
    fetch("http://localhost:5005/auth/register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Registration failed.");
        }
        return res.json();
    })
    .then(data => {
        console.log('Registration success: ', data);
        alert("Registration successful! You can now log in with your email and password.");
        
    
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Registration failed. Please try again.");
    });
}
//---register button---
const registerBtn = document.getElementById("register-button");
registerBtn.addEventListener('click', register);

//---logout function---
function logout() {
    const confirmed = confirm("Are you sure you want to log out?");
    if (confirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('threadDetail');
        localStorage.removeItem('threadContents');
        
        window.location.hash = "#/login";
    }
}

//---logout button---
document.getElementById('logout-button').addEventListener('click', logout);
//---logout function end---


//----get thread function---
const threadListContainer = document.getElementById("feed-page");
// const moreButton = document.getElementById("moreButton");

function getThreads(startIndex = 0) {
    if (startIndex === 0) {
        moreButtonDom.style.display = 'block';
    }
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("Token not found in localStorage");
        return; // 如果没有有效的令牌，则不执行后续操作
    }
    // 发送 GET 请求获取线程列表
    fetch(`http://localhost:5005/threads?start=${startIndex}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            'Authorization': 'Bearer ' + token,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();       
    })
    .then(threadIds => {
        console.log("Threads:", threadIds);

        // 更新请求的开始索引用于more获取
        requestThreadStartIndex = startIndex + 5;
        if (!threadIds.length) {
            window.alert('no more data');
            moreButtonDom.style.display = 'none';
        }
        
        // 用Promise.all发送请求获取所有线程的内容
        const threadContentPromises = threadIds.map(threadId => {
            return fetch(`http://localhost:5005/thread?id=${threadId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json", 
                    'Authorization': 'Bearer ' + token,
                }
            });
        });

        // 等待所有线程内容请求完成
        return Promise.all(threadContentPromises);
    })
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(threadContents => {
        console.log("Thread content:", threadContents);
        localStorage.setItem('threadContents', JSON.stringify(threadContents));
        // 获取所有创建者的ID
        const creatorIds = threadContents.map(thread => thread.creatorId);
        // 获取所有用户的详情
        const userDetailPromises = creatorIds.map(creatorId => {
            return fetch(`http://localhost:5005/user?userId=${creatorId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token, 
                }
            }).then(response => response.json());
        });
        return Promise.all(userDetailPromises)
            .then(userDetails => ({ threadContents, userDetails }));
    })
    .then(({ threadContents, userDetails }) => {
        console.log("User Details:", userDetails);

        const userDetailMap = userDetails.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
        threadContents.forEach((thread) => {
            thread.creator = userDetailMap[thread.creatorId];
        });
        console.log(threadContents);
        // 渲染线程内容到页面上
        renderThreads(threadContents, userDetails);

        // 选中当前列表的第一项&展示该项详情
        selectFirstThread();
    })
    .catch(error => {
        console.error("Error loading threads:", error);
    });
}

// 渲染线程列表的函数
function renderThreads(threads) {
    // 遍历每个线程并创建线程元素
    threads.forEach(thread => {
        const threadElement = document.createElement("div");
        threadElement.classList.add("thread");
        threadElement.dataset.threadid = thread.id;

        // 创建线程标题元素
        const titleElement = document.createElement("h3");
        titleElement.textContent = `${thread.title}`;
        // 点击线程标题时显示详情
        

        // 创建作者和发布日期元素
        const infoElement = document.createElement("p");
        const createdAt = new Date(thread.createdAt);
        const formattedDate = createdAt.toLocaleString();
        infoElement.textContent = `Author: ${thread.creator.name}  ${formattedDate}`;


        // 创建点赞数元素
        const likesElement = document.createElement("p");
        likesElement.textContent = `Likes: ${thread.likes.length}`;

        // 将标题、作者、发布日期和点赞数添加到线程元素中
        threadElement.appendChild(titleElement);
        threadElement.appendChild(infoElement);
        threadElement.appendChild(likesElement);

        // 将线程元素添加到线程列表容器中
        threadListContainer.appendChild(threadElement);

         // 点击事件监听器
         threadElement.addEventListener("click", () => {
            // 清除其他线程的选中状态
            const allThreads = document.querySelectorAll(".thread");
            allThreads.forEach(item => {
                item.classList.remove("selected");
            });

            // 添加选中状态到当前线程
            threadElement.classList.add("selected");

            // 显示线程详情
            showThreadDetail(thread.id); // 传递 threadId
					 
					 	// getThreadComments(thread.id);  
        });

        // 创建并添加分隔线
        const separator = document.createElement("hr");
        threadListContainer.appendChild(separator);
        
    });


}

// get thread detail function

function showThreadDetail(threadId) {
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
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(thread => {
        console.log('threadDetail', thread)

        // 如果创建者详情不存在，则获取创建者详情
        if (!thread.creator) {
            return fetch(`http://localhost:5005/user?userId=${thread.creatorId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token, 
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(creator => {
                // 填充 thread 对象的 creator 属性
                thread.creator = creator;
                // 存储 thread 对象的 threadDetail 到 localStorage 中
                window.localStorage.setItem("threadDetail", JSON.stringify(thread));

                return thread;
            });
        } else {
            return thread;
        }
    })
    .then(thread => {
        // 渲染线程详情
        renderThreadDetail(thread);

        //检查当前用户是否是线程的管理员或创建者，如果是，则显示编辑按钮
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('当前用户信息:', currentUser); // 添加此行以检查当前用户信息是否正确加载
        console.log("current id", currentUser.id)
        console.log("thread creator id",thread.creatorId)
        
        if (currentUser.id === thread.creatorId || currentUser.admin) {
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.id = "edit-button";
            editButton.classList.remove("hidden"); // 默认隐藏编辑按钮

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.id = "delete-button";
            deleteButton.classList.remove("hidden"); // 默认隐藏删除按钮

            // 将编辑按钮添加到页面上
            const threadPage = document.getElementById("thread-page");
            threadPage.appendChild(editButton);
            threadPage.appendChild(deleteButton);

            // 给编辑按钮添加点击事件监听器
            editButton.addEventListener("click", () => {
                // 显示编辑页面
                window.location.hash = "#/edit-thread";
                // 填充编辑表单内容
                fillEditForm(thread);
            });
            // 给删除按钮添加点击事件监听器
            deleteButton.addEventListener("click", () => {
                // 显示确认弹窗
                const confirmDelete = confirm("Are you sure you want to delete this thread?");
                if (confirmDelete) {
                    // 用户点击确认后，执行删除线程的操作
                    deleteThread(thread.id);
                }
            });

        }

        //---like button---
        const likeButton = document.createElement("button");
        likeButton.textContent = "Like"; 
        likeButton.id = "like-button"; 
        const threadPage = document.getElementById("thread-page");
        threadPage.appendChild(likeButton);
        
        if (thread.likes.includes(currentUser.id)) {
            likeButton.textContent = "Unlike";
            likeButton.classList.add("liked");
        }

        // 给喜欢按钮添加点击事件监听器
        likeButton.addEventListener("click", () => {
            toggleLikeThread(threadId);
        });

        //---watch button---
        const watchButton = document.createElement("button");
        watchButton.textContent = "Watch";
        watchButton.id = "watch-button"; 
        threadPage.appendChild(watchButton);

        if (thread.watchees.includes(currentUser.id)) {
            watchButton.textContent = "Unwatched";
            watchButton.classList.add("watched");
        }

        // 给喜欢按钮添加点击事件监听器
        watchButton.addEventListener("click", () => {
            toggleWatchThread(threadId);
        });

        // 渲染评论区域
        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
				commentSection.setAttribute('id', 'comment-section');
        threadPage.appendChild(commentSection);

        // 渲染新评论输入框和评论按钮
        const newCommentInput = document.createElement("textarea");
        newCommentInput.placeholder = "Add a new comment";
        newCommentInput.id = "newCommentInput"; 
        commentSection.appendChild(newCommentInput);

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
        commentSection.appendChild(commentButton);

        // 添加评论按钮点击事件处理程序
        commentButton.addEventListener("click", () => {
            const commentContent = document.getElementById('newCommentInput').value;
            if (commentContent !== '') {
                postComment(thread.id); // 调用 postComment 函数提交评论
                newCommentInput.value = ''; // 清空输入框内容
            }
        });
         
		 getThreadComments(threadId);
		})
    .catch(error => {
        console.error('Error loading threads:', error);
    });
}


function getThreadComments(threadId) {
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
		},
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(comments => {
        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		// 遍历评论列表，并将每条评论显示在页面上
		console.log("comments", comments);
		comments.forEach(comment => {
            console.log("comment id", comment);
			const commentListContainer = document.createElement('div');
			commentListContainer.setAttribute('id', 'comment-list-container');
			
			const commentSection = document.getElementById('comment-section');
			commentSection.appendChild(commentListContainer);
			
			const commentDetail = document.createElement('div');
			commentDetail.classList.add('commentDetail');
			commentDetail.setAttribute('id', comment.id);
            const commentAutor = document.createElement('p');
            getCreatorName(comment.creatorId)
                .then(user => {
                    commentAutor.textContent = user;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
			
			const commentContent = document.createElement('p');
            commentContent.setAttribute('id', `comment-content-${comment.id}`);
			commentContent.textContent = comment.content;
			
            const createdAtSpan = document.createElement('span');
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
            commentLikeBtn.classList.add('commentLikeBtn'); // 将类名修改为 'commentLikeBtn'
            commentLikeBtn.setAttribute('id', `like${comment.id}`);
            commentDetail.appendChild(commentLikeBtn);
            if (comment.likes.includes(currentUser.id)) {
                commentLikeBtn.textContent = "Unlike";
                commentLikeBtn.classList.add("liked");
            }
            
            const commentLikeBtns = document.querySelectorAll('.commentLikeBtn');
            commentLikeBtns.forEach(btn => {
                if (!btn.hasEventListener) {
                    btn.hasEventListener = true; 
                    btn.addEventListener('click', function() {
                        const commentId = parseInt(btn.id.slice(4));
                        const commetLike = comment.likes; 
                        likeComment(threadId, commentId, commetLike);
                    });
                }
            });

            const editCommentBtn = document.createElement('button');
            editCommentBtn.textContent='edit';
            editCommentBtn.classList.add('form');
            editCommentBtn.classList.add('hidden');
            editCommentBtn.classList.add('editCommentBtn');
            editCommentBtn.setAttribute('id', `edit${comment.id}`);
            commentDetail.appendChild(editCommentBtn);

            const editCommentBtns = document.querySelectorAll('.editCommentBtn');
            editCommentBtns.forEach(btn => {
                if (!btn.hasEventListener) {
                    btn.hasEventListener = true; 
                    btn.addEventListener('click', function() {
                        const commentId = parseInt(btn.id.slice(4));
                        const commentContent = comment.content; 
                        editComment(threadId, commentId, commentContent);
                    });
                }
            });            

            const deleteCommentBtn = document.createElement('button');
            deleteCommentBtn.textContent='Delete';
            deleteCommentBtn.classList.add('form');
            deleteCommentBtn.classList.add('hidden');
            deleteCommentBtn.classList.add('deleteCommentBtn');
            deleteCommentBtn.setAttribute('id', `del${comment.id}`);
            commentDetail.appendChild(deleteCommentBtn)
            
            const deleteCommentBtns = document.querySelectorAll('.deleteCommentBtn');
            deleteCommentBtns.forEach(btn => {
                if (!btn.hasEventListener) {
                    btn.hasEventListener = true; 
                    btn.addEventListener('click', function() {
                        const commentId = parseInt(btn.id.slice(3));
                        
                        // 显示确认框
                        const confirmed = confirm("Are you sure you want to delete this comment?");
                        if (confirmed) {
                            deleteComment(threadId, commentId);
                        } else {
                            // 用户取消了操作
                            console.log("Deletion canceled by user.");
                        }
                    });
                }
            });
            
                        
            const commentForCommentBtn=document.createElement('button');
            commentForCommentBtn.textContent='Comment';
            commentForCommentBtn.setAttribute('id', 'commentForCommentBtn');
            commentDetail.appendChild(commentForCommentBtn);

            if(comment.creatorId.toString()===localStorage.userId||localStorage.currentUser.admin==='true'){
                deleteCommentBtn.classList.remove('hidden');
                editCommentBtn.classList.remove('hidden');
            }
		})
	}).catch(error => {
		console.error('Error loading threads:', error);
	});
}
//

function getCreatorName(creatorId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return Promise.resolve(null); // 返回一个解决的 promise，表示没有数据
    }

    return fetch(`http://localhost:5005/user?userId=${creatorId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    })
    .then(userData => {
        return userData.name; // 返回用户名称
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        return null; // 或者你可以抛出一个异常，具体取决于你的需求
    });
}


// function deleteComment(threadId){
//     const deleteCommentBtns = document.querySelectorAll('.deleteCommentBtn');
//     console.log('delete', deleteCommentBtns.length); // 输出 NodeList 的长度
//     console.log('delete', deleteCommentBtns); // 输出 NodeList 中的元素
   
//     deleteCommentBtns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             const commentId = parseInt(btn.id.slice(1)); // 在这里引用 btn
//             console.log('commentId', commentId)
//             const token = localStorage.getItem('token');
//             fetch('http://localhost:5005/comment', {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + token
//                 },
//                 body: JSON.stringify({ "id": commentId})
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 console.log('Comment deleted successfully');
//                 getThreadComments(threadId);
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//         });
//     });
// }



// 渲染线程详情的函数

function deleteComment(threadId, commentId) {
    console.log('commentId', commentId)
    const token = localStorage.getItem('token');
    fetch('http://localhost:5005/comment', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ "id": commentId })
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


// //like comment
// function likeComment(threadId, commentId, commentLike) {
//     console.log('commentId', commentId);
//     const token = localStorage.getItem('token');
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//     if (!token) {
//         console.error('Token not found in localStorage');
//         return;
//     }

//     fetch(`http://localhost:5005/comment/like`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({ id: commentId, turnon: !commentLike.includes(currentUser.id) }) // 添加了 userId
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // 更新本地存储中的评论信息
//         const comments = JSON.parse(localStorage.getItem('comments'));
//         if (!comments || !Array.isArray(comments)) {
//             console.error('Comments array is null or not an array');
//             return;
//         }
//         const commentIndex = comments.findIndex(comment => comment.id === commentId);
//         if (commentIndex !== -1) {
//             // 更新评论的喜欢状态
//             if (data.liked) {
//                 comments[commentIndex].likes.push(currentUser.id);
//             } else {
//                 const index = comments[commentIndex].likes.indexOf(currentUser.id);
//                 if (index !== -1) {
//                     comments[commentIndex].likes.splice(index, 1);
//                 }
//             }
//             localStorage.setItem('comments', JSON.stringify(comments));
//         }
//         // 更新界面
//         getThreadComments();
//         showCommentDetail(threadId, commentId);
//     })

// }



function likeComment(threadId, commentId, commentLikes) {
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
        body: JSON.stringify({ id: commentId, turnon: !isLiked }) // 添加了 userId
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!isLiked) {
            // 如果评论之前未被喜欢，将按钮文本设置为“Unlike”
            likeButton.textContent = 'like';
            likeButton.classList.remove('liked');
        } else {
            // 如果评论之前已被喜欢，将按钮文本设置为“Like”
            likeButton.textContent = 'unLike';
            likeButton.classList.add('liked');
        }
        showThreadDetail(threadId);

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


// function editComment(threadId, commentId, commentContent) {
//     const thread = JSON.parse(localStorage.getItem('threadDetail'));
//     const token = localStorage.getItem('token');
//     if (!token) {
//         console.error('Token not found in localStorage');
//         return;
//     }

//     fetch('http://localhost:5005/comment', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify( {"id": commentId, "content" = })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
// }

function editComment(threadId, commentId, commentContent){
    console.log(threadId, commentId, commentContent);
    const commentContentDom = document.getElementById(`comment-content-${commentId}`);
    // commentContentDom.style.display = 'none';
    // 渲染编辑评论输入框和评论按钮
    const editCommentInput = document.createElement("textarea");
    editCommentInput.placeholder = "Edit a new comment";
    editCommentInput.id = "editCommentInput";
    editCommentInput.value =commentContent;
    commentContentDom.parentNode.replaceChild(editCommentInput,commentContentDom)
}








//---render thread detail---
function renderThreadDetail(thread) {
    const threadPage = document.getElementById("thread-page");
    
    // 清空 thread-page 的内容
    while (threadPage.firstChild) {
        threadPage.removeChild(threadPage.firstChild);
    }

    // 创建线程详情元素
    const threadElement = document.createElement("div");
    threadElement.classList.add("thread-detail");

    // 创建线程标题元素
    const titleElement = document.createElement("h1");
    titleElement.textContent = `${thread.title}`;
    threadElement.appendChild(titleElement);

    // 创建作者和发布日期元素
    const infoElement = document.createElement("p");
    const createdAt = new Date(thread.createdAt);
    const formattedDate = createdAt.toLocaleString();
    infoElement.textContent = `Author: ${thread.creator.name}  ${formattedDate}`;
    threadElement.appendChild(infoElement);

    // 创建内容元素
    const contentElement = document.createElement("p");
    contentElement.textContent = thread.content;
    threadElement.appendChild(contentElement);

    // 创建点赞数元素
    const likesElement = document.createElement("p");
    likesElement.textContent = `Likes: ${thread.likes.length}`;
    threadElement.appendChild(likesElement);

    // 将线程详情元素添加到 thread-page 中
    threadPage.appendChild(threadElement);
}

// 更多按钮点击事件处理程序
// moreButton.addEventListener("click", function() {
//     // 获取当前已加载的线程数量
//     const currentThreadsCount = threadListContainer.querySelectorAll('.thread').length;
//     // 加载更多线程
//     getThreads(currentThreadsCount);
// });

// 清空线程容器
function clearThreadContainer() {
    const threadContainer = document.getElementById("feed-page");
    // 循环删除所有子节点
    while (threadContainer.firstChild) {
        threadContainer.removeChild(threadContainer.firstChild);
    }
}

function clearThreadDetailContainer() {
    const threadDetailContainer = document.getElementById("thread-page");
    // 循环删除所有子节点
    while (threadDetailContainer.firstChild) {
        threadDetailContainer.removeChild(threadDetailContainer.firstChild);
    }
}

//--------create thread-----------
//---create button---
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', function() {
     window.location.hash = "#/create-thread";   
});

//---create function---
function createThread(data) {
    console.log("清空完成");
    if (!data.title || data.title.trim() === "") {
        alert("Title cannot be empty.");
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
        // 在这里执行一些操作，比如更新界面等
        document.getElementById('title').value = ""; // 清空标题输入框
        document.getElementById('content').value = ""; // 清空内容输入框
        document.getElementById('isPublic').checked = false; // 清空内容输入框
       
        window.location.href = '#/dashboard';
            clearThreadContainer();
            getThreads();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}

//---create & cancel button---
document.getElementById('submit-thread-button').addEventListener('click', function(event) {
    
    event.preventDefault(); // 阻止表单默认提交行为
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const isPublic = document.getElementById('isPublic').checked; // 获取 checkbox 的状态

    const threadData = {
        title: title,
        isPublic: isPublic,
        content: content
    };

    createThread(threadData);
   
});
const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function() {
    clearThreadContainer();
    window.location.hash = "#/dashboard";
});



//----edit thread---
function fillEditForm(thread) {
    document.getElementById('edit-title').value = thread.title;
    document.getElementById('edit-content').value = thread.content;
    document.getElementById('edit-isPublic').checked = thread.isPublic;
}

//----clear fill edit form function---
function clearFillEditForm(thread) {
    document.getElementById('edit-title').value = '';
    document.getElementById('edit-content').value = '';
    document.getElementById('edit-isPublic').checked = true;
}

function updateThread(threadId, updatedData) {
    clearThreadContainer();
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const token = localStorage.getItem('token');
    
    console.log('token', token)
    console.log('thread', thread)
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }

    const requestBody = {
        id: threadId,
        title: updatedData.title,
        content: updatedData.content,
        isPublic: updatedData.isPublic,
        lock: thread.lock // 设置锁定属性的值，根据需要更改
    };

    fetch(`http://localhost:5005/thread?id=${threadId}`, {
        method: 'PUT', // 使用 PUT 方法更新线程
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestBody) // 更新后的线程内容
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Thread updated successfully:', data);
        // 在这里执行一些操作，比如更新界面等
        showThreadDetail(threadId);
        // window.location.hash = "#/dashboard"; // 编辑成功后跳转到仪表板页面
        setTimeout(() => {
            window.location.hash = "#/dashboard"; // 编辑成功后跳转到仪表板页面
        }, 100);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

document.getElementById('edit-thread-button').addEventListener('click', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 从页面中获取线程信息，这里假设您从某个地方获取了 thread 对象
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const threadId = thread.id; // 使用线程对象的ID
    
    const updatedData = {
        title: document.getElementById('edit-title').value,
        content: document.getElementById('edit-content').value,
        isPublic: document.getElementById('edit-isPublic').checked
    };

    // 在这里传递线程ID和更新后的数据
    updateThread(threadId, updatedData);
});

document.getElementById('edit-cancel-button').addEventListener('click', function() {  
    clearThreadContainer();
    clearFillEditForm();      
    // 延迟一小段时间后再跳转到仪表板页面
    setTimeout(function() {
        window.location.hash = "#/dashboard";
    }, 100); // 可以根据需要调整延迟的时间
});
//----edit funtion end---

//----delete thread function---
function deleteThread(threadId) {
    clearThreadContainer();
    clearThreadDetailContainer();
    console.log("show", threadId)
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5005/thread?id=${threadId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        // 如果需要发送请求体，确保它的格式正确
        body: JSON.stringify({ id: threadId }) // 例如，将线程ID作为对象的属性发送
    })
    .then(response => {
        if (response.ok) {
            // 成功删除线程后重定向到线程列表中最新的单个线程帖子
            
            window.location.href = '#/dashboard';
            getThreads();
            // 在获取线程列表后，显示第一个线程的内容
            setTimeout(() => {
                const threads = JSON.parse(localStorage.getItem('threadContents')); // 获取线程列表
                console.log('thread给我看看', threads)
                if (threads && threads.length > 0) {
                    const latestThreadId = threads[0].id; // 获取最新线程的ID
                    showThreadDetail(latestThreadId); // 显示最新线程的内容
                }
            }, 500); // 等待一小段时间以确保线程列表已经更新
            
            
        } else {
            console.error('Failed to delete thread');
        }
    })
    .catch(error => {
        console.error('Error deleting thread:', error);
    });
}

// 刷新后选中当前列表的第一项&展示该项详情
function selectFirstThread() {
  const allThreads = document.querySelectorAll(".thread");
  // 清除其他线程的选中状态
  allThreads.forEach(item => {
    item.classList.remove("selected");
  });
  const firstElement = allThreads[0];
  // 添加选中状态到当前线程
  firstElement.classList.add("selected");
  const threadId = firstElement.dataset.threadid;
  // 显示线程详情
  showThreadDetail(threadId);
}

function handleGetMoreThreads () {
    getThreads(requestThreadStartIndex)
}

const moreButtonDom = document.getElementById('more-button');
moreButtonDom.addEventListener('click', handleGetMoreThreads);

//----thread like ----

function toggleLikeThread(threadId) {
    clearThreadContainer();
    
    const token = localStorage.getItem('token');
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    console.log("thread 1", thread.likes);
    console.log("currentUser", currentUser.id);
    
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
        console.log("liked111:", thread);
        const likeButton = document.getElementById("like-button");

        if (thread.likes.includes(currentUser.id)) {
            // Unlike thread
            const index = thread.likes.indexOf(currentUser.id);
            if (index > -1) {
                thread.likes.splice(index, 1);
            }
            likeButton.textContent = "Like";
            likeButton.classList.remove("liked");
        } else {
            // Like thread
            thread.likes.push(currentUser.id);
            likeButton.textContent = "Unlike";
            likeButton.classList.add("liked");
        }
        
        console.log("liked:", thread.likes);
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

function toggleWatchThread(threadId) {
    clearThreadContainer();
    
    const token = localStorage.getItem('token');
    const thread = JSON.parse(localStorage.getItem('threadDetail'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    console.log("thread 1", thread.watchees);
    console.log("currentUser", currentUser.id);
    
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
        console.log("liked111:", thread);
        const watchButton = document.getElementById("watch-button");

        if (thread.watchees.includes(currentUser.id)) {
            // Unwatch thread
            const index = thread.watchees.indexOf(currentUser.id);
            if (index > -1) {
                thread.watchees.splice(index, 1);
            }
            watchButton.textContent = "Watch";
            watchButton.classList.remove("watched");
        } else {
            // Watch thread
            thread.watchees.push(currentUser.id);
            watchButton.textContent = "Unwatch";
            watchButton.classList.add("watched");
        }
        
        console.log("watched:", thread.watchees);
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
function postComment(threadId) {   
    const commentContent = document.getElementById('newCommentInput').value;
    const commentData = {
        "content": commentContent,
        "threadId": threadId,
        "parentCommentId": null
    };
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
        body: JSON.stringify(commentData) // 将评论数据作为请求体
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Comment posted successfully');
            document.getElementById('newCommentInput').value = "";
            showThreadDetail(threadId);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//----calculate Time Ago fuction ----
function calculateTimeAgo(timestamp) {
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


function showView() {
    const hash = window.location.hash;
    // 根据哈希值来切换视图
    switch (hash) {
        case "#/login":
            document.getElementById("login-register-page").classList.remove("hidden");
            document.getElementById("dashboard").classList.add("hidden");
            document.getElementById("create-thread-page").classList.add("hidden");
            document.getElementById("edit-thread-page").classList.add("hidden");
            break;
        case "#/register":
            document.getElementById("login-register-page").classList.remove("hidden");
            document.getElementById("dashboard").classList.add("hidden");
            document.getElementById("create-thread-page").classList.add("hidden");
            document.getElementById("edit-thread-page").classList.add("hidden");
            break;
        case "#/dashboard":
            if (localStorage.getItem("token")) {
                document.getElementById("login-register-page").classList.add("hidden");
                document.getElementById("dashboard").classList.remove("hidden");
                document.getElementById("create-thread-page").classList.add("hidden");
                document.getElementById("edit-thread-page").classList.add("hidden");
                getThreads(); // 只有当用户已登录时才加载线程列表
            } else {
                window.location.hash = "#/login"; // 如果用户未登录，则重定向到登录页面
            }
            break;

        case "#/create-thread":
            document.getElementById("login-register-page").classList.add("hidden");
            document.getElementById("dashboard").classList.add("hidden");
            document.getElementById("create-thread-page").classList.remove("hidden");
            document.getElementById("edit-thread-page").classList.add("hidden");
            break;
        case "#/edit-thread":
            document.getElementById("login-register-page").classList.add("hidden");
            document.getElementById("dashboard").classList.add("hidden");
            document.getElementById("create-thread-page").classList.add("hidden");
            document.getElementById("edit-thread-page").classList.remove("hidden");
            break;
        default:
            // default page => login
            window.location.hash = "#/login";
            break;
            
    }
}

// 在页面加载时和哈希变化时调用showView函数
window.addEventListener("load", showView);
window.addEventListener("hashchange", showView);