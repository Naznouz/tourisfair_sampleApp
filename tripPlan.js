export const tripPlan = (plan) => {
  console.log(plan);
  var planSection = document.createElement("ul");
  planSection.id = "tripPlan";
  plan.forEach((day) => {
    let dayDate = new Date(day.date);
    day.date = dayDate.toLocaleDateString(navigator.language, {
      day: "numeric",
      month: "short"
    });
    planSection.appendChild(dayPlan(day));
  });
  return planSection;
};

function dayPlan(day) {
  var daySection = document.createElement("li");
  daySection.id = day.date;
  daySection.appendChild(dayDate(day));
  daySection.appendChild(activities(day));
  return daySection;
}

function dayDate(day) {
  var dayDate = document.createElement("a");
  dayDate.href = "#" + day.date;
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
    <dd id="act${act.activity_gyg_id}" >
      <details open>
        <summary>
          ${act.activity_title}
        </summary>
        <em>${act.option_title}</em>
      </details>
    </dd>
  </dl>
  `;
  actItem.getElementsByTagName("dd")[0].style.backgroundImage =
    act.activity_image.url;
  return actItem;
}
