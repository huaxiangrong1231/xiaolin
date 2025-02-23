// 示例任务数据（每天时间段安排）
const defaultTasks = [
  { time: "12:15 - 12:40", task: "数学轻松" },
  { time: "12:40 - 12:50", task: "地理练习册" },
  { time: "12:50 - 13:05", task: "语文阅读" },
  { time: "13:05 - 13:20", task: "休息" }, // 休息 15min
  { time: "13:20 - 13:40", task: "语文作文" },
  { time: "13:40 - 14:00", task: "语文抄写" },
  { time: "14:00 - 14:10", task: "休息" }, // 休息 10min
  { time: "14:10 - 14:35", task: "英语单词抄写" },
  { time: "14:35 - 14:50", task: "休息" }, // 休息 15min
  { time: "14:50 - 15:30", task: "英译短文" },
  { time: "15:30 - 15:40", task: "休息" }, // 休息 10min
  { time: "15:40 - 15:50", task: "英语练习册" },
  { time: "15:50 - 16:00", task: "历史练习册" }
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
