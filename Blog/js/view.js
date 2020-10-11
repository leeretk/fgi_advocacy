$(document).ready(function() {
  // Getting a reference to the input field where user adds a new blog
  var $newItemInput = $("input.new-item");
  // Our new blogs will go inside the blogContainer
  var $blogContainer = $(".blog-container");
  // Adding event listeners for deleting, editing, and adding blogs
  $(document).on("click", "button.delete", deleteBlog);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".blog-item", editBlog);
  $(document).on("keyup", ".blog-item", finishEdit);
  $(document).on("blur", ".blog-item", cancelEdit);
  $(document).on("submit", "#blog-form", insertBlog);

  // Our initial blogs array
  var blogs = [];

  // Getting blogs from database when page loads
  getBlogs();

  // This function resets the blogs displayed with new blogs from the database
  function initializeRows() {
    $blogContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < blogs.length; i++) {
      rowsToAdd.push(createNewRow(blogs[i]));
    }
    $blogContainer.prepend(rowsToAdd);
  }

  // This function grabs blogs from the database and updates the view
  function getBlogs() {
    $.get("/api/blogs", function(data) {
      blogs = data;
      initializeRows();
    });
  }

  // This function deletes a blog when the user clicks the delete button
  function deleteBlog(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/blogs/" + id
    }).then(getBlogs);
  }

  // This function handles showing the input box for a user to edit a Blog
  function editBlog() {
    var currentBlog = $(this).data("blog");
    $(this).children().hide();
    $(this).children("input.edit").val(currentBlog.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var blog = $(this).parent().data("blog");
    blog.complete = !blog.complete;
    updateBlog(blog);
  }

  // This function starts updating a blog in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedBlog = $(this).data("blog");
    if (event.which === 13) {
      updatedBlog.text = $(this).children("input").val().trim();
      $(this).blur();
      updateBlog(updatedBlog);
    }
  }

  // This function updates a Blog in our database
  function updateBlog(blog) {
    $.ajax({
      method: "PUT",
      url: "/api/blogs",
      data: blog
    }).then(getBlogs);
  }

  // This function is called whenever a blog item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentBlog = $(this).data("blog");
    if (currentBlog) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentBlog.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a blog-item row
  function createNewRow(blog) {
    var $newInputRow = $(
      [
        "<li class='list-group-item blog-item'>",
        "<span>",
        blog.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", blog.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("blog", blog);
    if (blog.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new blog into our database and then updates the view
  function insertBlog(event) {
    event.preventDefault();
    var blog = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/blogs", blog, getBlogs);
    $newItemInput.val("");
  }
});
