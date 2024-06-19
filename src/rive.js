const stateMachine = "Floor 2";

// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player

const lessons = 5; // Number of lessons
const inputLessonsDone = []; // Lessons status
const inputLessonsProgress = []; // Lessons progress
const inputIsLessonsHover = []; // Lesson pointer hover
const inputLessonsTrigger = []; // Lesson trigger movement

const riveInstance = new rive.Rive({
	src: "src/floor-2.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents

	onLoad: () => {
		// Prevent a blurry canvas by using the device pixel ratio
		riveInstance.resizeDrawingSurfaceToCanvas();

		const inputs = riveInstance.stateMachineInputs(stateMachine);
		playerSelector = inputs.find((i) => i.name === "playerProfile");
		playerSelector.value = playerID;

		for (let i = 1; i <= lessons; i++) {
			// Get lesson done status
			// inputLessonsDone[0].value = true; (true, false)
			inputLessonsDone.push(
				inputs.find((input) => input.name === `isLesson${i}Done`)
			);

			// Get lesson progress
			// inputLessonsProgress[0].value = 20; (0-100)
			inputLessonsProgress.push(
				inputs.find((input) => input.name === `Lesson progress ${i}`)
			);

			// Hover effect
			// inputIsLessonsHover[0].value = true (true, false)
			inputIsLessonsHover.push(
				inputs.find((input) => input.name === `Lesson ${i} Hover`)
			);

			// Triggers marble animation
			// inputLessonsTrigger[0].fire()
			inputLessonsTrigger.push(
				inputs.find((input) => input.name === `Trigger Lesson ${i}`)
			);
		}
		// Trigger marble to next level
		triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

		inputLessonsCounter = inputs.find((i) => i.name === "lessonCounter");
		inputMarbleHover = inputs.find((i) => i.name === "marble hovering");
	},
});

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// Events handling setup
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;
	console.log(eventName);
	switch (eventName.split("-")[0]) {
		// Fire marble movements from card's buttons
		case "cardbutton":
			//  eventName.split(" ")[0] ===
			let cardButton = eventProperties.cardButton;
			for (let i = 0; i < lessons; i++) {
				if (cardButton === i + 1) return inputLessonsTrigger[i].fire();
			}
			if (cardButton === 200) return triggerNextLevel.fire();
			break;

		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			console.log("clicked");
			break;

		// Levitate marble when on a lesson, not in movement
		case "marbleLevitateON":
			inputMarbleHover.value = true;
			break;
		case "marbleLevitateOFF":
			inputMarbleHover.value = false;
			break;

		default:
			console.log("Unhandled event:", eventName, "\n", riveEvent);
			break;
	}
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);
