import controls from './enums/controls';


mp.gui.chat.show(false);


export const Browser = mp.browsers.new('localhost:8080');

Browser.markAsChat();


let isMouseActive: boolean = false;

const backupMouse = () => {
   isMouseActive = !isMouseActive;
   mp.gui.cursor.show(isMouseActive, isMouseActive);
};

mp.keys.bind(controls.COSNSOLE, true, backupMouse)