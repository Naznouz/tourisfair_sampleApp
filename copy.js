export const tripPlan = (plan) => {
  console.log(plan);
  var planSection = document.createElement("section");
  var planTabs = document.createElement("ul");
  var planDays = document.createElement("section");
  planSection.id = "tripPlan";
  planSection.appendChild(planTabs);
  planSection.appendChild(planDays);
  let firstDay = true;
  plan.forEach((day) => {
    let dayDate = new Date(day.date);
    day.date = dayDate.toLocaleDateString(navigator.language, {
      day: "numeric",
      month: "short"
    });
    planTabs.appendChild(dayTab(day));
    planDays.appendChild(dayPlan(day, firstDay));
    if (firstDay) firstDay = false;
  });
  return planSection;
};

function dayTab(day) {
  var tab = document.createElement("li");
  tab.innerHTML = `
  <a href="#${day.date}">${day.date}</a>
  `;
  return tab;
}

function dayPlan(day, firstDay) {
  var daySection = document.createElement("details");
  daySection.id = day.date;
  daySection.open = true;
  daySection.appendChild(dayDate(day));
  daySection.appendChild(activities(day));
  return daySection;
}

function dayDate(day) {
  var dayDate = document.createElement("summary");
  dayDate.innerText = day.date;
  return dayDate;
}

function activities(day) {
  const actSection = document.createElement("ul");
  day.activities.forEach((act) => {
    actSection.appendChild(activitySection(act));
  });
  return actSection;
}

function activitySection(act) {
  const actItem = document.createElement("li");
  actItem.innerHTML = `
  <dl>
    <dt>
      ${act.start_time.substr(11, 5)} -
      ${act.end_time.substr(11, 5)}
    </dt>
    <dd>
      <style>
      #act${act.activity_gyg_id} {
        background-image: url('${act.activity_image.url}');
      }
      </style>
      <details id="act${act.activity_gyg_id}" open>
        <summary>
          ${act.activity_title}
        </summary>
        <em>${act.option_title}</em>
      </details>
    </dd>
  </dl>
  `;
  return actItem;
}
