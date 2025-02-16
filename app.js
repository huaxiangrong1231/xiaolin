// 示例任务数据（每天时间段安排）
const defaultTasks = [
  { time: "10:30 - 10:50", task: "英语洋葱" },
  { time: "10:50 - 11:05", task: "生物题" },
  { time: "11:05 - 11:15", task: "地理题" }
];



// 加载任务数据并显示
function loadTasks() {
  const taskTable = document.querySelector("#task-table tbody");
  taskTable.innerHTML = ""; // 清空表格内容

  defaultTasks.forEach(task => {
    const row = document.createElement("tr");

    // 时间段
    const timeCell = document.createElement("td");
    timeCell.textContent = task.time;

    // 任务
    const taskCell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.task;
    input.readOnly = true; // 设置为只读
    taskCell.appendChild(input);

    row.appendChild(timeCell);
    row.appendChild(taskCell);
    taskTable.appendChild(row);
  });
}

// 自动识别当前时间并显示任务
function displayCurrentTask() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  let currentTask = "现在没有任务，休息一下吧~";

  // 获取当前时间段并显示任务
  for (let task of defaultTasks) {
    const [start, end] = task.time.split(" - ").map(time => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m; // 转换为分钟
    });

    const currentMinutes = hour * 60 + minute;
    if (currentMinutes >= start && currentMinutes < end) {
      currentTask = task.task;
      break;
    }
  }

  // 显示当前任务
  const currentTaskElement = document.querySelector("#current-task");
  currentTaskElement.textContent = "现在应该做的任务：" + currentTask;

  // 显示当前时间
  const currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.textContent = `当前时间：${currentTime.toLocaleTimeString()}`;
}

// 每秒钟更新一次当前时间
setInterval(displayCurrentTask, 1000);

// 页面加载时初始化任务
window.onload = function () {
  loadTasks();
  displayCurrentTask();
};
