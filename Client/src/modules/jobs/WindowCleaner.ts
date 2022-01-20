import { CreateInteractionSpot } from "../../utils";

const Player = mp.players.local;
let CleaningActive = false;

mp.events.add({
    'CLIENT::WINDOW:CLEANER:INSTRUCTIONS:TOGGLE': () => {
        CleaningActive = !CleaningActive;
    },
    
    'render': () => {
        if (!CleaningActive) return;
        AddInstructionalStart();
        AddInstructionalButton("Spustanje lifta", 195);
        AddInstructionalButton("Podizanje lifta", 194);
        AddInstructionalEnd(1);
    },

    'CLIENT::WINDOW:CLEANER:MARKER:SET': (Position: Vector3Mp) => {
    const { Checkpoint } = CreateInteractionSpot('Window', Position, false);

        mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, PlayerAtCleaningSpot);

        function PlayerAtCleaningSpot(Point: CheckpointMp) {
            if (Checkpoint == Point) {
                Player.setVariable("CLEANING_ALLOWED", true); // Kada ocisti, vratiti na false
                if (Checkpoint) Checkpoint.destroy();
                mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, PlayerAtCleaningSpot);
            }
        }
    }
});

var sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
var scInst = 0;

function AddInstructionalStart() {
    scInst = 0;
    mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

function AddInstructionalButton(text: string, button: number) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}

function AddInstructionalButtonCustom(text: string, button: string) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}

function AddInstructionalEnd(type: number) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}
