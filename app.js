// 示例任务数据（每天时间段安排）
const defaultTasks = [
    { time: "12:00 - 12:15", task: "预习生物第一章" },
    { time: "12:15 - 12:35", task: "语文笔记" },
    { time: "12:35 - 12:45", task: "休息（放松一下，喝点水～）" },
    { time: "12:45 - 13:25", task: "学期计划表" },
    { time: "13:25 - 13:35", task: "休息（活动下筋骨，看看窗外喔）" },
    { time: "13:35 - 13:50", task: "数学第一章预习" },
    { time: "13:50 - 14:00", task: "英语作业" },
    { time: "14:00 - 14:10", task: "休息（听首轻松的音乐吧♪）" },
    { time: "14:10 - 14:30", task: "地理预习" },
    { time: "14:30 - 15:00", task: "英语单词背诵" },
    { time: "15:00 - 15:10", task: "休息（让大脑轻松一下）" },
    { time: "15:10 - 15:40", task: "远方背诵" },
    { time: "15:40 - 15:50", task: "复习孙权劝学" },
    { time: "18:40-19:10", task: "语文翻译" },
    { time: "19:10-19:20", task: "休息（放松一下，喝点水或者看看窗外）" },
    { time: "19:20-19:40", task: "历史预习" },
    { time: "19:40-20:10", task: "数学练习" }
];

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
  
