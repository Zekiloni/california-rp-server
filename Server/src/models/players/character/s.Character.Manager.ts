import { Characters } from "./s.Character";


export interface ICharacterInfo {
   firstName: string
   lastName: string
   birth: string
   origin: string
}


export class CharacterManager extends Characters {

   static isNameTaken (nameQuery: string) {
      return Characters.findOne({ where: { name: nameQuery } }).then(
         character => character ? true : false
      );
   }


   static spawnCharacter (player: PlayerMp) {

   }

   static async createCharacter (player: PlayerMp, charData: string, appearData: string) {
      const characterInfo: ICharacterInfo = JSON.parse(charData);
      // const name = Character
      
      if (await this.isNameTaken(characterInfo.firstName + ' ' + characterInfo.lastName)) {
         return;
      }
      

      return true;
   }
}