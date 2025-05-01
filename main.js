document.querySelector("button").addEventListener("click", apiRequest);

async function apiRequest() {
  const username = document.querySelector("input").value;
  try {
    const response = await fetch(`/api/${username}`);
    const data = await response.json();

    console.log(data);
    
	let skillLevels = ""
	data.skills.forEach(skill => {
		skillLevels += `${skill.name}: Level ${skill.level}\n`
	})
    document.querySelector("#info").innerText = skillLevels;
  } catch (error) {
    console.log(error);
  }
}
