import $ from 'jquery';

import {
  indexTasks,
  markComplete,
  markActive,
  postTask,
  deleteTask
} from "./requests.js";

function renderTasks() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      var buttonText = task.completed ? 'Mark Active' : 'Mark Complete';
      var buttonClass = task.completed ? 'btn btn-warning mark-active-btn' : 'btn btn-success mark-complete-btn';
      return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
        " + task.content + "\
        <button class='" + buttonClass + "' data-id='" + task.id + "'>" + buttonText + "</button> \
        <button class='delete-btn btn btn-danger' data-id='" + task.id + "'>Remove</button> \
        </div>";
    }).join('');

    $("#tasks").html(htmlString);

    $(".mark-complete-btn").on("click", function() {
      var taskId = $(this).data("id");
      markComplete(taskId, renderTasks); 
    });

    $(".mark-active-btn").on("click", function() {
      var taskId = $(this).data("id");
      markActive(taskId, renderTasks); 
    });

    $(".delete-btn").on("click", function() {
      var taskId = $(this).data("id");
      deleteTask(taskId, renderTasks); 
    });
  });
}

renderTasks();

$(document).ready(function () {
  $("#add-task-btn").on("click", function() {
    var taskContent = $("#new-task-input").val();
    if (taskContent.trim() !== "") {
      console.log("Adding task:", taskContent); // Debug log
      postTask(taskContent, renderTasks);
      $("#new-task-input").val("");
    }
  });
});