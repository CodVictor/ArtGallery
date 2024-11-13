const posts = new Map();
let nextId = 0;

export function addPost(post) {
    let id = nextId++;
    post.id = id.toString();
    posts.set(post.id, post);
}

export function deletePost(id){

    let post = getPost(id);

    posts.delete(id);

    return post;
}

export function getPosts(){
    return [...posts.values()];
}

export function getPost(id){
    return posts.get(id);
}