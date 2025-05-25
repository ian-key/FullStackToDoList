import $ from 'jquery';

import {
  indexTasks,
  markComplete,
  markActive,
  postTask,
} from "./requests.js";

indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    var buttonText = task.completed ? 'Mark Active' : 'Mark Complete';
    var buttonClass = task.completed ? 'mark-active-btn' : 'mark-complete-btn';
    return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      " + task.content + "\
      <button class='" + buttonClass + "' data-id='" + task.id + "'>" + buttonText + "</button> \
      </div>";
  }).join('');

  $("#tasks").html(htmlString);

  $(".mark-complete-btn").on("click", function() {
    var taskId = $(this).data("id");
    markComplete(taskId);
  });

  $(".mark-active-btn").on("click", function() {
    var taskId = $(this).data("id");
    markActive(taskId);
  });
});