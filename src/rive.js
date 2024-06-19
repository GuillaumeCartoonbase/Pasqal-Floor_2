const stateMachine = "Floor 2";

// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player

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
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);
