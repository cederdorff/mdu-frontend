let _selectedImgFile;
const _postRef = db.collection("posts");
let _posts;

// ------ Prieview image function ------ //
function previewImage(file, previewId) {
  if (file) {
    _selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = function(event) {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function triggerChooseImg() {
  document.querySelector("#img").click();
}

function createPost() {
  let description = document.querySelector("#description").value;
  let image = document.querySelector('#imagePreview').src;
  console.log(description);
  console.log(image);

  _postRef.add({
      description,
      image
    })
    .then(function() {
      console.log("Document successfully written!");
      showPage("home");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

}

// ========== READ ==========
// watch the database ref for changes
_postRef.onSnapshot(function(snapshotData) {
  _posts = [];
  snapshotData.forEach(function(doc) {
    let post = doc.data();
    post.id = doc.id;
    _posts.push(post);
  });
  console.log(_posts);
  appendPosts();
});

function appendPosts() {
  let htmlTemplate = "";
  for (let post of _posts) {
    console.log(post);
    htmlTemplate += `
      <article>
        <img src="${post.image}">
        <h3>${post.description}</h3>
      </article>
    `;
  }
  document.querySelector('#posts').innerHTML = htmlTemplate;
}