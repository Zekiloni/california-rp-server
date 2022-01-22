

// GET_NUMBER_OF_PED_PROP_DRAWABLE_VARIATIONS(Ped ped, int propId)
// GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS(Ped ped, int propId, int drawableId)
// SET_PED_RANDOM_PROPS(Ped ped)
// _IS_PED_PROP_VALID(Ped ped, int componentId, int drawableId, int TextureId)
// GET_PED_PROP_INDEX(Ped ped, int componentId)
// SET_PED_PROP_INDEX(Ped ped, int componentId, int drawableId, int TextureId, BOOL attach)
// KNOCK_OFF_PED_PROP(int propIndex, BOOL p1, BOOL p2, BOOL p3, BOOL p4)
// CLEAR_PED_PROP(Ped ped, int propId)
// CLEAR_ALL_PED_PROPS(Ped ped)
// GET_PED_PROP_TEXTURE_INDEX(Ped ped, int componentId)
// SET_PED_HELMET_PROP_INDEX(Ped ped, int propIndex)


export function getComponentTexture (component: number) { 
   return mp.game.invoke(RageEnums.Natives.Ped.GET_PED_PROP_TEXTURE_INDEX, component);
}

export function isComponentValid (component: number, drawable: number, texture: number) { 
   return mp.game.invoke(
      RageEnums.Natives.Ped.IS_PED_COMPONENT_VARIATION_VALID, 
      mp.players.local.getPed(), 
      component, 
      drawable, 
      texture
   );
}